import { Html, Text } from "@react-email/components"

export default function SignInEmail({ token }: SignInEmailProps) {
    return (
        <Html>
            <Text>
                {token}
            </Text>
        </Html>
    );
};

export type SignInEmailProps = {
    token: string;
};