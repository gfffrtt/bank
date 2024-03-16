import { Elysia } from "elysia";
import { env } from "../env";
import { signIn } from "./routes/sign_in/route";

const app = new Elysia()
  .onError(({ body, code }) => {
    console.log(body, code);
  })
  .use(signIn);

app.listen(env.MAIL_SERVICE_PORT);
