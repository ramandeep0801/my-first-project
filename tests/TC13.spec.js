const {test, expect, chromium} = require('@playwright/test');
const {ScheduleLocatorsPage} = require('../Pages/ScheduleLocatorsPage');

test('Forms added in Paperless.Form tab', async ({page,context}, testInfo)=>{

    test.setTimeout(180000);
    const options = testInfo.project.use;
    const sitePage = new ScheduleLocatorsPage(page);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/dashboard'),
    await page.waitForTimeout(3000);

    await sitePage.clickButton(sitePage.locators.paperlessForm);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.allSections);
    await page.waitForTimeout(2000);
  
    await page.locator(sitePage.locators.placementForApprovalCheck).check();
    await page.locator(sitePage.locators.cancellationPolicyCheck).check();
    await page.locator(sitePage.locators.informationConsentCheck).check();
    await page.locator(sitePage.locators.noticeOfPrivacyCheck).check();
    await page.waitForTimeout(4000);

    await sitePage.clickButton(sitePage.locators.paperlessAction) ;
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.paperlessActionAddToGroup);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.moveToGroup);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.addToGroupButton);
    await page.waitForTimeout(3000);
    
    await page.reload();
    await page.waitForTimeout(8000);

    await sitePage.clickButton(sitePage.locators.groupClick);
    await page.waitForTimeout(2000);
 
    await sitePage.clickButton(sitePage.locators.allSections);
    await page.waitForTimeout(4000);

    await page.locator(sitePage.locators.placementForApprovalCheck).check();
    await page.locator(sitePage.locators.cancellationPolicyCheck).check();
    await page.locator(sitePage.locators.informationConsentCheck).check();
    await page.locator(sitePage.locators.noticeOfPrivacyCheck).check();
    await page.waitForTimeout(4000);

    await sitePage.clickButton(sitePage.locators.paperlessAction);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.paperlessActionSendToPatient);
    await page.waitForTimeout(2000);

    await page.locator(sitePage.locators.sendToPatientSearch).fill(options.testData.patientSearchName);
    await page.waitForTimeout(2000);

    await page.locator(sitePage.locators.checkSMS).check();
    await page.waitForTimeout(2000);
 
    await sitePage.clickButton(sitePage.locators.sendToPatientButton);
    await page.waitForTimeout(4000);

    await page.reload();
    await page.waitForTimeout(6000);

    await sitePage.clickButton(sitePage.locators.communication);
    await page.waitForTimeout(2000);

    await page.locator(sitePage.locators.search).fill(options.testData.patientSearchName);
    await page.waitForTimeout(2000);

    const lastMessageText = await page.locator(sitePage.locators.chatBox).last().textContent();
    console.log("Last message: ", lastMessageText);
    
    const urlMatch = lastMessageText.match(/(https?:\/\/[^\s]+)/g);
    const extractedURL = urlMatch ? urlMatch[0] : '';
    console.log('Extracted URL:', extractedURL);

    if (!extractedURL) {
        throw new Error('Failed to extract URL from the message.');
    }

    await page.evaluate(async (urlToCopy) => {
        await navigator.clipboard.writeText(urlToCopy);
    }, extractedURL);

    const clipboardContent = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
    });
    console.log('From clipboard: ' + clipboardContent);

    await newPage.close();

    await sitePage.clickButton(sitePage.locators.communicationForm);
    await page.waitForTimeout(2000);

    const text = await page.locator(sitePage.locators.commFormContainer).textContent();
    console.log(text);

})