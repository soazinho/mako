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

			const nameInput = screen.getByPlaceholderText(/Jane Doe/i);
			await userEvent.type(nameInput, "1");

			expect(screen.getByText(/form.nameTooShort/i)).toBeInTheDocument();
		});

		test("email invalid should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
			await userEvent.type(emailInput, "cwd");

			expect(screen.getByText(/form.emailInvalid/i)).toBeInTheDocument();
		});

		test("password too short should display field error", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			const passwordInput = screen.getByPlaceholderText("•••••••");
			await userEvent.type(passwordInput, "tiny");

			expect(screen.getByText("form.passwordTooShort")).toBeInTheDocument();
		});

		test("anyform field error should disable register button", async () => {
			const mockLogin = vi.fn().mockResolvedValue(() => Promise.resolve());
			renderRoute(Register, "/", mockLogin);

			const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
			await userEvent.type(emailInput, "dwq");

			const registerButton = screen.getByRole("button", { name: /register/i });
			expect(registerButton).toBeDisabled();
		});
	});

	test("when register loading should disable register button", async () => {
		const mockRegisterLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Register, "/", mockRegisterLoading);

		const nameInput = screen.getByPlaceholderText(/Jane Doe/i);
		const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
		const passwordInput = screen.getByPlaceholderText("•••••••");
		await userEvent.type(nameInput, "moakim");
		await userEvent.type(emailInput, "hi, what's up? tudo bem?");
		await userEvent.type(passwordInput, "leslicornes++");

		const registerButton = screen.getByRole("button", { name: /register/i });
		await userEvent.click(registerButton);

		expect(registerButton).toBeDisabled();
		expect(registerButton).toHaveTextContent(/.../i);
	});

	test("when register fails should display error toast", async () => {
		const mockLoginError = vi
			.fn()
			.mockResolvedValue({ error: "an error occurred" });
		renderRoute(Register, "/", mockLoginError);

		const nameInput = screen.getByPlaceholderText(/Jane Doe/i);
		const emailInput = screen.getByPlaceholderText(/jane.doe@example.com/i);
		const passwordInput = screen.getByPlaceholderText("•••••••");
		await userEvent.type(nameInput, "oklidon");
		await userEvent.type(emailInput, "bob@example.com");
		await userEvent.type(passwordInput, "leslicornes++");

		const loginButton = screen.getByRole("button", { name: /register/i });
		await userEvent.click(loginButton);

		expect(await screen.findByText(/registerError/i)).toBeInTheDocument();
	});
});
