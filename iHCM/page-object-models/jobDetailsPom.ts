import { Page } from '@playwright/test';
import { chromium, Locator } from 'playwright-core';

export class JobDetailsPages {

  //Expert home page components
  readonly page: Page
  readonly jobAddButton: Locator

  //Contract details
  readonly primaryJobCheckbox: Locator
  readonly jobEffectiveDate: Locator
  readonly jobEndDate: Locator
  readonly jobTitleForPayslip: Locator
  readonly jobTitlePicklist: Locator
  readonly assignmentTypePicklist: Locator
  readonly personalJobTitle: Locator
  readonly contractTypePicklist: Locator
  readonly fte: Locator
  readonly contractCode: Locator

  //Organization details
  readonly companyPicklist: Locator
  readonly locationPicklist: Locator
  readonly reasonForChangePicklist: Locator
  readonly orgStructurePicklist: Locator
  readonly orgLevelPicklist: Locator
  readonly orgUnitPicklist: Locator

  //Work hours details
  readonly fixedVariablePicklist: Locator
  readonly saveButton: Locator


  constructor(page: Page){
    this.page = page 
    this.jobAddButton = page.getByRole('button', {name: 'Add Job'});
    this.primaryJobCheckbox = page.locator('label').filter({ hasText: 'Primary Job' }).nth(1); //Needs improvisation
    this.jobEffectiveDate = page.getByLabel('Effective Date');
    this.jobEndDate = page.getByLabel('End Date');
    this.jobTitleForPayslip = page.getByLabel('Job Title for Payslip');
    this.jobTitlePicklist = page.locator('#ihcm-lookup-jOBTITLE1').getByRole('searchbox');
    this.assignmentTypePicklist = page.locator('#ihcm-picklist-jobfull');
    this.personalJobTitle = page.getByLabel('Personal job title');
    this.contractTypePicklist = page.locator('#ihcm-picklist-jobperm');
    this.fte = page.getByRole('textbox', {name: 'FTE'});
    this.contractCode = page.getByLabel('Contract Code');
    this.companyPicklist = page.locator('#ihcm-lookup-internalCompany');
    this.locationPicklist = page.locator('#ihcm-lookup-lOCATION1').getByRole('searchbox');
    this.reasonForChangePicklist = page.locator('#ihcm-picklist-rEASONFORCHANGE1');
    this.orgStructurePicklist = page.locator('#ihcm-lookup-nWUHStructure');
    this.orgLevelPicklist = page.locator('#ihcm-lookup-workunitType');
    this.orgUnitPicklist = page.locator('#ihcm-lookup-filteredWorkUnit');
    this.fixedVariablePicklist = page.locator('#ihcm-picklist-wPFixedOrVariable');
    this.saveButton = page.getByRole('button', {name: 'Save'});
  }
}