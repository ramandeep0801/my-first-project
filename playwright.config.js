// @ts-check
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  testMatch: [
    'TC*.spec.js',
    'TC1.spec.js',
    'TC2.spec.js',
    'TC3.spec.js',
    'TC4.spec.js',
    'TC5.spec.js',
    'TC6.spec.js',
    'TC7.spec.js',
    'TC8.spec.js',
    'TC9.spec.js',
    'TC10.spec.js',
    'TC11.spec.js',
    'TC12.spec.js',
    'TC14.spec.js',
    'TC15.spec.js',
    
  ],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Standardized path resolution for global setup */
  globalSetup: require.resolve('./Pages/globalSetup.js'),

  /* Shared settings for all projects */
  use: {
    permissions: ['microphone', 'notifications'],
    video: 'retain-on-failure',
    baseURL: 'https://qa10.meetkasper.com/',
    trace: 'on-first-retry',
    
    /* Absolute path resolution for state storage */
    storageState: path.join(__dirname, 'playwright/.auth/user.json'),

    testData: {
      email: 'dimple@meetkasper.com',
      email1: 'dimple+15apr@meetkasper.com',
      password: 'Dimpletest12!@',
      email2: 'gurpreet@meetkasper.com',
      password2: 'Guri12!@',
      patientSearchName: 'Trevor Scott',
      patientSearchName1: 'GurpreetAB2C',
      username1: 'Dimple15Apr',
      username2: 'Gurpreet Kaur',
      formData: {
        title: 'Mr',
        firstName: 'trevor',
        lastName: 'scott',
        dob: '08/12/2002',
        phone: '(908) 731-7371',
        patientEmail: 'test@test.com',
        firstName1: 'GurpreetAB2C',
        lastName1: 'Kaur',
        dob1: '02/09/2000',
        phone1: '(908) 123-1234',
        patientEmail1: 'testqa@test.com',
        PolicyFirstName: 'trevor',
        PolicyLastName: 'scott',
        PolicyDOB: '08/12/2002',
        subscriberID: 'AB123CD',
        groupNumber: '12',
        employer:'KAS',
        insurancePhone: '(908) 123-1234',
        appointmentDate: 'Thursday, September 10, 2026 1:30PM',
        patientFirstName: 'trevor',
        patientLastName: 'scott',
        patientDateOfBirth: 'August 11, 2002',
        fillAmount: '0.05',
        nameOfCard: 'success',
        cardNumber: '5454 5454 5454 5454',
        validThrough: '09/29',
        CVV: '112',
        PostalZip: '12345',
        mssgText: 'Here is your refund.',
        cardNumber2: '4387751111111053',
        CVV2: '111',
        nameOfCard2: 'failure',
        paymentTextMssg: 'Hi, payment of Transaction Amount has been successfully processed.',
        taskName: 'Task 1',
        category: 'Test',
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        headless: false
       },
    },
   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});