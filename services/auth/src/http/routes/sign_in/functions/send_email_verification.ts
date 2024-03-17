import axios from "axios";
import { env } from "../../../../env";
import { ERROR_WHILE_SENDING_VERIFICATION_EMAIL } from "../errors/error_while_sending_verification_email";

export const sendEmailVerification = async (params: SendEmailVerificationParam) => {
    const { email, token } = params;

    const mailServicePayload = {
        email: email,
        token: token,
    }
    const mailServiceResponse = await axios.post(env.MAIL_SERVICE_URL, mailServicePayload) 

    if (mailServiceResponse.status !== 200) return ERROR_WHILE_SENDING_VERIFICATION_EMAIL;    
};

export type SendEmailVerificationParam = {
    email: string;
    token: string;
}