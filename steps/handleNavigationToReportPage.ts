import { Page } from "playwright";

export const handleNavigationToReportPage = async (
  page: Page,
  contextNumber: number
) => {
  await page.click(`css=[data-row="${contextNumber - 1}"] [type=button]`);
  await page.click('"Elektroniczne karty specjalizacji"');
  await page.click('""'); // expand actions button
  await page.click('"Edycja"');
  await page.click('"Indeks wykonanych zabiegów i procedur medycznych"');
  await page.click('"Rozwiń"');
};
