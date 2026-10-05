const { test, expect, chromium } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Kasper Patient Add Task', async ({ page, context }, testInfo) => {
  test.setTimeout(80000);
  const options = testInfo.project.use;
  const sitePage = new ScheduleLocatorsPage(page);
  
  await page.goto('/dashboard');
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.task);
  await page.waitForTimeout(4000)
  const addTaskBtn = page.locator(sitePage.locators.addtask);
  await addTaskBtn.waitFor({ state: 'visible' });
  await sitePage.clickButton(sitePage.locators.addtask);
 
  await page.locator(sitePage.locators.taskName).fill('Task 1');
  await page.locator(sitePage.locators.assigned).click();
  await page.locator(sitePage.locators.drop).click();
  await page.locator(sitePage.locators.category).fill('Test');

  await sitePage.clickButton(sitePage.locators.create);

  await sitePage.clickButton(sitePage.locators.dashboard);
  await page.waitForTimeout(2000);

  /*await sitePage.clickButton(sitePage.locators.addAppointment);
  await page.waitForTimeout(2000);

  await page.locator(sitePage.locators.searchagain).fill(options.testData.patientSearchName);
  await page.waitForTimeout(4000);

  await page.locator(sitePage.locators.checkpatient).check();
  await page.waitForTimeout(2000);

  await page.locator(sitePage.locators.addButton);
  await page.waitForTimeout(2000);*/
})