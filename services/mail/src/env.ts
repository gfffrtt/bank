import { z } from "zod";

const envSchema = z.object({
    MAIL_SERVICE_PORT: z.number(),
    RESEND_API_TOKEN: z.string(),
    RESEND_FROM_EMAIL: z.string(),
    BANK_APP_URL: z.string(),
})

export const env = envSchema.parse(process.env);