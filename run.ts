import { chromium } from "playwright";
import { groupBy } from "lodash";
import { handleLogin } from "./steps/handleLogin";
import { handleNavigationToReportPage } from "./steps/handleNavigationToReportPage";
import { handleNavigationToCategory } from "./steps/handleNavigationToCategory";
import { handleProcedureSubmission } from "./steps/handleProcedureSubmission";
import { parseReportExcelSheet } from "./helpers/parseReportExcelSheet";
import {
  categoryNumber,
  contextNumber,
  doctorName,
  internshipName,
  login,
  operationCode,
  password,
  place,
  reportFileName,
  reportFirstRowWithData,
  reportSheetName,
} from "./config";

(async () => {
  try {
    const formRows = parseReportExcelSheet(
      reportFileName,
      reportFirstRowWithData,
      reportSheetName,
      { operationCode, doctorName, place, internshipName }
    );

    const formRowsGroupedByProcedures = groupBy(
      formRows.slice(0, 25),
      "procedureNumber"
    );

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await handleLogin(page, login, password);
    await handleNavigationToReportPage(page, contextNumber);
    const categoryContainer = await handleNavigationToCategory(
      page,
      categoryNumber
    );

    for (const [procedureNumber, formRows] of Object.entries(
      formRowsGroupedByProcedures
    )) {
      await handleProcedureSubmission(
        page,
        categoryContainer,
        Number(procedureNumber),
        formRows
      );
    }
  } catch (error) {
    console.error(error);
  }
})();
