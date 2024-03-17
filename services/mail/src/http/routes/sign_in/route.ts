import { Elysia, t } from "elysia";
import { env } from "../../../env";
import { resend } from "../../../mail/client";
import SignInEmail from "../../../mail/templates/sign_in";
import { getUrlToCompleteSignIn } from "./functions/get_url_to_complete_sign_in";
import { SIGN_IN_ROUTE } from "./constants/sign_in_route";
import { ERROR_WHILE_SENDING_SIGN_IN_CONFIRMATION_EMAIL } from "./errors/error_while_sending_sign_in_confirmation_email";
import { CONFIRMATION_SIGN_IN_EMAIL_SUCCESS } from "./constants/confirmation_sign_in_email_success";

export const signIn = new Elysia()
    .post(SIGN_IN_ROUTE, async ({ body }) => {
        const { email, token } = body;

        const url = getUrlToCompleteSignIn({token:token});

        const resendError = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: email,
            subject: "[Bank App]: Sign in confirmation",
            react: SignInEmail({url:url})
        })

        const { error } = resendError
        if (!error) return { status: 200, body: { message: CONFIRMATION_SIGN_IN_EMAIL_SUCCESS } }

        return { status: 500, body: { message: ERROR_WHILE_SENDING_SIGN_IN_CONFIRMATION_EMAIL } }
    }, {
        body: t.Object({
            email: t.String(),
            token: t.String(),
        })
    })