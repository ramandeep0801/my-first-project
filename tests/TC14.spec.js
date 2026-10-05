const {test, expect, chromium} = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');
test('Adding New Task and check ToDo List and Completed List', async ({page, context}, testInfo)=> {

test.setTimeout(180000);
const options = testInfo.project.use;
const sitePage = new ScheduleLocatorsPage(page);

await page.goto('/dashboard');
await page.waitForTimeout(4000);

await sitePage.clickButton(sitePage.locators.task);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.addtask);
await page.waitForTimeout(2000);

await page.locator(sitePage.locators.taskName).fill(options.testData.formData.taskName);
await page.locator(sitePage.locators.assigned).click();
await page.locator(sitePage.locators.drop1).click(); 
await page.locator(sitePage.locators.taskDropSearch).fill(options.testData.patientSearchName);
await page.locator(sitePage.locators.category).fill(options.testData.formData.category);

await sitePage.clickButton(sitePage.locators.create);
await page.waitForTimeout(4000);

await page.locator(sitePage.locators.taskToDoCheck).click();
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompleted);
await page.waitForTimeout(3000);

await sitePage.clickButton(sitePage.locators.taskCompletedThreeDots);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompletedMarkAsIncomplete);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskToDo);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompletedThreeDots);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompletedEditTask);
await page.waitForTimeout(2000);

await page.locator(sitePage.locators.assigned).click();
await page.locator(sitePage.locators.drop).click(); 

await sitePage.clickButton(sitePage.locators.editTaskSave);
await page.waitForTimeout(4000);

const browser = context.browser();
const context2 = await browser.newContext({
    storageState: { cookies: [], origins: [] } // Ensures zero saved session data
  });
const page2 = await context2.newPage();
const sitePage2 = new ScheduleLocatorsPage(page2);

await sitePage2.openURL(options.baseURL);

const emailInput2 = page2.locator(sitePage2.locators.email); 
await emailInput2.waitFor({ state: 'visible' });
await emailInput2.fill(options.testData.email1);

await page2.locator(sitePage2.locators.password).fill(options.testData.password);
await sitePage2.clickButton(sitePage2.locators.loginButton);
await page2.waitForTimeout(5000);

await sitePage2.clickButton(sitePage2.locators.task);
await page2.waitForTimeout(2000);

await sitePage2.clickButton(sitePage2.locators.taskToDo);
await page2.waitForTimeout(2000);

await page2.close();

await sitePage.clickButton(sitePage.locators.taskToDo);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompletedThreeDots);
await page.waitForTimeout(2000);

await sitePage.clickButton(sitePage.locators.taskCompletedDelete);
await page.waitForTimeout(4000);
})