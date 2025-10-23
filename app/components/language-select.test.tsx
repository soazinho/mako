import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";

import Home from "~/routes/home";

describe("LanguageSelect", () => {
  test("should display default language", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/home",
        Component: Home,
      },
    ]);

    render(<Stub initialEntries={["/home"]} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("English");
  });
});
