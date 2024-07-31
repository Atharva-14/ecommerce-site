import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import store from "@/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/UI/toaster";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </Provider>
    </AuthProvider>
  );
}
