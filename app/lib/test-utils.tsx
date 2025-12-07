import { render } from "@testing-library/react";
import type { FunctionComponent } from "react";
import {
	type ActionFunction,
	createRoutesStub,
	type LoaderFunction,
} from "react-router";
import { Toaster } from "~/components/ui/sonner";

export function renderComponent(component: React.ReactNode) {
	render(
		<>
			{component}
			<Toaster />
		</>,
	);
}

export function renderRoute(
	Component: FunctionComponent,
	path: string,
	action?: ActionFunction,
	loader?: LoaderFunction,
) {
	const Stub = createRoutesStub([
		{
			path,
			Component,
			action,
			loader,
		},
	]);

	render(
		<>
			<Stub initialEntries={[path]} />
			<Toaster />
		</>,
	);
}
