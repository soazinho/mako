import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { LanguageSelect } from "./language-select";

describe("LanguageSelect", () => {
	test("should display language select default language", () => {
		render(<LanguageSelect />);

		expect(ui.select()).toHaveTextContent(/en/i);
	});

	test("when language select click should display available languages", async () => {
		render(<LanguageSelect />);

		await userEvent.click(ui.select());

		expect(ui.selectOptions().length).toBeGreaterThan(0);
	});

	test("when language selected should display the language", async () => {
		render(<LanguageSelect />);
		const select = ui.select();
		await userEvent.click(select);

		const frenchOption = ui.selectOption("FR");
		await userEvent.click(frenchOption);

		expect(select).toHaveTextContent(/fr/i);
	});
});

const ui = {
	select: () => screen.getByRole("combobox"),
	selectOption: (optionName: string) =>
		screen.getByRole("option", { name: optionName }),
	selectOptions: () => screen.getAllByRole("option"),
};
