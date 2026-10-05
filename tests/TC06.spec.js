const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');
const { strictEqual } = require('node:assert/strict');

test('Kasper Patient Payment failure ', async ({ page, context }, testInfo) => {
    test.setTimeout(180000);
    const options = testInfo.project.use;
    const sitePage = new ScheduleLocatorsPage(page);
    
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
    await page.waitForTimeout(7000);

    await sitePage.clickButton(sitePage.locators.contPayment);
    await page.waitForTimeout(3000);

    await page.locator(sitePage.locators.nameOfCard).fill(options.testData.formData.nameOfCard2);
    await page.locator(sitePage.locators.cardNumber).fill(options.testData.formData.cardNumber2);
    await page.locator(sitePage.locators.validThrough).fill(options.testData.formData.validThrough);
    await page.locator(sitePage.locators.CVV).fill(options.testData.formData.CVV2);
    await page.locator(sitePage.locators.PostalZip).fill(options.testData.formData.PostalZip);
    await page.waitForTimeout(3000);

    await sitePage.clickButton(sitePage.locators.proPay);
    await page.waitForTimeout(4000);

    await page.locator(sitePage.locators.uncheckEmail).uncheck();
    await sitePage.clickButton(sitePage.locators.SendButton);
    await page.waitForTimeout(3000);

    await page.reload();
    await page.waitForTimeout(8000);
    const lastMessageText = await page.locator(sitePage.locators.chatBox).last().textContent();
    console.log("Last message: ", lastMessageText);

    await page.waitForTimeout(6000);
});