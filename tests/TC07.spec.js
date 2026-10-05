const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');
const { strictEqual } = require('node:assert/strict');

test('Kasper Patient Payment with Link', async ({ page, context }, testInfo) => {

test.setTimeout(190000);
const options = testInfo.project.use;
const sitePage = new ScheduleLocatorsPage(page);
await context.grantPermissions(['clipboard-read', 'clipboard-write']);

await page.goto('/dashboard');
await page.waitForTimeout(5000);

await sitePage.clickButton(sitePage.locators.communication);
await page.waitForTimeout(5000);

const searchIt = page.locator(sitePage.locators.search);
await searchIt.fill(options.testData.patientSearchName);
await page.waitForTimeout(5000);

await sitePage.clickButton(sitePage.locators.commPayment);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.processPayment);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.patientPayment);
await page.waitForTimeout(3000);

await page.locator(sitePage.locators.customAmount).nth(2).click();
await page.locator(sitePage.locators.fillAmount).fill(options.testData.formData.fillAmount);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.confirm);
await page.waitForTimeout(3000);

const optionsList = await page.locator(sitePage.locators.allList).all();

for (const option of optionsList) {
if (await option.isChecked()) {
await option.uncheck({ force: true });
}
}
await page.waitForTimeout(3000);
await sitePage.clickButton(sitePage.locators.contPayment);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.linkToPay);
await page.waitForTimeout(3000);

await page.locator(sitePage.locators.uncheckEmail).uncheck();
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.sendLink);
await page.waitForTimeout(5000);

//await page.reload();
//await page.waitForTimeout(8000);

await sitePage.clickButton(sitePage.locators.commPayment);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.copyLinkToPay);
await page.waitForTimeout(3000);

let url = '';
await test.step("access the clipboard", async () => {
url = await page.evaluate(async () => await navigator.clipboard.readText());
console.log('From clipboard: ' + url);
});

if (!url) {
throw new Error('Failed to retrieve URL from clipboard.');
}

const newPage = await context.newPage();
await newPage.goto(url, { waitUntil: 'domcontentloaded' });
const newSitePage = new ScheduleLocatorsPage(page);
await newPage.locator(newSitePage.locators.linkCardName).fill(options.testData.formData.nameOfCard);
newPage.locator(newSitePage.locators.linkCardNumber).fill(options.testData.formData.cardNumber);
await newPage.locator(newSitePage.locators.linkValidThrough).fill(options.testData.formData.validThrough);
await newPage.locator(newSitePage.locators.linkCVV).fill(options.testData.formData.CVV);
await newPage.locator(newSitePage.locators.linkPostalZip).fill(options.testData.formData.PostalZip);
await newPage.waitForTimeout(3000);

await newPage.locator(newSitePage.locators.LinkPaymentButton).click();
await page.waitForTimeout(8000);

await newPage.close();

//await sitePage.clickButton(sitePage.locators.chatRefresh);

await page.reload();
await page.waitForTimeout(8000);

const lastMessageText = await page.locator(sitePage.locators.chatBox).last().textContent();
console.log("Last message: ", lastMessageText);

await sitePage.clickButton(sitePage.locators.commPayment);
await page.waitForTimeout(3000);

await page.locator(sitePage.locators.refundProcess).first().click();
await page.locator(sitePage.locators.refundClick).first().click();
await page.locator(sitePage.locators.mssgText).fill(options.testData.formData.mssgText),

await sitePage.clickButton(sitePage.locators.processRefund);
await sitePage.clickButton(sitePage.locators.yesButton);

await page.locator(sitePage.locators.uncheckEmail).uncheck();
await sitePage.clickButton(sitePage.locators.SendButton);

await page.reload();
await page.waitForTimeout(8000);
const RefundText = await page.locator(sitePage.locators.chatBox).last().textContent();

console.log("Last message: ", RefundText);
await page.waitForTimeout(6000);

}); 