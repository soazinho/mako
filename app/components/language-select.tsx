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
	{ label: "EN", value: "en" },
	{ label: "FR", value: "fr" },
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
				className="min-w-12 cursor-pointer"
			>
				<SelectValue />
			</SelectTrigger>
			<SelectContent
				className="min-w-12 "
				position="item-aligned"
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				{languages.map((language) => (
					<SelectItem
						key={language.value}
						value={language.value}
						className="cursor-pointer"
					>
						{language.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
