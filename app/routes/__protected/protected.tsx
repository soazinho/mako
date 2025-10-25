import { useTranslation } from "react-i18next";
import { Form, Link, redirect } from "react-router";
import { LanguageSelect } from "~/components/language-select";
import { Button } from "~/components/ui/button";
import { userContext } from "~/contexts/context";
import { authMiddleware } from "~/middlewares/auth";
import { destroySession, getSession } from "~/server/session.server";

import type { Route } from "./+types/protected";

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Mako - Protected" },
	];
}

export const middleware = [authMiddleware];

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export async function loader({ context }: Route.LoaderArgs) {
	const user = context.get(userContext);
	return user;
}

export default function Protected() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col h-screen ">
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

					<Form method="post">
						<Button>Logout</Button>
					</Form>
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
