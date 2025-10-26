import { render } from "@testing-library/react";
import type { FC } from "react";
import { createRoutesStub, type InitialEntry } from "react-router";
import { Toaster } from "~/components/ui/sonner";

export function renderRoute<T>(
	component: FC,
	path: string,
	action: () => Promise<T>,
	initialEntries: InitialEntry[] = ["/"],
) {
	const Stub = createRoutesStub([
		{
			path,
			Component: component,
			action,
		},
	]);

	render(
		<>
			<Stub initialEntries={initialEntries} />
			<Toaster />
		</>,
	);
}
