import { Elysia } from "elysia";
import { signIn } from "./routes/sign_in/route";
import { callback } from "./routes/sign_in/callback/route";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { env } from "../env";

const app = new Elysia()
  .use(signIn)
  .use(callback);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
