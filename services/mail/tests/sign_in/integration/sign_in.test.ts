import axios from "axios";
import { expect, describe, it } from "bun:test";
import { env } from "../../../src/env";
import { SIGN_IN_ROUTE } from "../../../src/http/routes/sign_in/constants/sign_in_route";

describe("Test the sign in route", () => {
    it("Should send an email to the user with the sign in link", async () => {
        const input = {
            email: "geogueserporque@gmail.com",
            token: "123456",
        }

        const output = await axios.post(`${env.MAIL_SERVICE_URL}/${SIGN_IN_ROUTE}`, input);

        expect(output.status).toBe(200);
    });
});