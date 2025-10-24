import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link, redirect, useSubmit } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { commitSession, getSession } from "~/server/session.server";
import { login } from "~/server/user.server";

import type { Route } from "./+types/login";

export function meta() {
	return [{ title: "Mako" }, { name: "description", content: "Mako - Login" }];
}

const loginFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." }),
});

export async function action({ request }: Route.ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	const form = await request.formData();
	const email = form.get("email")?.toString() || "";
	const password = form.get("password")?.toString() || "";

	const user = await login({ email, password });
	const userId = user?.id;

	if (userId == null) {
		session.flash("error", "Invalid username/password.");

		// Redirect back to the login page with errors.
		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	session.set("userId", userId.toString());

	// Login succeeded, send them to the protected page.
	return redirect("/protected", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function LoginPage() {
	const submit = useSubmit();
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof loginFormSchema>) {
		// TODO: DOES NOT WORK
		try {
			await submit(
				{ email: data.email, password: data.password },
				{ action: "/login", method: "post" },
			);

			toast.success("success");
		} catch {
			toast.error("error");
		}
	}

	return (
		<div className="flex flex-col h-screen w-full">
			<main className="flex flex-1 flex-col justify-center items-center">
				<div className="flex flex-col gap-6">
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<Link
									to="#"
									className="flex flex-col items-center gap-2 font-medium"
								>
									<div className="flex size-8 items-center justify-center rounded-md">
										<GalleryVerticalEnd className="size-6" />
									</div>
									<span className="sr-only">Mako</span>
								</Link>
								<h1 className="text-xl font-bold">Welcome to Mako.</h1>
								<FieldDescription>
									Don&apos;t have an account?{" "}
									<Link to="/register">Register</Link>
								</FieldDescription>
							</div>

							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											{...field}
											type="email"
											placeholder="jane.doe@example.com"
											aria-invalid={fieldState.invalid}
											required
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											{...field}
											type="password"
											aria-invalid={fieldState.invalid}
											required
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Field>
								<Button type="submit">Login</Button>
							</Field>
						</FieldGroup>
					</form>
					<FieldDescription className="px-6 text-center">
						By clicking continue, you agree to our{" "}
						<Link to="#">Terms of Service</Link> and{" "}
						<Link to="#">Privacy Policy</Link>.
					</FieldDescription>
				</div>
			</main>
		</div>
	);
}
