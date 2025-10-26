import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";
import Home from "./home";

describe("Home", () => {
	test("when contact request message is not long enough should display validation error", async () => {
		const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
		renderRoute(Home, "/", mockSendEmail);

		await writeContactRequestMessage("tiny");

		expect(
			screen.getByText("Message must be at least 10 characters."),
		).toBeInTheDocument();
	});

	test("when send contact request loading should display three dots on button", async () => {
		const mockSendEmailLoading = vi
			.fn()
			.mockImplementation(() => new Promise(() => {}));
		renderRoute(Home, "/", mockSendEmailLoading);

		await writeContactRequestMessage("hi, what's up? tudo bem?");

		const contactUsButton = screen.getByRole("button", { name: /contactUs/i });
		await userEvent.click(contactUsButton);

		expect(contactUsButton).toHaveTextContent(/.../i);
	});

	test("when send contact request succeeds should display success toast", async () => {
		const mockSendEmailSuccess = vi.fn().mockResolvedValue({ success: true });
		renderRoute(Home, "/", mockSendEmailSuccess);

		await writeContactRequestMessage("hi, what's up? tudo bem?");

		const contactUsButton = screen.getByRole("button", { name: /contactUs/i });
		await userEvent.click(contactUsButton);

		expect(
			await screen.findByText(/contactRequest.success/i),
		).toBeInTheDocument();
	});

	test("when send contact request fails should display error toast", async () => {
		const mockSendEmailSuccess = vi.fn().mockResolvedValue({ success: false });
		renderRoute(Home, "/", mockSendEmailSuccess);

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
