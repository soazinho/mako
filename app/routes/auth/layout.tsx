import { Outlet } from "react-router";
import { LanguageSelect } from "~/components/language-select";

export default function AuthLayout() {
	return (
		<div className="flex flex-col h-screen">
			<header className="flex justify-end px-16 py-4">
				<LanguageSelect />
			</header>

			<Outlet />
		</div>
	);
}
