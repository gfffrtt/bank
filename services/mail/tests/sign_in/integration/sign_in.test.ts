import {describe, expect, it} from "vitest";

describe("Test the sign in route", () => {
    it("Should send an email to the user with the sign in link", async () => {
        const input = {
            email: "geogueserporque@gmail.com",
            token: "123456",
        }

        const output = await fetch("http://localhost:4000/auth/sign-in", {
            method: "POST",
            body: JSON.stringify(input),
        })

        expect(output.status).toBe(200);
        expect(output.body).toBe("Email sent");
    });
});