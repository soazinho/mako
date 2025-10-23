import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
] as const;

const formSchema = z.object({
	language: z.string(),
});

export function LanguageSelect() {
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.language;

	async function selectLanguage(data: z.infer<typeof formSchema>) {
		try {
			await i18n.changeLanguage(data.language);
			toast.success(t("selectLanguage.success"));
		} catch {
			toast.error(t("selectLanguage.error"));
		}
	}

	return (
		<Select
			name="language-select"
			defaultValue={currentLanguage}
			onValueChange={(language) => selectLanguage({ language })}
		>
			<SelectTrigger
				name="language-select-trigger"
				className="min-w-[120px] ring-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
			>
				<SelectValue />
			</SelectTrigger>

			<SelectContent position="item-aligned">
				{languages.map((language) => (
					<SelectItem key={language.value} value={language.value}>
						{language.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
