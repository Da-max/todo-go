import * as generated from "./generated/validation";
import { z } from "zod";

export * from "./generated/validation";

export function ChangePasswordSchema() {
    const obj = generated.ChangePasswordSchema();
    return obj.refine((o) => o.password === o.confirmPassword, {
        message: "Merci de vérifier que les deux mots de passe sont égaux.",
    });
}

export function NewUserSchema() {
    const obj = generated.NewUserSchema();
    return obj
        .extend({
            confirmPassword: z
                .string({
                    required_error: "Ce champs est requis.",
                    invalid_type_error: "Ce champs est requis.",
                })
                .min(1),
        })
        .refine((o) => o.password === o.confirmPassword, {
            message: "Merci de vérifier que les deux mots de passe sont égaux.",
        });
}
