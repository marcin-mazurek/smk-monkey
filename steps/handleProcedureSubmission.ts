import { ElementHandle, Page } from "playwright";
import { FormRowValues } from "../types/formRowValues";
import { getNthParentSelector } from "../helpers/getNthParentSelector";
import { handleFillingFormRow } from "./handleFillingFormRow";

export const handleProcedureSubmission = async (
  page: Page,
  selectedCategoryContainer: ElementHandle<SVGElement | HTMLElement>,
  procedureNumber: number,
  formRows: FormRowValues[]
) => {
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

  await (await selectedProcedureContainer.$('"Rozwiń"')).click();

  const addProcedureButton = await selectedProcedureContainer.$('"Dodaj"');

  for (const formRow of formRows) {
    await addProcedureButton.click();
    await page.waitForTimeout(500);
    // new row always gets added as the first one
    const row = await selectedProcedureContainer.$(`css=[__gwt_row="0"]`);
    await row.click();
    await handleFillingFormRow(row, formRow);
  }
};
