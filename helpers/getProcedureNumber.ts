export const getProcedureNumber = (inputExamDescription: string): number => {
  const examDescription = inputExamDescription.toLowerCase().trim();

  if (
    examDescription.startsWith("rtg górnego odcinka") ||
    examDescription.startsWith("cystografia") ||
    examDescription.startsWith("wlew") ||
    examDescription.startsWith("urografia") ||
    examDescription.startsWith("rtg uretrografia") ||
    examDescription.startsWith("badanie jelita")
  ) {
    return 2;
  }

  if (examDescription.includes("rtg")) {
    return 1;
  }

  if (examDescription.startsWith("usg")) {
    return 3;
  }

  if (inputExamDescription.includes("TK")) {
    return 4;
  }

  throw new Error("Unknown exam description: " + examDescription);
};
