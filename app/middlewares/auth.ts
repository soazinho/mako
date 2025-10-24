import { data, type RouterContextProvider, redirect } from "react-router";
import { userContext } from "~/contexts/context";
import { commitSession, getSession } from "~/server/session.server";
import { findUserById } from "~/server/user.server";

import type { User } from "~/types/user";

export const authMiddleware = async ({
	request,
	context,
}: {
	request: Request;
	context: RouterContextProvider;
}) => {
	const session = await getSession(request.headers.get("cookie"));
	const userId = session.get("userId");

	if (!userId) {
		throw redirect("/login");
	}

	const user = await findUserById(userId);

	if (!user) {
		throw redirect("/login");
	}

	const appUser: User = {
		id: user.id.toString(),
		name: user.name,
		email: user.email,
	};

	context.set(userContext, appUser);

	return data(
		{ error: session.get("error") },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	);
};
