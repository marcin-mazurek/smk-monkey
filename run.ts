import { chromium } from "playwright";
import { handleLogin } from "./steps/handleLogin";
import { handleNavigationToReportPage } from "./steps/handleNavigationToReportPage";
import { handleNavigationToCategory } from "./steps/handleNavigationToCategory";
import { handleProcedureSubmission } from "./steps/handleProcedureSubmission";

// TODO: read from Google doc
const login = "";
const password = "";
const contextNumber = 3;
const categoryNumber = 1;
const procedureNumber = 1; // use getProcedureNumber

(async () => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await handleLogin(page, login, password);
    await handleNavigationToReportPage(page, contextNumber);
    const categoryContainer = await handleNavigationToCategory(
      page,
      categoryNumber
    );

    await handleProcedureSubmission(page, categoryContainer, procedureNumber, [
      {
        date: "2020-01-01", // kolumna D
        year: "1", // dla 2020 pierwszy rok, dla 2021 drugi rok
        operationCode: "A - operator", // hardcode
        doctorName: "", // hardcode
        place: "SPSK Nr 1 im Prof. Stanisława Szyszko ŚUM w Katowicach", // hardcode
        internshipName: "Staż podstawowy", // hardcode
        patientGender: "M", // getGenderByPesel
        patientInitials: "", // TODO
        assistantName: "", // kolumna M
        procedureGroup: "", // dla procedury 1: "Badanie RTG"
        // dla procedury 2: "Badanie RTG kontrastowe"
        // dla procedury 3: "Badanie USG"
        // dla procedury 4: "Badanie tomografii komputerowej"
      },
    ]);
  } catch (error) {
    console.error(error);
  }
})();
