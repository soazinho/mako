import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export default function Services() {
	const { t } = useTranslation();

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

			<div className="flex flex-row gap-8 w-full justify-center items-center">
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>AI Development</CardTitle>
						<CardDescription>
							Integrate AI into your existing systems or build new ones from
							scratch.
						</CardDescription>
					</CardHeader>
					<CardContent>miaw</CardContent>
				</Card>

				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>Software Development</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>miaw</CardContent>
				</Card>

				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>miaw</CardContent>
				</Card>
			</div>
		</main>
	);
}
