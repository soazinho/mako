import { zodResolver } from "@hookform/resolvers/zod";
import type { TFunction } from "i18next";
import { GalleryVerticalEnd } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	data,
	Form,
	Link,
	redirect,
	useActionData,
	useNavigation,
} from "react-router";
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
import { register } from "~/server/user.server";
import type { Route } from "./+types/register";

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Mako - Register" },
	];
}

const registerFormSchema = (t: TFunction) =>
	z.object({
		name: z.string().min(2, { message: t("form.nameTooShort") }),
		email: z.email(t("form.emailInvalid")),
		password: z.string().min(8, { message: t("form.passwordTooShort") }),
	});

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const name = form.get("name")?.toString() || "";
	const email = form.get("email")?.toString() || "";
	const password = form.get("password")?.toString() || "";

	const existerUser = await register({ name, email, password });

	if (existerUser !== null) {
		return data({ error: "User already exists." });
	}

	return redirect("/login");
}

export default function Register() {
	const { t } = useTranslation();
	const actionData = useActionData();

	const navigation = useNavigation();
	const isSubmitting = navigation.formAction === "/register";

	const formSchema = registerFormSchema(t);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (actionData?.error) {
			toast.error(t("registerError"), {
				description: actionData?.error,
				duration: 2000,
			});
		}
	}, [actionData, t]);

	return (
		<div className="flex flex-col h-screen w-full">
			<main className="flex flex-1 flex-col justify-center items-center">
				<div className="flex flex-col gap-6">
					<Form method="post">
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
								<h1 className="text-xl font-bold">{t("slogans.welcome")}</h1>
								<FieldDescription>
									{t("alreadyHaveAccount")}{" "}
									<Link to="/login">{t("login")}</Link>
								</FieldDescription>
							</div>

							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">{t("name")}</FieldLabel>
										<Input
											{...field}
											type="text"
											placeholder="Jane Doe"
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
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="email">{t("email")}</FieldLabel>
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
										<FieldLabel htmlFor="password">{t("password")}</FieldLabel>
										<Input
											{...field}
											type="password"
											placeholder="•••••••"
											aria-invalid={fieldState.invalid}
											required
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Button
								disabled={!form.formState.isValid || isSubmitting}
								className="cursor-pointer"
								type="submit"
							>
								{isSubmitting ? "..." : t("register")}
							</Button>
						</FieldGroup>
					</Form>

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
