import { Elysia, t } from "elysia";
import { VERIFY_SIGN_IN_ROUTE } from "./constants/verify_sign_in_route";
import { getUrlToVerifySignIn } from "./functions/get_url_to_verify_sign_in";
import { resend } from "../../../mail/client";
import { env } from "../../../env";
import { ERROR_WHILE_SENDING_SIGN_IN_VERIFY_EMAIL } from "./errors/error_while_sending_sign_in_verify_email";
import { VERIFY_SIGN_IN_EMAIL_SUCCESS } from "./constants/verify_sign_in_email_success";
import VerifySignInEmail from "../../../mail/templates/verify_sign_in";

export const verifySignIn = new Elysia().post(VERIFY_SIGN_IN_ROUTE, async ({ body }) => {
    const { email, token } = body;

        const url = getUrlToVerifySignIn({token:token});

        const resendError = await resend.emails.send({
            from: env.RESEND_FROM_EMAIL,
            to: email,
            subject: "[Bank App]: Sign in confirmation",
            react: VerifySignInEmail({url:url})
        })

        const { error } = resendError
        if (!error) return { status: 200, body: { message: VERIFY_SIGN_IN_EMAIL_SUCCESS } }

        return { status: 500, body: { message: ERROR_WHILE_SENDING_SIGN_IN_VERIFY_EMAIL } }

}, {
  body: t.Object({ email: t.String(), token: t.String() }),
});
