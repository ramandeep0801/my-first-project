const {test, expect, chromium} = require('@playwright/test');
const {ScheduleLocatorsPage} = require('../Pages/ScheduleLocatorsPage');
test('Calender Appointment Scheduling for existing & new User', async ({page}, testInfo)=>{
    test.setTimeout(220000);
    const options = testInfo.project.use;
    const sitePage = new ScheduleLocatorsPage(page);
    
    await page.goto('/dashboard');
    await page.waitForTimeout(4000);

    await sitePage.clickButton(sitePage.locators.calendar);
    await page.waitForTimeout(4000);
    
    /*const ScheduleButton = await page.locator(sitePage.locators.calScheduleAppointmantButton);
    await ScheduleButton.waitFor({ state: 'visible'});
    await ScheduleButton.click();

    await page.locator(sitePage.locators.calTimeSlot1).first().click();
    await page.waitForTimeout(4000);

    await page.locator(sitePage.locators.calExistingPatientSearch).fill(options.testData.patientSearchName);
    await sitePage.clickButton(sitePage.locators.existingPatientSelect);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.compExam);
    await sitePage.clickButton(sitePage.locators.perExam);
    await sitePage.clickButton(sitePage.locators.LimExam);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.calScheduleFinal);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.calScheduleNow)
    await page.waitForTimeout(5000);
    
    await page.reload();
    await page.waitForTimeout(8000);*/

    await page.locator(sitePage.locators.calOP2Container).first().click();
    await page.waitForTimeout(6000);

    await page.locator(sitePage.locators.calTimeSlot2).first().click();
    await page.waitForTimeout(4000);

    await page.locator(sitePage.locators.calExistingPatientSearch).fill(options.testData.patientSearchName);
    await sitePage.clickButton(sitePage.locators.existingPatientSelect);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.compExam);
    await sitePage.clickButton(sitePage.locators.perExam);
    await sitePage.clickButton(sitePage.locators.LimExam);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.calScheduleFinal);
    await page.waitForTimeout(2000);

    await sitePage.clickButton(sitePage.locators.calScheduleNow)
    await page.waitForTimeout(5000);
    
    await page.reload();
    await page.waitForTimeout(8000);
})