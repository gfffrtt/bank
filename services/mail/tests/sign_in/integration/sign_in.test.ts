import axios from "axios";
import { expect, describe, it } from "bun:test";

describe("Test the sign in route", () => {
    it("Should send an email to the user with the sign in link", async () => {
        const input = {
            email: "geogueserporque@gmail.com",
            token: "123456",
        }

        const output = await axios.post("http://localhost:4000/auth/sign-in", input);

        expect(output.status).toBe(200);
    });
});