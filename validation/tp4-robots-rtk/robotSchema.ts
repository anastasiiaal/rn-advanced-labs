import * as yup from "yup";

// TypeScript type
export type RobotType = "industrial" | "service" | "medical" | "educational" | "other";

export interface Robot {
    id: string; // uuid
    name: string;
    label: string;
    year: number;
    type: RobotType;
}

const currentYear = new Date().getFullYear();

export const robotSchema = yup.object({
    id: yup.string().uuid().required(),
    name: yup
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .required("Le nom est obligatoire"),
    label: yup
        .string()
        .min(3, "Le label doit contenir au moins 3 caractères")
        .required("Le label est obligatoire"),
    year: yup
        .number()
        .typeError("L'année doit être un nombre")
        .integer("L'année doit être un entier")
        .min(1950, "Année minimale : 1950")
        .max(currentYear, `Année maximale : ${currentYear}`)
        .required("L'année est obligatoire"),
    type: yup
        .mixed<RobotType>()
        .oneOf(["industrial", "service", "medical", "educational", "other"], "Type invalide")
        .required("Le type est obligatoire"),
});
