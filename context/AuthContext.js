import axios from "axios";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userInfo = sessionStorage.getItem("user") || null;
    const authToken = sessionStorage.getItem("authToken") || {};

    console.log("herer============== asdasd");

    let u = null;
    if (userInfo) {
      u = JSON.parse(userInfo);
    }

    setUser(u);
    setToken(authToken ? JSON.stringify(authToken) : null);
  }, []);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const logInUser = async ({ email, password }) => {
    try {
      const {
        data: { success, user, token },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        email,
        password,
      });

      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("authToken", JSON.stringify(token));
      }

      return { success, user };
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const signupUser = async ({ firstName, lastName, email, password }) => {
    try {
      const {
        data: { success, user, token, message },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (success) {
        setUser(user);
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("authToken", JSON.stringify(token));
      }

      return { success, message };
    } catch (error) {
      console.log("Frontend: ", error.message);
    }
  };

  const addAddress = async ({
    userId,
    country,
    fullName,
    phone,
    email,
    line1,
    line2,
    pincode,
    city,
    state,
    type,
  }) => {
    try {
      const {
        data: { success, user, message },
      } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/address`,
        {
          country,
          fullName,
          phone,
          email,
          line1,
          line2,
          pincode,
          city,
          state,
          type,
        }
      );

      if (success) {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      return { success, message };
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutUser = () => {
    console.log("logout called");
    sessionStorage?.removeItem("user");
    sessionStorage?.removeItem("authToken");
    setUser();
    setToken();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, logInUser, signupUser, logoutUser, addAddress }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
