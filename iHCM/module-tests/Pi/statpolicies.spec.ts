import { test, expect } from "@playwright/test";
import { chromium } from "playwright-core";
import { NexoLoginPage } from "../../page-object-models/nexoPom.ts";
import { NavBar } from "../../page-object-models/navBarPom.ts";
import { piCreds } from "../../global-data/piCredentials.js";

//Test 0 - Prerequisite to login and save authentication states of users
test("0 - Login and save authentication states of important users", async ({page}) => { test.setTimeout(60000);

  const nexoLoginPage = new NexoLoginPage(page);

  await page.goto("https://preprod.ihcm.adp.com/");
  await nexoLoginPage.internalLogin(piCreds);

  await page.getByRole('button', { name: 'Show user menu' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
});

//Test 1 - Test to automate filling of stat policies
test.describe(() => {

    test.use({ storageState: './iHCM/global-data/Auth/internalAuth.json' });
    test("1 - Test to automate filling of stat policies", async ({page}) => { test.setTimeout(120000);

    await page.goto("https://preprod.ihcm.adp.com/");

    await page.getByRole('link',{name: 'Expert', exact: true}).click();

    await page.getByText('Active workforce').click();
    await page.getByRole('searchbox', { name: 'Find People' }).fill('61902');
    await page.getByRole('searchbox', { name: 'Find People' }).press('Enter');
    await page.getByRole('button').filter({hasText: '61902'}).click();
    
    await page.waitForTimeout(6000);
    
    await page.getByRole('tab', {name: 'Pay'}).click();
    await page.getByRole('tab', {name: 'Statutory'}).click();
    await page.getByRole('switch', {name: 'Use hire date'}).click();

    await page.getByRole('button', {name: 'Differentiated Disability'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('combobox', {name: 'Date Of Birth'}).click();
    
    await page.getByRole('button', { name: 'Income Relationship Type' }).click();
    await page.getByRole('option', { name: '(Loon/salaris Werknemer)' }).locator('slot').click();

    await page.getByRole('button', { name: 'Indication Small Or Large' }).click();
    await page.getByRole('radio', { name: 'No' }).click();

    await page.locator('fillered').click();

    });
})