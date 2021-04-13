import { ElementHandle } from "playwright";
import { FormRowValues } from "../types/formRowValues";

export const handleFillingFormRow = async (
  row: ElementHandle<SVGElement | HTMLElement>,
  formValues: FormRowValues
) => {
  const buildCellSelector = (nth, subselector) =>
    `css=td:nth-child(${nth}) ${subselector}`;

  const dateInput = await row.$(buildCellSelector(2, "input"));
  if (dateInput) {
    await dateInput.type(formValues.date);
  } else {
    console.error("Couldn't find the date input");
  }

  const yearSelect = await row.$(buildCellSelector(4, "select"));
  if (yearSelect) {
    await yearSelect.selectOption(formValues.yearOfResidency);
  } else {
    console.error("Couldn't find the year select");
  }

  const operationCodeSelect = await row.$(buildCellSelector(5, "select"));
  if (operationCodeSelect) {
    await operationCodeSelect.selectOption(formValues.operationCode);
  } else {
    console.error("Couldn't find the operation code select");
  }

  const doctorNameInput = await row.$(buildCellSelector(6, "input"));
  if (doctorNameInput) {
    await doctorNameInput.type(formValues.doctorName);
  } else {
    console.error("Couldn't find the doctor name input");
  }

  const placeSelect = await row.$(buildCellSelector(7, "select"));
  if (placeSelect) {
    await placeSelect.selectOption(formValues.place);
  } else {
    console.error("Couldn't find the place select");
  }

  const internshipNameSelect = await row.$(buildCellSelector(8, "select"));
  if (internshipNameSelect) {
    await internshipNameSelect.selectOption(formValues.internshipName);
  } else {
    console.error("Couldn't find the internship name select");
  }

  const patientInitialsInput = await row.$(buildCellSelector(9, "input"));
  if (patientInitialsInput) {
    await patientInitialsInput.type(formValues.patientInitials);
  } else {
    console.error("Couldn't find the patient initials input");
  }

  const patientGenderSelect = await row.$(buildCellSelector(10, "select"));
  if (patientGenderSelect) {
    await patientGenderSelect.selectOption(formValues.patientGender);
  } else {
    console.error("Couldn't find the patient gender select");
  }

  const assistantInput = await row.$(buildCellSelector(11, "input"));
  if (assistantInput) {
    await assistantInput.type(formValues.assistantName);
  } else {
    console.error("Couldn't find the assistant input");
  }

  const procedureGroupInput = await row.$(buildCellSelector(12, "input"));
  if (procedureGroupInput) {
    await procedureGroupInput.type(formValues.procedureGroup);
  } else {
    console.error("Couldn't find the procedure group input");
  }
};
