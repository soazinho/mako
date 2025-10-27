import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";
import Register from "./register";

describe("Register", () => {
	describe("register form validation", () => {
		test("name too short should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			await userEvent.type(ui.nameInput(), "1");

			expect(ui.form.nameTooShortError()).toBeInTheDocument();
		});

		test("email invalid should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			await userEvent.type(ui.emailInput(), "cwd");

			expect(ui.form.emailInvalidError()).toBeInTheDocument();
		});

		test("password too short should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			await userEvent.type(ui.passwordInput(), "tiny");

			expect(ui.form.passwordTooShort()).toBeInTheDocument();
		});

		test("anyform field error should disable register button", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			await userEvent.type(ui.emailInput(), "dwq");

			expect(ui.registerButton()).toBeDisabled();
		});
	});

	test("when register loading should disable register button", async () => {
		const mockRegisterLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Register, "/", mockRegisterLoading);

		await userEvent.type(ui.nameInput(), "moakim");
		await userEvent.type(ui.emailInput(), "hi, what's up? tudo bem?");
		await userEvent.type(ui.passwordInput(), "leslicornes++");

		const button = ui.registerButton();
		await userEvent.click(button);

		expect(button).toBeDisabled();
		expect(button).toHaveTextContent(/.../i);
	});

	test("when register fails should display error toast", async () => {
		const mockLoginError = vi
			.fn()
			.mockResolvedValue({ error: "an error occurred" });
		renderRoute(Register, "/", mockLoginError);

		await userEvent.type(ui.nameInput(), "oklidon");
		await userEvent.type(ui.emailInput(), "bob@example.com");
		await userEvent.type(ui.passwordInput(), "leslicornes++");

		await userEvent.click(ui.registerButton());

		expect(await ui.registerError()).toBeInTheDocument();
	});
});

const ui = {
	nameInput: () => screen.getByPlaceholderText(/jane doe/i),
	emailInput: () => screen.getByPlaceholderText(/jane.doe@example.com/i),
	passwordInput: () => screen.getByPlaceholderText("•••••••"),
	registerButton: () => screen.getByRole("button", { name: /register/i }),
	registerError: async () => await screen.findByText(/registerError/i),

	form: {
		nameTooShortError: () => screen.getByText(/form.nameTooShort/i),
		emailInvalidError: () => screen.getByText(/form.emailInvalid/i),
		passwordTooShort: () => screen.getByText(/form.passwordTooShort/i),
	},
};
