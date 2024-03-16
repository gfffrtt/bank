import { env } from "../../../env";

export const getUrlToCompleteSignIn = (token: string) => {
    return `${env.BANK_APP_URL}/auth/sign_in/callback?token=${token}`;
};