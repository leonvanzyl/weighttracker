import "@/styles/globals.css";

import Layout from "@/components/Layout";

// Stores
import AuthContextProvider from "@/lib/stores/auth-context";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
