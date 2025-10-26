export default {
	title: "Mako",
	description: "Des applications simples qui répondent à vos besoins.",

	services: "Services",
	team: "Équipes",

	contactRequest: {
		success: "Message envoyé!",
		error: "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
	},

	contactUs: "Contactez-nous",

	slogans: {
		main: "Créons l'application qui répond à vos besoins.",
		sub: "De la prise de vos besoins au MVP, jusqu'à une application maintenble et évolutive.",
	},

	selectLanguage: {
		success: "Votre préférence de langue a été changée.",
		error: "Une erreur a survenu lors du changement de langue.",
	},
} satisfies typeof import("~/locales/en/translation").default;
