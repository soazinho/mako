import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderRoute } from "~/lib/test-utils";

describe("Register", () => {
	describe("when contact request message is not long enough", () => {
		beforeEach(() => {
			const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
			renderRoute(Home, "/", mockSendEmail);
		});

		test("should display validation errors", async () => {
			await writeContactRequestMessage("tiny");

			expect(
				screen.getByText("Message must be at least 10 characters."),
			).toBeInTheDocument();
		});

		test("should have the contactUs button disabled", async () => {
			await writeContactRequestMessage("tiny");

			expect(
				screen.getByText("Message must be at least 10 characters."),
			).toBeInTheDocument();
			const contactUsButton = screen.getByRole("button", {
				name: /contactUs/i,
			});
			expect(contactUsButton).toBeDisabled();
		});
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
