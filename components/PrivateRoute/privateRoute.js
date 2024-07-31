import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { user, token } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (!loading && router.isReady) {
        if (!user || !token) {
          router.push("/login");
        }
      }
    }, [user, token, router.isReady, loading]);

    if (loading || !router.isReady) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
