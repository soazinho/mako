import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
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

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Mako - Register" },
	];
}

const registerFormSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 5 characters." }),
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." }),
});

export default function RegisterPage() {
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof registerFormSchema>) {
		toast.success(data.email);
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
									Already have an account? <Link to="/login">Login</Link>
								</FieldDescription>
							</div>

							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">Name</FieldLabel>
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
								<Button type="submit">Register</Button>
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
