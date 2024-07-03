import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

// const privateRoute = (WrappedComponent) => {
//   return (props) => {
//     const { user } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       if (!user) {
//         router.push("/login");
//       }
//     }, [user, router]);

//     if (!user) {
//       return <div>Redirecting to Login Page...</div>;
//     }

//     return user ? <WrappedComponent {...props} /> : null;
//   };
// };

const withAuth = (Component) => {
  const Auth = (props) => {
    const uAuth = useAuth();
    const router = useRouter();
console.log(uAuth,)
    // if (!uAuth?.user) {
    //   // router.push("/login");
    // }

    const redirect = () => {
      router.push("/login");
    }
    useEffect(() => {
      if(!uAuth?.user && router.isReady) {
        redirect()
      }
    },[uAuth, router.isReady])
    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
