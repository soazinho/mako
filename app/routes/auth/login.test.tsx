import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";

import Login from "./login";

describe("Login", () => {
	describe("login form validation", () => {
		test("email is invalid", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Login, "/", mockLogin);

			const emailInput = screen.getByRole("textbox", { name: /email/i });

			await userEvent.type(emailInput, "invalidEmail");

			expect(screen.getByText("emailInvalid")).toBeInTheDocument();
		});

		// test("password is not long enough", async () => {
		// 	const passwordInput = screen.getByRole("textbox", { name: /password/i });

		// 	await userEvent.type(passwordInput, "tiny");

		// 	expect(screen.getByText("passwordNotLongEnough")).toBeInTheDocument();
		// });

		// test("form field error should disable login button", async () => {
		// 	const emailInput = screen.getByRole("textbox", { name: /email/i });

		// 	await userEvent.type(emailInput, "invalidEmail");

		// 	const loginButton = screen.getByRole("button", { name: /login/i });
		// 	expect(loginButton).toBeDisabled();
		// });
	});

	// test("when send contact request loading should display three dots on button", async () => {
	// 	const mockLoginLoading = vi
	// 		.fn()
	// 		.mockImplementation(() => new Promise(() => {}));
	// 	renderRoute(Login, "/", mockLoginLoading);

	// 	const emailInput = screen.getByRole("textbox", { name: /email/i });
	// 	const passwordInput = screen.getByRole("textbox", { name: /password/i });
	// 	await userEvent.type(emailInput, "hi, what's up? tudo bem?");
	// 	await userEvent.type(passwordInput, "leslicornes++");

	// 	const loginButton = screen.getByRole("button", { name: /login/i });
	// 	await userEvent.click(loginButton);

	// 	expect(loginButton).toHaveTextContent(/.../i);
	// });

	// test("when login fails should display error toast", async () => {
	// 	const mockLoginEmailError = vi
	// 		.fn()
	// 		.mockRejectedValue(new Error("an error"));
	// 	renderRoute(Login, "/", mockLoginEmailError);

	// 	const emailInput = screen.getByRole("textbox", { name: /email/i });
	// 	const passwordInput = screen.getByRole("textbox", { name: /password/i });
	// 	await userEvent.type(emailInput, "bob@example.com");
	// 	await userEvent.type(passwordInput, "leslicornes++");

	// 	const loginButton = screen.getByRole("button", { name: /login/i });
	// 	await userEvent.click(loginButton);

	// 	expect(await screen.findByText(/form.error/i)).toBeInTheDocument();
	// });
});
