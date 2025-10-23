import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { LanguageSelect } from "~/components/language-select";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Welcome to Mako!" },
	];
}

export default function Home() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col h-screen w-full">
			<header className="flex justify-around py-4 border-b border-gray-200">
				<Link to="/">
					<span className="text-2xl font-bold">Mako</span>
				</Link>

				<nav className="flex justify-center items-center space-x-4">
					<Link to="/services" className="text-gray-700 hover:text-gray-900">
						{t("services")}
					</Link>
					<Link to="/team" className="text-gray-700 hover:text-gray-900">
						{t("team")}
					</Link>

					<LanguageSelect />
				</nav>
			</header>

			<main className="flex flex-1 flex-col justify-center items-center">
				<h1 className="text-4xl font-bold">{t("slogans.main")}</h1>
				<div>
					<p className="text-lg">{t("slogans.sub")}</p>
				</div>
			</main>
		</div>
	);
}
