import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const requests = [];
let responseNumber = 0;

await page.route('**/api/chat', async (route) => {
  const request = route.request();
  const body = JSON.parse(request.postData() || '{}');
  requests.push(body.messages || []);
  responseNumber += 1;
  const reply = responseNumber === 1
    ? '## Rodim PPF\n\n**Rodim R3 Pro** is a strong option.<br>Would you like help choosing the coverage size?'
    : 'For your car, I would compare the film warranty and coverage size before confirming the final estimate.';
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ reply }) });
});

try {
  await page.goto('http://127.0.0.1:4330/', { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.locator('.chatbot-launcher').click();
  const firstSuggestion = page.getByRole('button', { name: 'How much does Rodim PPF cost?' });
  await firstSuggestion.click();
  await page.locator('.chat-message.assistant').last().waitFor();
  const firstReply = await page.locator('.chat-message.assistant').last().textContent();
  const followUpTexts = await page.locator('.chat-suggestion').allTextContents();
  const noRawMarkup = !/[<>]|(^|\s)(#{1,6}|\*\*|```)/m.test(firstReply || '');
  const ppfFollowUpVisible = followUpTexts.some((text) => /Rodim|PPF|coverage|ceramic/i.test(text));
  const secondSuggestion = page.getByRole('button', { name: 'Which Rodim film suits my car?' });
  await secondSuggestion.click();
  await page.locator('.chat-message.assistant').nth(2).waitFor();
  const contextMessageCount = requests[1]?.length || 0;
  const contextContainsFirstUserMessage = requests[1]?.some((message) => message.role === 'user' && /Rodim PPF/i.test(message.content));
  const storedHistory = await page.evaluate(() => JSON.parse(sessionStorage.getItem('crestChatHistory') || '[]'));
  const result = { noRawMarkup, firstReply, ppfFollowUpVisible, followUpTexts, contextMessageCount, contextContainsFirstUserMessage, storedHistoryLength: storedHistory.length, requestCount: requests.length };
  console.log(JSON.stringify(result, null, 2));
  if (!noRawMarkup || !ppfFollowUpVisible || !contextContainsFirstUserMessage || storedHistory.length < 3 || requests.length !== 2) process.exitCode = 1;
} finally {
  await browser.close();
}
