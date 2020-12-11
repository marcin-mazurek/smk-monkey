import { chromium } from "playwright";
import { Page } from "playwright";
import { Browser } from "playwright/types/types";

// TODO: read from Google doc
const login = "";
const password = "";
const contextNumber = 3;
const categoryNumber = 1;
const procedureNumber = 1;

const getNthParentSelector = (levels: number) =>
  "xpath=" + new Array(levels).fill("..").join("/");

const handleLogin = async (page: Page) => {
  await page.goto("https://smk.ezdrowie.gov.pl/login.jsp?locale=pl");
  await page.click("[type=submit]");
  await page.type("[name=username]", login);
  await page.type("[name=password]", password);
  await page.click("[name=login][type=submit]");
  await page.waitForLoadState("load");
  await page.goto("https://smk.ezdrowie.gov.pl?locale=pl");
  await page.waitForLoadState("load");
};

const handleNavigationToReportPage = async (page: Page) => {
  await page.click(`css=[data-row="${contextNumber - 1}"] [type=button]`);
  await page.click('"Elektroniczne karty specjalizacji"');
  await page.click('""'); // expand actions button
  await page.click('"Edycja"');
  await page.click('"Indeks wykonanych zabiegów i procedur medycznych"');
  await page.click('"Rozwiń"');
};

const handleReportSubmission = async (page: Page) => {
  const categoryContainerHeaders = await page.$$('"Kategoria:"');
  const categoryContainers = await Promise.all(
    categoryContainerHeaders.map((header) => header.$(getNthParentSelector(17)))
  );

  const selectedCategoryContainer = categoryContainers[categoryNumber - 1];

  if (!selectedCategoryContainer) {
    throw new Error(`Category with number ${categoryNumber} not found!`);
  }

  (await selectedCategoryContainer.$('"Rozwiń"')).click();

  const procedureContainerHeaders = await selectedCategoryContainer.$$(
    '"Procedura:"'
  );
  const procedureContainers = await Promise.all(
    procedureContainerHeaders.map((header) =>
      header.$(getNthParentSelector(11))
    )
  );

  const selectedProcedureContainer = procedureContainers[procedureNumber - 1];

  if (!selectedProcedureContainer) {
    throw new Error(`Procedure with number ${procedureNumber} not found!`);
  }

  (await selectedProcedureContainer.$('"Rozwiń"')).click();

  const addProcedureButton = await selectedProcedureContainer.$('"Dodaj"');

  for (let i = 0; i < 9; i++) {
    // TODO: read from Google docs
    const date = "2020-01-01";
    const year = "1";
    const operationCode = "A - operator";
    const doctorName = "";
    const place = "";
    const internshipName = "";
    const patientGender = "K";
    const assistant = "";
    const procedureGroup = "Radiologia ogólna";

    await addProcedureButton.click();
    await page.waitForTimeout(500);
    // new row always gets added as the first one
    const row = await selectedProcedureContainer.$(`css=[__gwt_row="0"]`);
    await row.click();

    const buildCellSelector = (nth, subselector) =>
      `css=td:nth-child(${nth}) ${subselector}`;

    const dateInput = await row.$(buildCellSelector(2, "input"));
    if (dateInput) {
      await dateInput.type(date);
    }

    const yearSelect = await row.$(buildCellSelector(4, "select"));
    if (yearSelect) {
      await yearSelect.selectOption(year);
    }

    const operationCodeSelect = await row.$(buildCellSelector(5, "select"));
    if (operationCodeSelect) {
      await operationCodeSelect.selectOption(operationCode);
    }

    const doctorNameInput = await row.$(buildCellSelector(6, "input"));
    if (doctorNameInput) {
      await doctorNameInput.type(doctorName);
    }

    const placeSelect = await row.$(buildCellSelector(7, "select"));
    if (placeSelect) {
      await placeSelect.selectOption(place);
    }

    const internshipNameSelect = await row.$(buildCellSelector(8, "select"));
    if (internshipNameSelect) {
      await internshipNameSelect.selectOption(internshipName);
    }

    const patientInitialsInput = await row.$(buildCellSelector(9, "input"));
    if (patientInitialsInput) {
      await patientInitialsInput.type(place);
    }

    const patientGenderSelect = await row.$(buildCellSelector(10, "select"));
    if (patientGenderSelect) {
      await patientGenderSelect.selectOption(patientGender);
    }

    const assistantInput = await row.$(buildCellSelector(11, "input"));
    if (assistantInput) {
      await assistantInput.type(assistant);
    }

    const procedureGroupInput = await row.$(buildCellSelector(12, "input"));
    if (procedureGroupInput) {
      await procedureGroupInput.type(procedureGroup);
    }
  }
};

(async () => {
  let browser: Browser;

  try {
    browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await handleLogin(page);
    await handleNavigationToReportPage(page);
    await handleReportSubmission(page);
  } catch (error) {
    console.error(error);
  }
})();
