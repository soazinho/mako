import { redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { userContext } from "~/contexts/context";
import { authMiddleware } from "~/middlewares/auth";
import { destroySession, getSession } from "~/server/session.server";
import type { Route } from "./+types/protected";

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}

export const middleware = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
	const user = context.get(userContext);
	return user;
}

export default function Protected({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<h1>Welcome {loaderData?.email}!</h1>
			<h2>Your email is {loaderData?.name}.</h2>
			<form method="post">
				<Button>Logout</Button>
			</form>
		</div>
	);
}
