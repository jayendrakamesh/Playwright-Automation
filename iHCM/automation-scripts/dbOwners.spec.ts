import { test, expect } from "@playwright/test";
import NexoLoginPage from "../page-object-models/nexoPom";


const uk_uat1_aws = [
'UK202410161001545',
'UK202309190900192',
'UK202407081232151',
'UK202410291026496',
'UK201801181115600',
'UK202411290825464',
'UK20200923105225168',
'UK202502130919361',
'UK202203101532427',
'UK202203081336072',
'UK202203081609432',
'UK202303160836337',
'UK202106171044412',
'UK20190618172638240',
'UK201803281203749',
'UK202311141017317',
'UK202406211340410',
'UK20201118084827987',
'UK202505221155455',
'UK202509160930207',
'UK202508070728343',
'UK202508031725285',
'UK202508071051383',
'UK202508050645077',
'UK202410240821575',
'UK202509090923142',
'UK202509081347423',
'UK202505221155455',
'UK202108101550368',
'UK202503130908215',
'UK202410230903148',
'UK20191021154642368',
'UK2019102115512836',
'UK202508061057238',
'UK202509030740337'
];

var dbOwners: string[] = [];

const creds = {

    arcUser: {
        username: "jkamesh-adp",
        password: "Boruto@321"
    },

};

//Automation script to get all db owners name from client database menu
test("Automation script to get all db owners name from client database menu", async({ page }) => { test.setTimeout(240000)

    const nexoLoginPage = new NexoLoginPage(page);

    await page.goto("https://tools-uk.staging.ehc.adp.com/arc/arc");

    nexoLoginPage.arcLogin(creds);

    await page.getByRole('button', { name: 'iHCM EMEA ' }).click();
    await page.waitForTimeout(3000);
    await page.locator('.revitMegaItemText').getByText('iHCM EMEA UAT1').click();   
    await page.getByText('Search').click();
    await page.getByRole('radio', { name: 'name' }).check();
    await page.getByRole('textbox', { name: 'name' }).click();
    await page.getByRole('textbox', { name: 'name' }).fill('*client*');
    await page.getByRole('button', { name: 'Search' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('cell', { name: 'AWSUAT1ClientRef' }).click();

    const page1 = await page1Promise;
    await page1.goto('https://preprod.ihcm.adp.com/whrmux/web/system-setup/system-setup');
    await page1.getByRole('link', { name: 'Client database ' }).click();
    await page1.getByRole('combobox', { name: 'Pagination' }).click();
    await page1.getByRole('option', { name: '100' }).click();

    await page1.getByRole('button', { name: 'Load more' }).click();
    await page1.getByRole('button', { name: 'Load more' }).click();
    await page1.getByRole('button', { name: 'Load more' }).click();
    await page1.getByRole('button', { name: 'Load more' }).click();
    await page1.getByRole('button', { name: 'Load more' }).click();

    // while(page1.getByRole('button', { name: 'Load more' }).isVisible()){
    //     await page1.getByRole('button', { name: 'Load more' }).click();
    //     console.log("Load more clicked");
    // }


    for(const ooid of uk_uat1_aws){

        await page.waitForTimeout(1000);
        console.log(ooid);
        await page1.locator('dl').getByText('Client OOID ' + ooid).click();
        const i = await page.locator('.flx-font--body-2').textContent();
        
        if(i){
            dbOwners.push(i);
        }
        
    }
    console.log(dbOwners);
});