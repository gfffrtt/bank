import { Elysia, t } from "elysia";
import { CALLBACK_ROUTE } from "./constants/callback_route";
import jwt from "@elysiajs/jwt";
import { env } from "../../../../env";
import { MALFORMED_TOKEN } from "./error/malformed_token";
import { SUCCESSFULLY_SIGNED_IN } from "./constants/successfully_signed_in";
import { db } from "../../../../db/client";
import { user } from "../../../../db/schema/user";
import { cookie } from "@elysiajs/cookie";

export const callback = new Elysia()
  .use(
    jwt({
      secret: env.AUTH_SERVICE_SECRET,
    })
  )
  .get(
    CALLBACK_ROUTE,
    async ({ query, jwt }) => {
      const { token } = query;
      const jwtVerifyError = await jwt.verify(token);
      if (!jwtVerifyError) return { status: 401, message: MALFORMED_TOKEN };
      const { sub } = jwtVerifyError;
      if (!sub) return { status: 401, message: MALFORMED_TOKEN };

      const [signedInUser] = await db
        .insert(user)
        .values({
          email: sub,
        })
        .returning({ id: user.id, email: user.email });

      return { status: 200, message: SUCCESSFULLY_SIGNED_IN };
    },
    {
      query: t.Object({
        token: t.String(),
      }),
    }
  );
