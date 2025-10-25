import { useTranslation } from "react-i18next";
import { Form, Link, redirect } from "react-router";
import { LanguageSelect } from "~/components/language-select";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
	return context.get(userContext);
}

export default function Protected({ loaderData }: Route.ComponentProps) {
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
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>{loaderData?.name}</CardTitle>
						<CardDescription>Developer</CardDescription>
						<CardAction>
							<Button variant="link">Sign Up</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input type="email" placeholder="m@example.com" required />
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											to="#"
											className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input type="password" required />
								</div>
							</div>
						</form>
					</CardContent>
					{/*<CardFooter className="flex-col gap-2">
						<Button type="submit" className="w-full">
							Login
						</Button>
						<Button variant="outline" className="w-full">
							Login with Google
						</Button>
					</CardFooter>*/}
				</Card>
			</main>
		</div>
	);
}
