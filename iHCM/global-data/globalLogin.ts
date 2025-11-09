import { expect } from '@playwright/test';
import { chromium } from 'playwright-core';
import { baseCreds } from './globalCredentials.js'
 
async function expertLogin() {
    // Expert Login
    const browser = await chromium.launch({ executablePath: 'C:\\chrome-win\\chrome.exe', headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://preprod.ihcm.adp.com/");

    await page.getByRole('textbox', { name: 'User ID'}).fill(baseCreds.expertUser.username);
    await page.getByRole('textbox', { name: 'User ID' }).press('Enter');
    await page.getByRole('textbox', { name: 'Password'}).fill(baseCreds.expertUser.password);
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    
    await page.getByRole('button', { name: 'Show user menu' }).click();
    await page.getByRole('button', { name: 'User preferences' }).click();

    await page.context().storageState({ path: "./iHCM/Global/Auth/expertAuth.json"});

    await browser.close();
};

export default expertLogin;