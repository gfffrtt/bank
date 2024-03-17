import { z } from "zod";

const envSchema = z.object({
    DB_URL: z.string(),
    MAIL_SERVICE_URL: z.string(),
    AUTH_SERVICE_SECRET: z.string(),
})

export const env = envSchema.parse(process.env);