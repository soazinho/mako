import { vi } from "vitest";

import "@testing-library/jest-dom/vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: "en",
      },
    };
  },
}));
