import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { toast } from "sonner";
import { LanguageSelect } from "~/components/language-select";
import { Button } from "~/components/ui/button";
import { sendEmail } from "~/server/email.server";

import type { Route } from "./+types/home";

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Welcome to Mako!" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const message = form.get("message")?.toString() || "";

	try {
		await sendEmail(message);
		toast.success("Email sent successfully!");
	} catch {
		toast.error("Error occurred while sending message.");
	}
}

export default function Home() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col h-screen">
			<header className="flex justify-between px-16 py-4 border-b border-gray-200">
				<Link to="/">
					<span className="text-2xl font-bold">Mako</span>
				</Link>

				<nav className="flex justify-center items-center gap-6">
					<Link to="/services" className="text-gray-700 hover:text-gray-900">
						{t("services")}
					</Link>
					<Link to="/team" className="text-gray-700 hover:text-gray-900">
						{t("team")}
					</Link>

					<LanguageSelect />
				</nav>
			</header>

			<main className="flex flex-1 flex-col justify-center items-center gap-8">
				<h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">
					{t("slogans.main")}
				</h1>

				<div>
					<p className="text-lg">{t("slogans.sub")}</p>
				</div>

				<Button type="submit">{t("contactUs")}</Button>
			</main>
		</div>
	);
}
