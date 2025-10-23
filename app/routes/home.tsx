import type { Route } from "./+types/home";

import { LanguageSelect } from "~/components/language-select";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mako" },
    { name: "description", content: "Welcome to Mako!" },
  ];
}

export default function Home() {
  return (
    <>
      <LanguageSelect />
    </>
  );
}
