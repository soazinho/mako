import { render } from "@testing-library/react";
import { Toaster } from "~/components/ui/sonner";

export function renderComponent(component: React.ReactNode) {
	render(
		<>
			{component}
			<Toaster />
		</>,
	);
}
