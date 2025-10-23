import type { Route } from "./+types/home";

import { Welcome } from "~/components/welcome/welcome";
import { authMiddleware } from "~/middlewares/auth";
import { userContext } from "~/context";
import { LanguageSelect } from "~/components/language-select";

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
      <LanguageSelect />
      <Welcome />
      {loaderData.user?.name}
    </>
  );
}
