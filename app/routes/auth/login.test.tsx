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

			const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
			await userEvent.type(emailInput, "cwd");

			expect(screen.getByText(/form.emailInvalid/i)).toBeInTheDocument();
		});

		test("password too short should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			const passwordInput = screen.getByPlaceholderText("•••••••");
			await userEvent.type(passwordInput, "tiny");

			expect(screen.getByText("form.passwordTooShort")).toBeInTheDocument();
		});

		test("anyform field error should disable login button", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
			await userEvent.type(emailInput, "dwq");

			const loginButton = screen.getByRole("button", { name: /login/i });
			expect(loginButton).toBeDisabled();
		});
	});

	test("when login loading should disable login button", async () => {
		const mockLoginLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Login, "/", mockLoginLoading);

		const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
		const passwordInput = screen.getByPlaceholderText("•••••••");
		await userEvent.type(emailInput, "hi, what's up? tudo bem?");
		await userEvent.type(passwordInput, "leslicornes++");

		const loginButton = screen.getByRole("button", { name: /login/i });
		await userEvent.click(loginButton);

		expect(loginButton).toBeDisabled();
		expect(loginButton).toHaveTextContent(/.../i);
	});

	test("when login fails should display error toast", async () => {
		const mockLoginError = vi
			.fn()
			.mockResolvedValue({ error: "an error occurred" });
		renderRoute(Login, "/", mockLoginError);

		const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
		const passwordInput = screen.getByPlaceholderText("•••••••");
		await userEvent.type(emailInput, "bob@example.com");
		await userEvent.type(passwordInput, "leslicornes++");

		const loginButton = screen.getByRole("button", { name: /login/i });
		await userEvent.click(loginButton);

		expect(await screen.findByText(/loginError/i)).toBeInTheDocument();
	});
});
