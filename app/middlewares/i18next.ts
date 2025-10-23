import { initReactI18next } from "react-i18next";
import { createCookie } from "react-router";
import { createI18nextMiddleware } from "remix-i18next/middleware";
import "i18next";

import resources from "~/locales"; // Import your locales

// This cookie will be used to store the user locale preference
export const localeCookie = createCookie("lng", {
	path: "/",
	sameSite: "lax",
	secure: process.env.NODE_ENV === "production",
	httpOnly: true,
});

export const [i18nextMiddleware, getLocale, getInstance] =
	createI18nextMiddleware({
		detection: {
			supportedLanguages: ["en", "fr"], // Your supported languages, the fallback should be last
			fallbackLanguage: "en", // Your fallback language
			cookie: localeCookie, // The cookie to store the user preference
		},
		i18next: { resources }, // Your locales
		plugins: [initReactI18next], // Plugins you may need, like react-i18next
	});

// This adds type-safety to the `t` function
declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: typeof resources.en; // Use `en` as source of truth for the types
	}
}
