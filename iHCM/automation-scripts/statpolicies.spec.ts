import { test, expect } from "@playwright/test";
import { NexoLoginPage } from "../page-object-models/nexoPom.ts";
import { piCreds } from "../global-data/piCredentials.ts";
import { OnboardingBasePages, OnboardingDetailPages } from "../page-object-models/onboardingPom.ts";
import { OnboardingListPages } from "../page-object-models/onboardingPom.ts";

//Test 0 - Prerequisite to login and save authentication states of users
test("0 - Login and save authentication states of important users @slow", async ({page}) => { test.slow();

  const nexoLoginPage = new NexoLoginPage(page);

  await page.goto("https://preprod.ihcm.adp.com/");
  await nexoLoginPage.expertLogin(piCreds);

  await page.getByRole('button', { name: 'Show user menu' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
});

//Test 1 - Tes to onboard an employree to send them for filling stat policies
test.describe(() => {

  test.use({storageState: 'iHCM/global-data/Auth/expertAuth.json'});
  test('1.1 - Test to onboard an employee to send them for filling stat policies @slow', async({page}) => { test.slow();

    const onboardingBasePages = new OnboardingBasePages(page);
    const onboardingListPages = new OnboardingListPages(page);

    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/expert/home");
    await onboardingBasePages.actionsMenuButton.click();
    await onboardingBasePages.actionsMenuDropdown.getByText('Onboarding').click();

    await onboardingListPages.addEmployeeButton.click();
    await onboardingListPages.legalFirstName.fill('Vicky');
    await onboardingListPages.legalLastName.fill('Playwright Two');
    await onboardingListPages.genderPicklist.click();
    await page.getByRole('option', {name: 'Male', exact: true}).click();

    await onboardingListPages.dateOfBirth.fill('01/01/2000');
    await onboardingListPages.mobileNumber.fill('12345');
    await onboardingListPages.personalEmail.fill('testrun1@js3.com');
    
    await onboardingListPages.jobDetailsAccordion.click();
    await onboardingListPages.companyPicklist.click();
    await page.getByRole('option', {name: 'JSCOMP01 - Leaf Company', exact: true}).click();

    await onboardingListPages.hireDate.fill('01/01/2025');
    await onboardingListPages.workEmail.fill('testrun1@js2.com');

    await onboardingListPages.payGroupPicklist.click();
    await page.getByRole('option', {name: 'JSPG02 - Leaf Four-Weekly Paygroup', exact: true}).click();

    await onboardingListPages.jobTitlePicklist.click();
    await page.getByRole('option', {name: '0000 - QA Engg', exact: true}).click();

    await onboardingListPages.locationPicklist.click();
    await page.getByRole('option', {name: 'Chennai', exact: true}).click();

    await onboardingListPages.reportsToPicklist.click();
    await page.getByRole('option', {name: '61901 - Tony Stark', exact: true}).click();

    await onboardingListPages.employeeCode.fill('61909');
    await onboardingListPages.referenceNumber.fill('61909');

    await onboardingListPages.submitButton.click();

  });

  test('1.2 - To completed 100% for newly onboarded employee @slow', async({ page }) => { test.slow();
    
    const onboardingBasePages = new OnboardingBasePages(page);
    const onboardingListPages = new OnboardingListPages(page);
    const onboardingDetailPages = new OnboardingDetailPages(page);

    await page.goto("https://preprod.ihcm.adp.com/whrmux/web/expert/home");
    await onboardingBasePages.actionsMenuButton.click();
    await onboardingBasePages.actionsMenuDropdown.getByText('Onboarding').click();

    await onboardingListPages.peopleSearch.fill('61909');
    await onboardingListPages.peopleSearch.press('Enter');
    await page.getByRole('link').filter({hasText: 'Playwright'}).click();
    
    await onboardingDetailPages.employeeDetailsAccordion.click();
    await expect(onboardingDetailPages.legalFirstName).toHaveValue('Vicky');
    await expect(onboardingDetailPages.legalLastName).toHaveValue('Playwright Two');
    await onboardingDetailPages.initials.fill('S');
    await expect(onboardingDetailPages.nationalityPicklist).toContainText('Dutch');
    await expect(onboardingDetailPages.genderPicklist).toContainText('Male');
    await expect(onboardingDetailPages.dateOfBirth).toHaveValue('01/01/2000');
    await expect(onboardingDetailPages.workEmail).toHaveValue('testrun1@js2.com');
    await onboardingDetailPages.socialSecurityNumber.fill('258230150');
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.jobDetailsAccordion.click();
    await expect(onboardingDetailPages.referenceNumber).toHaveValue('61909');
    await expect(onboardingDetailPages.employeeCode).toHaveValue('61909');
    await expect(onboardingDetailPages.hireDate).toHaveValue('01/01/2025');
    await expect(onboardingDetailPages.reportsToPicklist).toContainText('61901 - Tony Stark');
    await expect(onboardingDetailPages.continuousServiceDate).toHaveValue('01/01/2025');
    await expect(onboardingDetailPages.jobTitle).toContainText('0000 - QA Engg');
    await onboardingDetailPages.personalJobTitle.fill('QA Engg');
    await onboardingDetailPages.assignmentTypePicklist.click();
    await page.getByRole('option', {name: 'Full Time', exact: true}).click();
    await onboardingDetailPages.contractTypePicklist.click();
    await page.getByRole('option', {name: 'Permanent', exact: true}).click();
    await onboardingDetailPages.orgLevelPicklist.click();
    await onboardingDetailPages.assignmentTypePicklist.click();
    await page.getByRole('option', {name: '0 - Company', exact: true}).click();
    await onboardingDetailPages.orgUnitPicklist.click();
    await onboardingDetailPages.orgUnitPicklist.getByRole('option', {name: 'JSCOMP01 - Leaf Company', exact: true}).click();
    await onboardingDetailPages.fixedVariablePicklist.click();
    await page.getByRole('option', {name: 'Casual Worker', exact: true}).click();
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.addressDetailsAccordion.click();
    await onboardingDetailPages.countryPicklist.click();
    await page.getByRole('option', {name: 'Netherlands', exact: true}).click();
    await onboardingDetailPages.street.fill('Playwright Street');
    await onboardingDetailPages.buildingNumber.fill('1000 AA');
    await onboardingDetailPages.zipCode.fill('1000 AA');
    await onboardingDetailPages.city.fill('Chennai');
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.paymentMethodAccrdion.click();
    await onboardingDetailPages.paymentMethodPicklist.click();
    await page.getByRole('option', {name: 'SEPA', exact: true}).click();
    await onboardingDetailPages.paymentMethodEffectiveFromDate.fill('01/01/2025');
    await onboardingDetailPages.bankAccountTypePicklist.click();
    await page.getByRole('option', {name: 'Primary', exact: true}).click();
    await onboardingDetailPages.bankAccount.fill('ES37161972849397741035');
    await onboardingDetailPages.swiftCode.fill('12-34-56');
    await onboardingDetailPages.beneficiaryName.fill('Vicky Playwright Two');
    await onboardingDetailPages.submitButton.click();

    await onboardingDetailPages.payGroupAssignmentAccordion.click();
    await expect(onboardingDetailPages.payGroup).toHaveValue('JSPG02');
    await expect(onboardingDetailPages.payGroupEffectiveFromDate).toHaveValue('01/01/2025');

  });

});

//Test 2 - Test to automate filling of stat policies
test.describe(() => {

    test.use({ storageState: './iHCM/global-data/Auth/expertAuth.json' });
    test("2 - Test to automate filling of stat policies @slow", async ({page}) => { test.setTimeout(1200000);

    await page.goto("https://preprod.ihcm.adp.com/");

    await page.getByRole('link',{name: 'Expert', exact: true}).click();

    await page.getByText('Active workforce').click();
    await page.getByRole('searchbox', { name: 'Find People' }).fill('61909');
    await page.getByRole('searchbox', { name: 'Find People' }).press('Enter');
    await page.getByRole('button').filter({hasText: '61909'}).click();
    
    await page.waitForTimeout(6000);
    
    await page.getByRole('tab', {name: 'Pay'}).click();
    await page.getByRole('tab', {name: 'Statutory'}).click();
    await page.getByRole('button',{name: 'Contracts'}).click();
    await page.locator('role=button',{hasText: 'Leaf'} ).click();
    await page.getByRole('option', { name: '619092 - 15/01/2025 - 31/12/9999 - Leaf Four-Weekly Paygroup' }).click();

    await page.getByRole('switch', {name: 'Use hire date'}).click();

    //Differentiated Disability Fund details accordion
    await page.getByRole('button', {name: 'Differentiated Disability'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    //await page.getByRole('combobox', {name: 'Date Of Birth'}).click(); //Pending expect validation
    await page.getByRole('button', { name: 'Income Relationship Type' }).click();
    await page.getByRole('option', { name: '15 (Loon/salaris Werknemer)' }).click();
    await page.getByRole('button', { name: 'Indication Small Or Large' }).click();
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Health Insurance Act details accordion
    await page.getByRole('button', {name: 'Health Insurance Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('button', {name: 'Special Situation Payroll Tax *'}).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByLabel('Apply VCR Calculation Method').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Code Health Insurance Act' }).click();
    await page.getByRole('option', { name: 'K' }).click();
    await page.getByLabel('Country Of Residence Factor').click();
    await page.getByLabel('Country Of Residence Factor').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();

    //Income Tax details - Proration accordion
    await page.getByRole('button', {name: 'Income Tax'}).click();
    await page.getByRole('button', {name: 'Add information'}).first().click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Income Tax details - Tax Withholding Obligation accordion
    await page.getByRole('button', {name: 'Income Tax'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Tax Rebates').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Apply Day Table Nee' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await page.getByLabel('Disable Proportional MIR').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Income From Arbeid (Wite Tabel)' }).click();
    await page.getByRole('option', { name: 'Arbeid (Wite Tabel)' }).click();
    await page.getByRole('spinbutton', { name: 'Paid Days' }).fill('21');
    await page.getByLabel('Single Elderly Tax Rebate Indicator').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Minimum Wages NL accordion
    await page.getByRole('button', {name: 'Minimum Wages NL'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('spinbutton', { name: 'Standard Hours Per Week' }).fill('40'); 
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Salary Indicator' }).click();
    await page.getByRole('option', { name: 'Periodeloon' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Return To Work Fund accordion
    await page.getByRole('button', {name: 'Return To Work Fund'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Contribution Percentage WGA').fill('1');
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByLabel('Withholding Percentage WGA').fill('1');
    await page.getByRole('button', { name: 'Save' }).click();

    //Sickness Benefits Act accordion
    await page.getByRole('button', {name: 'Sickness Benefits Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Contribution Percentage ZW Flex').fill('1');
    await page.getByLabel('Amount Cost Reimbursement Decision').fill('200');
    await page.getByLabel('Insured Sickness Insurance Act').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Social Insurance Day And Maximum Capability accordion
    await page.getByRole('button', {name: 'Social Insurance Day And Maximum Capability'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Amount Cost Reimbursement Decision').fill('200');
    await page.getByRole('button', { name: 'Apply Day Table Alleen Loonheffing' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await expect(page.getByRole('spinbutton', { name: 'Paid Days' })).toHaveValue('21');
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Special Rewards Tax accordion 
    await page.getByRole('button', {name: 'Special Rewards Tax'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByRole('button', { name: 'Apply Day Table Alleen Loonheffing' }).click();
    await page.getByRole('option', { name: 'Alleen Loonheffing' }).click();
    await page.getByRole('button', { name: 'Income From Arbeid (Wite Tabel)' }).click();
    await page.getByRole('option', { name: 'Arbeid (Wite Tabel)' }).click();
    await page.getByLabel('New Starter Previous Year Annual Wage').fill('200');
    await page.getByLabel('Override Previous Year Annual Wage').fill('200');
    await page.getByLabel('Single Elderly Tax Rebate Indicator').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Special Situation Payroll Tax Geen Herleiding (Std)' }).click();
    await page.getByRole('option', { name: 'Geen Herleiding (Std)' }).click();
    await page.getByLabel('Tax Rebates').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    //Surcharge Childcare Actaccordion 
    await page.getByRole('button', {name: 'Surcharge Childcare Act'}).click();
    await page.getByRole('button', {name: 'Add information'}).click();
    await page.getByRole('combobox', {name: 'Effective from *'}).click();
    await page.getByLabel('Insured Disability Fund').getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Nature Of Employment Relationship' }).click();
    await page.getByRole('option', { name: '82 (Payrolling)' }).click();
    await page.getByRole('button', { name: 'Save' }).click();


    });
})