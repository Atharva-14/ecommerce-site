import axios from "axios";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setToken(JSON.stringify(sessionStorage.getItem("token")));
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
        sessionStorage.setItem("token", JSON.stringify(token));
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
        axios.defaults.headers.common["Authorization"] = `Bearer${token}`;

        sessionStorage.setItem("user", JSON.stringify(user));
      }

      return { success, message };
    } catch (error) {
      console.log("Frontend: ", error.message);
    }
  };

  const logoutUser = () => {
    sessionStorage?.removeItem("user");
    sessionStorage?.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, logInUser, signupUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
