# Crest Automotive — Post-deployment monitoring and error-tracking guide

This guide covers the Astro static site, the Vercel serverless function at `/api/chat`, and the Groq `openai/gpt-oss-20b` integration. It is written for the current project structure, where public pages are static and the chatbot is the only server-side runtime.

> **Recommended operating principle:** log enough metadata to diagnose failures, but never log the Groq API key, full user messages, full assistant responses, phone numbers, or other unnecessary personal data.

## 1. Deployment architecture

| Surface | Runtime | What to monitor | Primary place to inspect |
|---|---|---|---|
| Astro pages and assets | Static Vercel deployment | Build success, route availability, asset failures, 404s, page performance | Vercel deployment/build logs and browser monitoring |
| `/api/chat` | Vercel Node.js Function | Invocation count, status codes, duration, timeouts, exceptions, missing secret | Vercel Runtime Logs |
| Groq API | External upstream service | 401/403 auth failures, 429 limits, 5xx availability, model errors, response latency | Vercel Runtime Logs plus Groq account Limits page |
| Contact form | Frontend-only until a backend is connected | Browser completion state and future form endpoint health | Browser monitoring and the eventual form provider |

## 2. One-time Vercel setup

Open the Vercel project and confirm the following settings:

1. **Framework preset:** Astro.
2. **Install command:** `pnpm install --frozen-lockfile`.
3. **Build command:** `pnpm build`.
4. **Output directory:** `dist`.
5. **Node runtime:** Node 22, matching `package.json`.
6. **Production branch:** the branch intended to publish the live site.
7. **Environment variable:** create `GROQ_API_KEY` for both Preview and Production. Keep it server-only; never rename it with a `PUBLIC_` prefix.
8. **Redeploy after secret changes:** Vercel applies environment-variable changes to new deployments, not previous deployments. After adding, rotating, or deleting the Groq key, create a fresh Preview or Production deployment.

The repository includes `.env.example` for local reference. It contains an empty variable name only and must never be replaced with a real key in Git.

## 3. Vercel runtime-log workflow

Vercel Runtime Logs show output from Function invocations in Preview and Production. Use the Vercel project dashboard to open **Logs**, filter by the `/api/chat` route, and inspect the request path, status code, environment, deployment and time window. Keep a saved incident note with the deployment ID, timestamp, status, and non-sensitive error message.

The current function intentionally returns safe public errors and writes only unexpected exception details with `console.error`. If deeper diagnosis is needed, add structured metadata rather than message content. A good log shape is:

```js
console.log(JSON.stringify({
  event: 'groq_chat',
  requestId,
  model: MODEL,
  status: upstream.status,
  durationMs,
  messageCount: messages.length,
}));
```

Do not include `Authorization`, `GROQ_API_KEY`, raw request bodies, phone numbers, or full conversation text in logs. If a request identifier is added, generate it server-side and use it only for correlation.

Vercel's current runtime-log documentation states that logs are grouped by request and shown in real time. It also documents per-request log limits, so prefer one compact structured line per event over verbose dumps [1].

## 4. Recommended baseline alerts

These thresholds are starting points for a small resident-service website. Adjust them after observing real traffic for one to two weeks.

| Alert | Starting condition | First response |
|---|---|---|
| Build failure | Any Production build failure | Open build logs, identify the first compile/type error, and keep the previous deployment live while fixing. |
| Chatbot unavailable | More than 3 consecutive `/api/chat` 5xx/503 responses or any sustained error period over 5 minutes | Check `GROQ_API_KEY`, deployment environment, Vercel Runtime Logs, then Groq status/account access. |
| Groq rate limiting | Any recurring 429s or remaining-token/request headers approaching zero | Inspect the Groq Limits page, reduce request frequency/output size, and respect `retry-after`. |
| Slow chatbot | p95 `/api/chat` duration above 8 seconds for 10 minutes | Inspect Vercel duration, upstream latency, prompt size, model setting, and timeout configuration. |
| Error spike | 5xx rate above 2% over a 15-minute window | Correlate with the latest deployment and inspect runtime exceptions. |
| 401/403 | Any unexpected production 401/403 from Groq | Rotate/check the key and confirm the key is assigned to the correct environment. |
| 404 spike | Unexpected increases in page or asset 404s after deploy | Check route names, clean URLs, asset paths, and links in the latest deployment. |

Vercel Alerts, Observability features, or a third-party log drain can be used for notification delivery. If your Vercel plan does not include a desired alerting feature, start with dashboard Runtime Logs and add an external provider later rather than blocking launch.

## 5. Groq API monitoring

The endpoint calls Groq's OpenAI-compatible chat-completions URL with the `openai/gpt-oss-20b` model. Track these fields for each upstream request:

