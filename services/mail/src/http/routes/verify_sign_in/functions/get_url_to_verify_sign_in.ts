import { env } from "../../../../env";

export const getUrlToVerifySignIn = (params: GetUrlToVerifySignInParams) => {
    const { token } = params;
    return `${env.BANK_APP_URL}/auth/sign_in/callback?token=${token}`;
};

export type GetUrlToVerifySignInParams = {
    token: string;
}