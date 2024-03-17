import { env } from "../../../../env";

export const getUrlToCompleteSignIn = (params: GetUrlToCompleteSignInParams) => {
    const { token } = params;
    return `${env.BANK_APP_URL}/auth/sign_in/callback?token=${token}`;
};

export type GetUrlToCompleteSignInParams = {
    token: string;
}