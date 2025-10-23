import type { Route } from "./+types/home";

import { Welcome } from "~/components/welcome/welcome";
import { LanguageSwitcher } from "~/components/language-switcher";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mako" },
    { name: "description", content: "Welcome to Mako!" },
  ];
}

export default function Home() {
  return (
    <>
      <LanguageSwitcher />
      <Welcome />
    </>
  );
}
