import { useTranslation } from "react-i18next";

export function meta() {
	return [{ title: "Mako" }, { name: "description", content: "Mako - About" }];
}

export default function Team() {
	const { t } = useTranslation();

	return (
		<main className="flex flex-1 flex-col justify-center items-center gap-8">
			<h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">
				{t("slogans.main")}
			</h1>

			<div>
				<p className="text-lg">{t("slogans.sub")}</p>
			</div>
		</main>
	);
}
