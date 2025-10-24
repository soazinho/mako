import { useTranslation } from "react-i18next";

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Mako - Protected" },
	];
}

export default function Protected() {
	const { t } = useTranslation();

	return (
		<main className="flex flex-1 flex-col justify-center items-center">
			<h1 className="text-4xl font-bold">{t("slogans.main")}</h1>
			<div>
				<p className="text-lg">{t("slogans.sub")}</p>
			</div>
		</main>
	);
}
