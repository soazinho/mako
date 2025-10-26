import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import { LanguageSelect } from "~/components/language-select";

export default function Layout() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col h-screen">
			<header className="flex justify-between px-16 py-4 border-b border-gray-200">
				<Link to="/">
					<span className="text-2xl font-bold">Mako</span>
				</Link>

				<nav className="flex justify-center items-center gap-6">
					<Link to="/services" className="text-gray-700 hover:text-gray-900">
						{t("services")}
					</Link>
					<Link to="/team" className="text-gray-700 hover:text-gray-900">
						{t("team")}
					</Link>

					<LanguageSelect />
				</nav>
			</header>

			<Outlet />
		</div>
	);
}
