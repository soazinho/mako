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
	const session = await getSession(request.headers.get("Cookie"));
	const userId = session.get("userId");

	if (!userId) {
		throw redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	const user = await findUserById(userId);
	if (!user) return data({ error: "User in session not found." });

	const appUser: User = {
		...user,
		id: user.id.toString(),
	};

	context.set(userContext, appUser);
};
