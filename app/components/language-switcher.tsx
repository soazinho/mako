import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FieldGroup, Field } from "./ui/field";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Portugues", value: "pt" },
] as const;

const formSchema = z.object({
  language: z.string(),
});

export function LanguageSwitcher() {
  // const { i18n, t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "i18n.language",
    },
  });

  async function changeLanguage(data: z.infer<typeof formSchema>) {
    try {
      // await i18n.changeLanguage(data.language);

      toast.success(t("languages.switch"));
    } catch {
      toast.error(t("languages.switchError"));
    }
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <form
      id="select-language-form"
      onSubmit={form.handleSubmit(changeLanguage)}
    >
      <FieldGroup>
        <Controller
          name="language"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="select-language-form-trigger"
                  aria-invalid={fieldState.invalid}
                  className="min-w-[120px] ring-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent position="item-aligned">
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
