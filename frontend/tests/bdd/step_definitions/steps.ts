import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await browser.close();
});

Given('I am on the Alpha-x Translator home page', async function () {
  await page.goto('http://localhost:3000');
});

When('I type {string} in the English input field', async function (text: string) {
  const section = page.locator('div.rounded-3xl').filter({ hasText: 'English to Alpha-x' }).first();
  await section.locator('textarea').fill(text);
});

When('I type {string} in the Alpha-x input field', async function (text: string) {
  const section = page.locator('div.rounded-3xl').filter({ hasText: 'Alpha-x to English' }).first();
  await section.locator('textarea').fill(text);
});

When('I click the {string} button in the {string} section', async function (buttonText: string, sectionTitle: string) {
  const section = page.locator('div.rounded-3xl').filter({ hasText: sectionTitle }).first();
  await section.locator('button').filter({ hasText: new RegExp(`^${buttonText}$`, 'i') }).click();
});

// Keep the old one for compatibility with Grammar Lab
When('I click the {string} button', async function (buttonText: string) {
  await page.locator('button').filter({ hasText: new RegExp(`^${buttonText}$`, 'i') }).click();
});


When('I click the {string} block in the Nouns column', async function (blockName: string) {
  // Find the Nouns column first
  const nounsColumn = page.locator('div:has(h3:text-is("Nouns"))');
  await nounsColumn.locator(`button:text-is("${blockName}")`).click();
});

When('I click the {string} block in the Verbs column', async function (blockName: string) {
  // Find the Verbs column first
  const verbsColumn = page.locator('div:has(h3:text-is("Verbs"))');
  await verbsColumn.locator(`button:text-is("${blockName}")`).click();
});

Then('I should see {string} in the Alpha-x result area', async function (expectedText: string) {
  const section = page.locator('div.rounded-3xl').filter({ hasText: 'English to Alpha-x' }).first();
  const resultArea = section.locator('div').filter({ has: page.locator('> p:text-is("Result")') }).first();
  await expect(resultArea).not.toContainText("Translation will appear here...", { timeout: 10000 });
  await expect(resultArea).toContainText(expectedText);
});

Then('I should see {string} in the English result area', async function (expectedText: string) {
  const section = page.locator('div.rounded-3xl').filter({ hasText: 'Alpha-x to English' }).first();
  const resultArea = section.locator('div').filter({ has: page.locator('> p:text-is("Result")') }).first();
  await expect(resultArea).not.toContainText("Translation will appear here...", { timeout: 10000 });
  await expect(resultArea).toContainText(expectedText);
});

Then('I should see {string} in the Alpha-x Lab output', async function (expectedText: string) {
  const labOutput = page.locator('div').filter({ has: page.locator('> p:text-is("Generated Alpha-x")') }).first();
  await expect(labOutput).toContainText(expectedText, { timeout: 10000 });
});
