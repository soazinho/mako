import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";

import Login from "./login";

describe("Login", () => {
	describe("login form validation", () => {
		test("email invalid should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			await userEvent.type(ui.emailInput(), "cwd");

			expect(ui.form.emailInvalidError()).toBeInTheDocument();
		});

		test("password too short should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			await userEvent.type(ui.passwordInput(), "tiny");

			expect(ui.form.passwordTooShortError()).toBeInTheDocument();
		});

		test("anyform field error should disable login button", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			await userEvent.type(ui.emailInput(), "dwq");

			expect(ui.loginButton()).toBeDisabled();
		});
	});

	test("when login loading should disable login button", async () => {
		const mockLoginLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Login, "/", mockLoginLoading);

		await userEvent.type(ui.emailInput(), "hi, what's up? tudo bem?");
		await userEvent.type(ui.passwordInput(), "leslicornes++");

		const button = ui.loginButton();
		await userEvent.click(button);

		expect(button).toBeDisabled();
		expect(button).toHaveTextContent(/.../i);
	});

	test("when login fails should display error toast", async () => {
		const mockLoginError = vi
			.fn()
			.mockResolvedValue({ error: "an error occurred" });
		renderRoute(Login, "/", mockLoginError);

		await userEvent.type(ui.emailInput(), "bob@example.com");
		await userEvent.type(ui.passwordInput(), "leslicornes++");

		await userEvent.click(ui.loginButton());

		expect(await ui.loginError()).toBeInTheDocument();
	});
});

const ui = {
	emailInput: () => screen.getByPlaceholderText(/jane.doe@example.com/i),
	passwordInput: () => screen.getByPlaceholderText("•••••••"),
	loginButton: () => screen.getByRole("button", { name: /login/i }),
	loginError: async () => await screen.findByText(/loginError/i),

	form: {
		emailInvalidError: () => screen.getByText(/form.emailInvalid/i),
		passwordTooShortError: () => screen.getByText(/form.passwordTooShort/i),
	},
};
