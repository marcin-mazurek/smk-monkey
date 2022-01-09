import * as XLSX from "xlsx";
import { FormRowValues } from "../types/formRowValues";
import { getProcedureNumber } from "./getProcedureNumber";
import { getGenderByPesel } from "./getGenderByPesel";
import { getInitials } from "./getInitials";

interface FixedValues {
  operationCode: string;
  doctorName: string;
  place: string;
  internshipName: string;
}

const shouldContinueIterating = (reportSheet, row) =>
  reportSheet[`A${row}`].v !== "RAZEM:";

export const parseReportExcelSheet = (
  fileName: string,
  firstRowWithData: number,
  reportSheetName: string,
  fixedValues: FixedValues
): FormRowValues[] => {
  const file = XLSX.readFile(fileName);
  const reportSheet = file.Sheets[reportSheetName];
  const results: FormRowValues[] = [];

  for (
    let row = firstRowWithData;
    shouldContinueIterating(reportSheet, row);
    row += 2
  ) {
    const rawDate = reportSheet[`C${row}`]?.v.slice(0, 10);

    if (!rawDate) {
      console.warn(`Row ${row} does not have a date field - skipping`);
      continue;
    }
    
    const [datePart1, datePart2, datePart3] = (rawDate || '').split('-');
    let date;

    // starts with year
    if (datePart1.length === 4) {
      date = `${datePart1}-${datePart2}-${datePart3}`; 
    } else {
      date = `${datePart3}-${datePart2}-${datePart1}`; 
    }

    const patientName = reportSheet[`G${row}`]?.v;
    const patientPesel = reportSheet[`G${row + 1}`]?.v;
    const examDescription = reportSheet[`H${row}`]?.v;
    const assistantName = reportSheet["M" + row]?.v;
    if (!patientName) {
      console.warn(`Row ${row} does not have a patientName field - skipping`);
      continue;
    }
    if (!patientPesel) {
      console.warn(`Row ${row} does not have a patientPesel field - skipping`);
      continue;
    }
    if (!examDescription) {
      console.warn(`Row ${row} does not have an examDescription field - skipping`);
      continue;
    }
    if (!assistantName) {
      console.warn(`Row ${row} does not have an assistantName field - skipping`);
      continue;
    }

    const procedureNumber = getProcedureNumber(examDescription || "");

    results.push({
      // TODO: make configurable
      yearOfResidency: (date || "").startsWith("2020") ? "1" : "2",
      patientGender: getGenderByPesel(patientPesel),
      patientInitials: getInitials(patientName),
      procedureGroup: examDescription,
      assistantName,
      procedureNumber,
      date,
      ...fixedValues,
    });
  }

  return results;
};
