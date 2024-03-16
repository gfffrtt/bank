import { Elysia, t } from "elysia";
import { env } from "../../../env";
import { resend } from "../../../mail/client";
import SignInEmail from "../../../mail/templates/sign_in";

export const signIn = new Elysia()
    .post("/auth/sign-in", async ({ body }) => {
        const { email, token } = body;

        const resendError = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: email,
            subject: "Sign in confirmation",
            react: SignInEmail({token: token})
        })

        const { error } = resendError
        if (!error) return { status: 200, body: { message: "Email sent" } }

        return { status: 500, body: { message: "Email not sent" } }
    }, {
        body: t.Object({
            email: t.String(),
            token: t.String(),
        })
    })