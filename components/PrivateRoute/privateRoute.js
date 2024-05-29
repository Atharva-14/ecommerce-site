const { useAuth } = require("@/context/AuthContext");
const { useRouter } = require("next/router");
const { useEffect } = require("react");

const privateRoute = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!user) {
      return <div>Redirecting to Login Page...</div>;
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default privateRoute;
