import * as Yup from "yup";

export const contactSchema = Yup.object({
    email: Yup.string()
        .email("Email invalide")
        .required("Email requis"),
    password: Yup.string()
        .min(6, "Mot de passe trop court (min 6 caractères)")
        .required("Mot de passe requis"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Confirmation requise"),
    displayName: Yup.string()
        .min(2, "Nom trop court")
        .required("Nom requis"),
    termsAccepted: Yup.boolean()
        .oneOf([true], "Vous devez accepter les conditions"),
});

export default function IgnoreMe() {
    return null;
}
