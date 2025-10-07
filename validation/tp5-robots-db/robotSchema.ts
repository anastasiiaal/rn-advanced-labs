// validation/robotSchema.ts
import { RobotType } from "@/services/tp5-robots-db/robotsRepo";
import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const robotCreateSchema = yup.object({
    name: yup.string().trim().min(2).required(),
    label: yup.string().trim().min(3).required(),
    year: yup
        .number()
        .transform((v, o) => (typeof o === "string" ? Number(o.replace(/\s+/g, "")) : v))
        .integer()
        .min(1950)
        .max(currentYear)
        .required(),
    type: yup.mixed<RobotType>().oneOf(["industrial", "service", "medical", "educational", "other"]).required(),
    archived: yup.boolean().default(false),
});

export const robotUpdateSchema = robotCreateSchema.shape({
    id: yup.string().uuid().required(),
    created_at: yup.number().required(),
    updated_at: yup.number().required(),
});
