import Login from "@/components/Account/login";
import Head from "next/head";

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Login - eBookHeaven</title>
        <meta
          name="description"
          content="Log in to your account on eBookHeaven."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Login />
    </div>
  );
}
