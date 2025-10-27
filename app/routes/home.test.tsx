import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";
import Home from "./home";

describe("Home", () => {
	describe("contact request form validation", () => {
		beforeEach(() => {
			const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
			renderRoute(Home, "/", mockSendEmail);
		});

		test("message too should display field error", async () => {
			await writeContactRequestMessage("tiny");

			expect(screen.getByText("form.messageTooShort")).toBeInTheDocument();
		});

		test("anyform field error should disable contact us button", async () => {
			await writeContactRequestMessage("tiny");

			const contactUsButton = screen.getByRole("button", {
				name: /contactUs/i,
			});
			expect(contactUsButton).toBeDisabled();
		});
	});

	test("when send email loading should disable contact usbutton", async () => {
		const mockSendEmailLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Home, "/", mockSendEmailLoading);

		await writeContactRequestMessage("hi, what's up? tudo bem?");

		const contactUsButton = screen.getByRole("button", { name: /contactUs/i });
		await userEvent.click(contactUsButton);

		expect(contactUsButton).toBeDisabled();
		expect(contactUsButton).toHaveTextContent(/.../i);
	});

	test("when send email succeeds should display success toast", async () => {
		const mockSendEmailSuccess = vi.fn().mockResolvedValue({ success: true });
		renderRoute(Home, "/", mockSendEmailSuccess);

		await writeContactRequestMessage("hi, what's up? tudo bem?");

		const contactUsButton = screen.getByRole("button", { name: /contactUs/i });
		await userEvent.click(contactUsButton);

		expect(
			await screen.findByText(/contactRequest.success/i),
		).toBeInTheDocument();
	});

	test("when send email fails should display error toast", async () => {
		const mockSendEmailError = vi.fn().mockResolvedValue({ success: false });
		renderRoute(Home, "/", mockSendEmailError);

		await writeContactRequestMessage("hi, what's up? tudo bem?");

		const contactUsButton = screen.getByRole("button", { name: /contactUs/i });
		await userEvent.click(contactUsButton);

		expect(
			await screen.findByText(/contactRequest.error/i),
		).toBeInTheDocument();
	});
});

async function writeContactRequestMessage(message: string) {
	const messageInput: HTMLInputElement = screen.getByRole("textbox");

	await userEvent.type(messageInput, message);
}
