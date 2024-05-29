import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const { logInUser } = useAuth();
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    setLoading(true);
    const { success } = await logInUser(formData);

    if (success) {
      setLoading(false);
      router.push("/cart");
    } else {
      console.log("Error Occured");
    }
  };

  const loginAsGuest = async (e) => {
    e.preventDefault();
    const formData = {
      email: "johnsnow@dev.com",
      password: "Password@123",
    };
    setLoading(true);
    const { success } = await logInUser(formData);
    
    if (success) {
      setLoading(false);
      router.push("/cart");
    } else {
      console.log("Error Occured");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to eBookHaven
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="johndoe@email.com"
            type="email"
            ref={emailInput}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            ref={passwordInput}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full mb-4 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full  text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="button"
          onClick={loginAsGuest}
        >
          Login as Guest &rarr;
          <BottomGradient />
        </button>
      </form>

      {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

      <span>
        <Label>
          New to eBookHaven.{" "}
          <Link href="/signup" className=" text-blue-600">
            Create an account
          </Link>
        </Label>
      </span>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
