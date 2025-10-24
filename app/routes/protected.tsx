import { userContext } from "~/contexts/context";
import { authMiddleware } from "~/middlewares/auth";

import type { Route } from "./+types/protected";

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
		</div>
	);
}
