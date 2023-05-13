"use client";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form } from "@/components/Form";
import { PlusCircle, XCircle } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createAccountFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .transform((name) =>
        name
          .trim()
          .split(" ")
          .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
          .join(" ")
      ),
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Formato de e-mail inválido")
      .toLowerCase()
      .refine(
        (email) => email.endsWith("@p4ed.com.br"),
        "O e-mail precisa ser da Poliedro (@p4ed.com.br)"
      ),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirm_password: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),
    techs: z
      .array(
        z.object({
          title: z.string().nonempty("o título é obrigatório"),
        })
      )
      .min(3, "Pelo menos 3 tecnologias devem ser informadas"),
    avatar: z
      .instanceof(FileList)
      .refine((files) => !!files.item(0), "A imagem de perfil é obrigatória")
      .refine(
        (files) => files.item(0)?.size ?? 0 <= MAX_FILE_SIZE,
        `Tamanho máximo de 5MB`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files.item(0)?.type ?? ''),
        "Formato de imagem inválido"
      )
      .transform((files) => {
        return files.item(0)!;
      }),
  })
  .refine((fields) => fields.confirm_password === fields.password, {
    message: "A confirmação de senha não é igual",
    path: ["confirm_password"],
  });

type CreateAccountFormData = z.infer<typeof createAccountFormSchema>;

export default function SignUpPage() {
  const [output, setOutput] = useState("");
  const createAccountForm = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
  } = createAccountForm;
  const userPassword = watch("password");
  const isPasswordStrong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  ).test(userPassword);
  const {
    fields: techs,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTech() {
    append({ title: "" });
  }
  function createAccount(data: CreateAccountFormData) {
    setOutput(JSON.stringify(data, null, 2));
  }

  console.log('pass here - ', Date.now())
  return (
    <main className="h-screen flex flex-row gap-6 items-center justify-center">
      <FormProvider {...createAccountForm}>
        <form
          onSubmit={handleSubmit(createAccount)}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Form.Field>
            <Form.Label htmlFor="avatar">Avatar</Form.Label>

            <Form.Input type="file" name="avatar" />
            <Form.ErrorMessage field="avatar" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input type="name" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">
              Senha
              {isPasswordStrong ? (
                <span className="text-xs text-emerald-600">Senha forte</span>
              ) : (
                <span className="text-xs text-red-500">Senha fraca</span>
              )}
            </Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="confirm_password">Confirmar Senha</Form.Label>
            <Form.Input type="password" name="confirm_password" />
            <Form.ErrorMessage field="confirm_password" />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Tecnologias
              <button
                type="button"
                onClick={addNewTech}
                className="text-emerald-500 font-semibold text-xs flex items-center gap-1"
              >
                Adicionar nova
                <PlusCircle size={20} />
              </button>
            </Form.Label>
            <Form.ErrorMessage field="techs" />

            {techs.map((tech, index) => {
              const fieldName = `techs.${index}.title`;

              return (
                <Form.Field key={tech.id}>
                  <div className="flex gap-2 items-center">
                    <Form.Input type={fieldName} name={fieldName} />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                  <Form.ErrorMessage field={fieldName} />
                </Form.Field>
              );
            })}
          </Form.Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
          >
            Register
          </button>
        </form>
      </FormProvider>

      {output && (
        <pre className="text-sm bg-zinc-800 text-zinc-100 p-6 rounded-lg">
          {output}
        </pre>
      )}
    </main>
  );
}
