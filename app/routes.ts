import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),

	layout("routes/auth/layout.tsx", [
		route("login", "routes/auth/login.tsx"),
		route("register", "routes/auth/register.tsx"),
	]),

	route("protected", "routes/__protected/protected.tsx"),

	route("api/locales/:lng/:ns", "routes/locales.ts"),
] satisfies RouteConfig;
