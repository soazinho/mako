import type { Route } from "./+types/home";

import { Welcome } from "~/components/welcome/welcome";
import { LanguageSwitcher } from "~/components/language-switcher";
import { authMiddleware } from "~/middlewares/auth";
import { userContext } from "~/context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mako" },
    { name: "description", content: "Welcome to Mako!" },
  ];
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  return { user };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <LanguageSwitcher />
      <Welcome />
      {loaderData.user?.name}
    </>
  );
}
