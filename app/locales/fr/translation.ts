export default {
	title: "Mako",
	description: "Des applications simples qui répondent à vos besoins.",

	services: "Services",
	team: "Équipe",

	login: "Se connecter",
	loginError: "Connexion échouée. Veuillez réessayer plus tard.",
	register: "Créer un compte",
	registerError:
		"La création du compte a échouée. Veuillez réessayer plus tard.",

	name: "Nom",
	email: "Email",
	password: "Mot de passe",
	alreadyHaveAccount: "Déjà un compte?",
	dontHaveAccount: "Vous n'avez pas de compte?",

	contactRequest: {
		success: "Message envoyé!",
		error: "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
		messagePlaceholder: "Entrez votre message ici...",
		messageSent: "Votre message sera envoyé à l'équipe de Mako.",
	},

	contactUs: "Contactez-nous",

	form: {
		nameTooShort: "Le nom doit contenir au moins 2 caractères.",
		emailInvalid: "Adresse e-mail invalide.",
		passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères.",
		messageTooShort: "Le message doit contenir au moins 10 caractères.",
	},

	slogans: {
		main: "Créons l'application qui répond à vos besoins.",
		sub: "De la prise de vos besoins au MVP, jusqu'à une application maintenble et évolutive.",
		welcome: "Bienvenue à Mako!",
	},

	selectLanguage: {
		success: "Votre préférence de langue a été changée!",
		error: "Une erreur a survenu lors du changement de langue.",
	},
} satisfies typeof import("~/locales/en/translation").default;
