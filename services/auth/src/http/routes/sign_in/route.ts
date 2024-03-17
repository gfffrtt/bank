import jwt from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { env } from "../../../env";
import { SIGN_IN_ROUTE } from "./constants/sign_in_route";
import { sendEmailVerification } from "./functions/send_email_verification";
import { ERROR_WHILE_SENDING_VERIFICATION_EMAIL } from "./errors/error_while_sending_verification_email";
import { SEND_VERIFICATION_EMAIL_SUCCESS } from "./constants/send_verification_email_success";

export const signIn = new Elysia()
  .use(
    jwt({
      secret: env.AUTH_SERVICE_SECRET,
    })
  )
  .post(
    SIGN_IN_ROUTE,
    async ({ body, jwt }) => {
      const { email } = body;
      const token = await jwt.sign({ sub: email });
      
      const sendEmailVerificationError = await sendEmailVerification({
        email: email,
        token: token,
      })
      if (sendEmailVerificationError === ERROR_WHILE_SENDING_VERIFICATION_EMAIL) {
        return { status: 500, body: sendEmailVerificationError };
      }

      return { status: 200, body: SEND_VERIFICATION_EMAIL_SUCCESS };
    },
    {
      body: t.Object({
        email: t.String(),
      }),
    }
  );
