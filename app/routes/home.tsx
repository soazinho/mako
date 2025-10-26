import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useFetcher } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { LanguageSelect } from "~/components/language-select";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { sendEmail } from "~/server/email.server";
import type { Route } from "./+types/home";

const contactRequestSchema = z.object({
	message: z.string().min(10, "Message must be at least 10 characters."),
});

export function meta() {
	return [
		{ title: "Mako" },
		{ name: "description", content: "Welcome to Mako!" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const message = form.get("message")?.toString() || "";

	try {
		await sendEmail(message);
		toast.success("Email sent successfully!");
	} catch {
		toast.error("Error occurred while sending message.");
	}
}

export default function Home() {
	const { t } = useTranslation();
	const fetcher = useFetcher();

	const form = useForm<z.infer<typeof contactRequestSchema>>({
		resolver: zodResolver(contactRequestSchema),
		defaultValues: {
			message: "",
		},
	});

	function onSubmit(data: z.infer<typeof contactRequestSchema>) {
		fetcher.submit(data, {
			method: "POST",
			encType: "application/x-www-form-urlencoded",
		});
	}

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

			<main className="flex flex-1 flex-col justify-center items-center gap-8">
				<h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">
					{t("slogans.main")}
				</h1>

				<div>
					<p className="text-lg">{t("slogans.sub")}</p>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Controller
						name="message"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="message">Email</FieldLabel>
								<Input
									{...field}
									type="text"
									placeholder="Enter your message here..."
									aria-invalid={fieldState.invalid}
									required
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Button type="submit">{t("contactUs")}</Button>
				</form>
			</main>
		</div>
	);
}
