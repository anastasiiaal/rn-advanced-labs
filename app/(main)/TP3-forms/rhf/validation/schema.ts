import { z } from "zod";

export const contactSchema = z
    .object({
        email: z.string().email("Email invalide"),
        password: z.string().min(6, "Mot de passe trop court (min 6 caractères)"),
        confirmPassword: z.string().min(6, "Confirmation requise"),
        displayName: z.string().min(2, "Nom trop court"),
        termsAccepted: z.boolean().refine((val) => val === true, {
            message: "Vous devez accepter les conditions",
        }),
    })
    .refine((data) => data.confirmPassword === data.password, {
        path: ["confirmPassword"],
        message: "Les mots de passe ne correspondent pas",
    });

export type ContactFormData = z.infer<typeof contactSchema>;

export default function IgnoreMe() {
    return null;
}