- HTTP status returned by Groq.
- Total duration in milliseconds.
- Model identifier.
- Number of messages and bounded input size.
- Whether the response contains a usable assistant message.
- Error `type` and a sanitized error message when Groq returns a structured error object.
- Rate-limit headers: `retry-after`, `x-ratelimit-remaining-requests`, `x-ratelimit-remaining-tokens`, and reset headers when present.

Groq documents organization-level limits across RPM, RPD, TPM, TPD, ITPM and OTPM. The exact current limits should be read from the Groq account Limits page; do not hardcode a limit from a guide into an alert [2]. Groq also documents that a limit breach returns `429 Too Many Requests` and that the response headers expose remaining quota and reset information [2].

The current GPT OSS 20B model identifier and model capability page are documented by Groq at [3]. Treat the model ID as configuration, not user input, and test it again whenever Groq changes model availability.

## 6. Error-response runbook

| Status | Meaning in this project | Action |
|---|---|---|
| 200 | Groq returned a usable reply | Record success and duration; do not log the full response. |
| 400 | Invalid JSON or missing final user message | Inspect the browser payload shape; do not retry automatically. |
| 401 | Invalid/missing Groq credentials | Check `GROQ_API_KEY` in the correct Vercel environment, then redeploy after correction. |
| 403 | Key or project lacks permission | Check Groq project/key permissions and model access. |
| 413 | Request too large | Confirm the endpoint message cap and reduce client history. |
| 422 | Semantically invalid upstream request | Check model name and request body; do not blindly retry. |
| 429 | Groq rate limit | Respect `retry-after`, add client throttling, and inspect remaining quota. |
| 500/502/503 | Upstream/server availability problem | Retry only transient failures with bounded backoff; if sustained, use the fallback phone CTA. |
| 503 from this function with “not configured” | `GROQ_API_KEY` is absent in the deployed environment | Add the variable for Preview/Production and redeploy. |

The current browser widget already shows a user-safe fallback when the endpoint fails. It should not expose upstream stack traces or secret values.

## 7. Error tracking options

Start with Vercel Runtime Logs because the project has one small serverless endpoint and no database. For richer grouping, alerting, release tracking, and stack traces, add one external provider through a Vercel-compatible log drain or a provider SDK that supports Astro/Vercel Functions. Keep the first rollout narrow:

1. Send only structured server events and exception metadata.
2. Redact request content and contact details.
3. Tag events by `environment`, deployment ID, route, model and status.
4. Add the latest Git commit or deployment ID to each release.
5. Test the alert with a controlled staging error before enabling Production notifications.

Do not install multiple monitoring providers at first. One Vercel dashboard workflow plus one error tracker is easier to audit than several overlapping pipelines.

## 8. Health checks and synthetic tests

Run the repository's end-to-end suite before every Production push:

```bash
pnpm test:e2e
pnpm build
```

The current suite verifies all primary routes, shared navigation, mobile navigation, the 16-treatment services page, monthly packages, protection route, calculator preselection, exact GST totals, PPF/leather/ceramic add-ons, estimate-to-contact handoff, FAQ interaction, contact confirmation, and back-to-top behavior.

After each Production deployment, perform a short smoke check:

1. Open the homepage and click Services, Packages, Protection, Estimate, FAQ and Contact.
2. Open `/estimate?service=13`, choose a category, and confirm the displayed total changes.
3. Open Crest AI and ask a short service question.
4. Confirm the chatbot returns a reply in Production, not the local-preview fallback.
5. Open the Vercel Logs view and verify a successful `/api/chat` invocation without secrets in the log line.
6. Check the legal pages, `robots.txt`, background images, and mobile layout.

## 9. Secret rotation procedure

When the Groq key is rotated, create the replacement key in Groq first, update the Vercel `GROQ_API_KEY` value for Preview and Production, redeploy, and run the Production smoke check. After successful validation, revoke the old key in Groq. If the old key was ever committed or exposed, revoke it immediately and review repository/deployment access.

## 10. Incident response template

Use this compact record for each incident:

```text
Incident:
Started at:
Environment: Preview / Production
Deployment ID:
Affected route: /api/chat or static route
Observed status/error:
Last known good deployment:
Groq Limits page checked: yes/no
Key/environment checked: yes/no
User-facing fallback active: yes/no
Mitigation:
Follow-up fix:
Resolved at:
```

## References

[1]: https://vercel.com/docs/logs/runtime — Vercel, “Runtime Logs.”

[2]: https://console.groq.com/docs/rate-limits — GroqDocs, “Rate Limits.”

[3]: https://console.groq.com/docs/model/openai/gpt-oss-20b — GroqDocs, “OpenAI GPT-OSS 20B.”

[4]: https://vercel.com/docs/environment-variables — Vercel, “Environment variables.”

[5]: https://console.groq.com/docs/errors — GroqDocs, “API Error Codes and Responses.”
