import { test, expect } from '@playwright/test';
import { chromium } from 'playwright-core';
import NexoLoginPage from '../page-object-models/nexoPom';
import { baseCreds } from '../global-data/globalCredentials.js';

test('Temporary storage test', async ({ browser }) => {

  const expertContext = await browser.newContext({ storageState: './iHCM/global-data/Auth/expertAuth.json' });
  const expertPage = await expertContext.newPage();
  await expertPage.goto("https://preprod.ihcm.adp.com/");
  await expertPage.getByRole('link', { name: 'Expert' }).click();

});