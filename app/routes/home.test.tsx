import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";
import Home from "./home";

describe("Home", () => {
	describe("contact request form validation", () => {
		test("message too short should display field error", async () => {
			const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
			renderRoute(Home, "/", mockSendEmail);

			await userEvent.type(ui.messageInput(), "bob");

			expect(ui.form.messageTooShortError()).toBeInTheDocument();
		});

		test("anyform field error should disable contact us button", async () => {
			const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
			renderRoute(Home, "/", mockSendEmail);

			await userEvent.type(ui.messageInput(), "bob");

			expect(ui.contactUsButton()).toBeDisabled();
		});
	});

	test("when send email loading should disable contact us button", async () => {
		const mockSendEmailLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Home, "/", mockSendEmailLoading);

		await userEvent.type(ui.messageInput(), "hi, what's up? tudo bem?");

		const button = ui.contactUsButton();
		await userEvent.click(button);

		expect(button).toBeDisabled();
		expect(button).toHaveTextContent(/.../i);
	});

	test("when send email succeeds should display success toast", async () => {
		const mockSendEmailSuccess = vi.fn().mockResolvedValue({ success: true });
		renderRoute(Home, "/", mockSendEmailSuccess);

		await userEvent.type(ui.messageInput(), "hi, what's up? tudo bem?");

		await userEvent.click(ui.contactUsButton());

		expect(await ui.contactRequestSuccess()).toBeInTheDocument();
	});

	test("when send email fails should display error toast", async () => {
		const mockSendEmailError = vi.fn().mockResolvedValue({ success: false });
		renderRoute(Home, "/", mockSendEmailError);

		await userEvent.type(ui.messageInput(), "hi, what's up? tudo bem?");

		await userEvent.click(ui.contactUsButton());

		expect(await ui.contactRequestError()).toBeInTheDocument();
	});
});

const ui = {
	messageInput: () =>
		screen.getByPlaceholderText(/contactRequest.messagePlaceholder/i),
	contactUsButton: () => screen.getByRole("button", { name: /contactUs/i }),
	contactRequestSuccess: async () =>
		await screen.findByText(/contactRequest.success/i),
	contactRequestError: async () =>
		await screen.findByText(/contactRequest.error/i),

	form: {
		messageTooShortError: () => screen.getByText(/form.messageTooShort/i),
	},
};
