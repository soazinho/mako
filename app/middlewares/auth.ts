import type { User } from "~/types/user";

import { redirect } from "react-router";
import { userContext } from "~/context";

export async function authMiddleware({
  request,
  context,
}: {
  request: any;
  context: any;
}) {
  // TODO: Get user from session
  // const user = await getUserFromSession(request);

  const user: User = {
    id: "2",
    name: "bob",
    email: "bob@example.com",
    phone: "418-999-9999",
  };

  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
}
