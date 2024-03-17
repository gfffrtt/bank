// @ts-expect-error
import { Button, Html, Tailwind } from "@react-email/components";

export default function SignInEmail({ url }: SignInEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Button
          key={url}
          href={url}
          className="flex text-white font-bold font-sans w-fit bg-zinc-800 hover:cursor-pointer rounded-md px-4 py-2"
        >
          Confirm login
        </Button>
      </Tailwind>
    </Html>
  );
}

export type SignInEmailProps = {
  url: string;
};
