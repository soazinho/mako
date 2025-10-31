import { expect, test } from "@playwright/test";

test.describe("Home", () => {
	test("has title", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveTitle(/Mako/);
	});

	test.describe("contact request form validation", () => {
		test("message too short should display field error", async ({ page }) => {
			await page.goto("/");

			await page.getByRole("textbox", { name: "message" }).fill("bob");

			const messageError = page.getByText("Message must be at least 10");
			await expect(messageError).toBeVisible();
		});

		test("anyform field error should disable contact us button", async ({
			page,
		}) => {
			await page.goto("/");

			await page.getByRole("textbox", { name: "message" }).fill("bob");

			const button = page.getByRole("button", { name: /contact us/i });
			await expect(button).toBeDisabled();
		});
	});

	test("when send email loading should disable contact us button", async ({
		page,
	}) => {
		await page.goto("/");

		await page
			.getByRole("textbox", { name: "message" })
			.fill("hi, what's up? tudo bem?sqwwq");

		const button = page.getByRole("button");
		await button.click();

		await expect(button).toBeDisabled();
		await expect(button).toHaveText(/.../i);
	});

	test("when send email succeeds should display success toast", async ({
		page,
	}) => {
		await page.goto("/");

		await page
			.getByRole("textbox", { name: "message" })
			.fill("hi, what's up? tudo bem?");

		const button = page.getByRole("button");
		await button.click();

		const successToast = page.getByText(/Contact request sent!/i);
		await expect(successToast).toBeVisible();
	});

	test("when send email fails should display error toast", async ({ page }) => {
		await page.goto("/");

		await page
			.getByRole("textbox", { name: "message" })
			.fill("hi, what's up? tudo bem?");

		const button = page.getByRole("button");
		await button.click();

		const errorToast = page.getByRole("alert", {
			name: "bo",
		});
		await expect(errorToast).toBeVisible();
	});
});
