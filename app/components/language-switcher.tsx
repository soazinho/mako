import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useCallback } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  locale: z.string(),
});

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locale: i18n.language,
    },
  });

  const handleLanguageSwitch = useCallback(
    async (locale: string) => {
      try {
        await i18n.changeLanguage(locale);

        if (i18n.language !== locale) {
          throw new Error("Language switch failed.");
        }

        toast.success(t("languages.switch"));
      } catch {
        toast.error(t("languages.switchError"));
      }
    },
    [i18n],
  );

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="locale"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={handleLanguageSwitch}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-transparent">
                    <SelectValue>
                      <span className="font-semibold">
                        {i18n.language.toUpperCase()}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="font-semibold">
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="fr">FR</SelectItem>
                  <SelectItem disabled value="pt">
                    PT (Em breve 🚧)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
