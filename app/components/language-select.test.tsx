import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { LanguageSelect } from "./language-select";

describe("LanguageSelect", () => {
	test("should display language select default language", () => {
		render(<LanguageSelect />);

		const select = screen.getByRole("combobox");
		expect(select).toHaveTextContent(/en/i);
	});

	test("on language select click should display available languages", async () => {
		render(<LanguageSelect />);
		const selectTrigger = screen.getByRole("combobox");

		await userEvent.click(selectTrigger);

		const options = screen.queryAllByRole("option");
		expect(options.length).toBeGreaterThan(0);
	});

	test("on language selected should display the language", async () => {
		render(<LanguageSelect />);
		const selectTrigger = screen.getByRole("combobox");
		await userEvent.click(selectTrigger);
		const frenchOption = screen.getByRole("option", {
			name: /fr/i,
		});

		await userEvent.click(frenchOption);

		expect(selectTrigger).toHaveTextContent(/fr/i);
	});
});
