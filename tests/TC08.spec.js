const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');
const { strictEqual } = require('node:assert/strict');

test('Kasper Patient Payment text verification', async ({ page, context }, testInfo) => {
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

    await page.locator(sitePage.locators.nameOfCard).fill(options.testData.formData.nameOfCard);
    await page.locator(sitePage.locators.cardNumber).fill(options.testData.formData.cardNumber);
    await page.locator(sitePage.locators.validThrough).fill(options.testData.formData.validThrough);
    await page.locator(sitePage.locators.CVV).fill(options.testData.formData.CVV);
    await page.locator(sitePage.locators.PostalZip).fill(options.testData.formData.PostalZip);
    await page.waitForTimeout(3000);

    await sitePage.clickButton(sitePage.locators.proPay);
    await page.waitForTimeout(4000);

    await page.locator(sitePage.locators.uncheckEmail).uncheck();

    const textBox = page.locator(sitePage.locators.paymentTextMssg);

    await textBox.click();
    await page.keyboard.press('Control+A'); 
    await page.keyboard.press('Backspace');
    await textBox.pressSequentially(options.testData.formData.paymentTextMssg);
    await page.waitForTimeout(4000);

    await sitePage.clickButton(sitePage.locators.SendButton);
    await page.waitForTimeout(3000);

    await page.reload();
    await page.waitForTimeout(8000);

    const lastMessageLocator = page.locator(sitePage.locators.chatBox).last();
    const lastMessageText = await lastMessageLocator.textContent();

    const expectedMessage = options.testData.formData.paymentTextMssg;

    console.log("Expected Message: ", expectedMessage.trim());
    console.log("Last Chat Message: ", lastMessageText.trim());

    strictEqual(
        lastMessageText.trim(), 
        expectedMessage.trim()
    );

    console.log("✅ Success: The messages match perfectly!");

    await page.waitForTimeout(6000);
});