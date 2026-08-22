# Groq integration notes

Groq's official model documentation identifies the requested model as `openai/gpt-oss-20b` and provides an OpenAI-compatible chat-completions example. Source: https://console.groq.com/docs/model/openai/gpt-oss-20b.

The implementation will call `https://api.groq.com/openai/v1/chat/completions` from a server-side Vercel function using the `GROQ_API_KEY` environment variable. The browser will call the local `/api/chat` endpoint instead of receiving the secret key.

The chatbot will send a constrained Crest Automotive system prompt, limit message history and content length, use a modest temperature and output-token cap, and return a safe error state when the key or upstream service is unavailable. The current GPT OSS 20B identifier is `openai/gpt-oss-20b`.
