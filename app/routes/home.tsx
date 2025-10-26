import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { data, useFetcher } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Field, FieldError } from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { sendEmail } from "~/server/email.server";
import type { Route } from "./+types/home";

const contactRequestSchema = z.object({
	message: z.string().min(10, "Message must be at least 10 characters."),
});

export function meta() {
	return [{ title: "Mako" }, { name: "description", content: "Mako - Home" }];
}

export async function action({ request }: Route.ActionArgs) {
	const form = await request.formData();
	const message = form.get("message")?.toString() || "";

	try {
		await sendEmail(message);

		return data({
			success: true,
			message: "Message successfully sent.",
		});
	} catch {
		return data({ success: false, message: "Failed to send message." });
	}
}

export default function Home() {
	const { t } = useTranslation();

	const fetcher = useFetcher();
	const busy = fetcher.state !== "idle";

	const form = useForm<z.infer<typeof contactRequestSchema>>({
		resolver: zodResolver(contactRequestSchema),
		mode: "onChange",
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

	useEffect(() => {
		if (fetcher.data && fetcher.state === "idle") {
			if (fetcher.data.success === true) {
				toast.success(t("contactRequest.success"));
			} else if (fetcher.data.success === false) {
				toast.error(t("contactRequest.error"));
			}
		}
	}, [fetcher.data, fetcher.state, t]);

	return (
		<main className="flex flex-1 flex-col justify-center items-center gap-24">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">
					{t("slogans.main")}
				</h1>

				<div>
					<p className="text-lg">{t("slogans.sub")}</p>
				</div>
			</div>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-10"
			>
				<Controller
					name="message"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							data-invalid={fieldState.invalid}
							className="flex flex-col gap-4 "
						>
							<Textarea
								{...field}
								className="bg-white"
								cols={50}
								rows={7}
								placeholder="Enter your message here..."
								aria-invalid={fieldState.invalid}
								required
							/>
							<p className="text-muted-foreground text-sm">
								Your message will be sent to Mako team.
							</p>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button
					disabled={!form.formState.isValid || busy}
					className="cursor-pointer"
					type="submit"
				>
					{busy ? "..." : t("contactUs")}
				</Button>
			</form>
		</main>
	);
}
