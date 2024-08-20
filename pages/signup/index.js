import Signup from "@/components/Account/signup";
import Head from "next/head";

export default function SignupPage() {
  return (
    <div>
      <Head>
        <title>Signup - eBookHeaven</title>
        <meta
          name="description"
          content="Create your account on eBookHeaven."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Signup />
    </div>
  );
}
