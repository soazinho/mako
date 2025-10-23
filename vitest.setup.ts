import { vi } from "vitest";

import "@testing-library/jest-dom/vitest";

window.HTMLElement.prototype.hasPointerCapture = vi.fn();

vi.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: (str: string) => str,
			i18n: {
				changeLanguage: () => Promise.resolve(),
				language: "en",
			},
		};
	},
}));
