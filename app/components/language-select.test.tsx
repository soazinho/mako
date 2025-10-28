import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { renderComponent } from "~/lib/test-utils";
import { LanguageSelect } from "./language-select";

describe("LanguageSelect", () => {
	test("should display language select default language", () => {
		renderComponent(<LanguageSelect />);

		expect(ui.select()).toHaveTextContent(/en/i);
	});

	test("when language select click should display available languages", async () => {
		renderComponent(<LanguageSelect />);

		await userEvent.click(ui.select());

		expect(ui.selectOptions().length).toBeGreaterThan(0);
	});

	test("when language selected should display the language", async () => {
		renderComponent(<LanguageSelect />);
		const select = ui.select();
		await userEvent.click(select);

		const frenchOption = ui.selectOption("FR");
		await userEvent.click(frenchOption);

		expect(select).toHaveTextContent(/fr/i);
	});

	test("when language selected successfully should display success toast", async () => {
		renderComponent(<LanguageSelect />);
		const select = ui.select();
		await userEvent.click(select);

		const frenchOption = ui.selectOption("FR");
		await userEvent.click(frenchOption);

		expect(await ui.selectLanguageSuccess()).toBeInTheDocument();
	});

	test("when language selected fails should display error toast", async () => {
		renderComponent(<LanguageSelect />);
		const select = ui.select();
		await userEvent.click(select);

		const frenchOption = ui.selectOption("FR");
		await userEvent.click(frenchOption);

		expect(await ui.selectLanguageSuccess()).toBeInTheDocument();
	});
});

const ui = {
	select: () => screen.getByRole("combobox"),
	selectOption: (optionName: string) =>
		screen.getByRole("option", { name: optionName }),
	selectOptions: () => screen.getAllByRole("option"),
	selectLanguageSuccess: async () =>
		await screen.findByText("selectLanguage.success"),
	selectLanguageError: async () =>
		await screen.findByText("selectLanguage.error"),
};
