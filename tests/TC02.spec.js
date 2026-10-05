const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage');

test('Communication', async ({ page, baseURL }, testInfo) => {
  test.setTimeout(100000);
  const testData = testInfo.project.use.testData;
  const sitePage = new ScheduleLocatorsPage(page);
  await page.goto('/dashboard');
  await page.waitForTimeout(8000);

  await sitePage.clickButton(sitePage.locators.communication);
  await page.waitForTimeout(5000);

  const searchIt = await page.locator(sitePage.locators.search);
  searchIt.fill(testData.patientSearchName);
  await page.waitForTimeout(5000);
  await sitePage.clickButton(sitePage.locators.communicationForm);
  await page.waitForTimeout(2000);
  
});