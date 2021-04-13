import { Page } from "playwright";

export const handleLogin = async (
  page: Page,
  login: string,
  password: string
) => {
  await page.goto("https://smk.ezdrowie.gov.pl/login.jsp?locale=pl");
  await page.click("[type=submit]");
  await page.type("[name=username]", login);
  await page.type("[name=password]", password);
  await page.click("[name=login][type=submit]");
  await page.waitForLoadState("load");
  await page.goto("https://smk.ezdrowie.gov.pl?locale=pl");
  await page.waitForLoadState("load");
};
