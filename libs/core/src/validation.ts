import { z } from "zod";
import {
    ChangePassword,
    ConfirmIdentifier,
    Identifier,
    NewTodo,
    NewUser,
    RequestPasswordResetIdentifier,
    ResetPasswordIdentifier,
    UpdateUser,
} from "./types/generated";

type Properties<T> = Required<{
    [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
    v !== undefined && v !== null;

export const definedNonNullAnySchema = z
    .any()
    .refine((v) => isDefinedNonNullAny(v));

export function ChangePasswordSchema(): z.ZodObject<
    Properties<ChangePassword>
> {
    return z.object({
        confirmPassword: z.string(),
        oldPassword: z.string(),
        password: z.string(),
    });
}

export function ConfirmIdentifierSchema(): z.ZodObject<
    Properties<ConfirmIdentifier>
> {
    return z.object({
        token: z.string(),
    });
}

export function IdentifierSchema(): z.ZodObject<Properties<Identifier>> {
    return z.object({
        password: z.string(),
        username: z.string(),
    });
}

export function NewTodoSchema(): z.ZodObject<Properties<NewTodo>> {
    return z.object({
        text: z.string(),
    });
}

export function NewUserSchema(): z.ZodObject<Properties<NewUser>> {
    return z.object({
        email: z.string(),
        password: z.string(),
        username: z.string(),
    });
}

export function RequestPasswordResetIdentifierSchema(): z.ZodObject<
    Properties<RequestPasswordResetIdentifier>
> {
    return z.object({
        email: z.string(),
    });
}

export function ResetPasswordIdentifierSchema(): z.ZodObject<
    Properties<ResetPasswordIdentifier>
> {
    return z.object({
        password: z.string(),
        token: z.string(),
    });
}

export function UpdateUserSchema(): z.ZodObject<Properties<UpdateUser>> {
    return z.object({
        email: z.string().nullish(),
        username: z.string().nullish(),
    });
}
