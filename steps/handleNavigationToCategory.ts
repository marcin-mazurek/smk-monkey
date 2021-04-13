import { ElementHandle, Page } from "playwright";
import { getNthParentSelector } from "../helpers/getNthParentSelector";

export const handleNavigationToCategory = async (
  page: Page,
  categoryNumber: number
): Promise<ElementHandle<SVGElement | HTMLElement>> => {
  const categoryContainerHeaders = await page.$$('"Kategoria:"');
  const categoryContainers = await Promise.all(
    categoryContainerHeaders.map((header) => header.$(getNthParentSelector(17)))
  );

  const selectedCategoryContainer = categoryContainers[categoryNumber - 1];

  if (!selectedCategoryContainer) {
    throw new Error(`Category with number ${categoryNumber} not found!`);
  }

  await (await selectedCategoryContainer.$('"Rozwiń"')).click();

  return selectedCategoryContainer;
};
