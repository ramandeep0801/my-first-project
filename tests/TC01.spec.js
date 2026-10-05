const { test, expect } = require('@playwright/test');
const { ScheduleLocatorsPage } = require('../Pages/ScheduleLocatorsPage'); 

test('Dashboard', async ({ page, baseURL }) => {
  test.setTimeout(100000);
  const sitePage = new ScheduleLocatorsPage(page);
  await page.goto('/dashboard');
  await page.waitForTimeout(8000);
  await sitePage.clickButton(sitePage.locators.dashboard);
  await page.waitForTimeout(5000);

  await sitePage.clickButton(sitePage.locators.addAppointment);
  await page.waitForTimeout(2000);

  await sitePage.clickButton(sitePage.locators.cancel);
  await page.waitForTimeout(2000);
});