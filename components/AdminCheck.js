import React, { useEffect, useContext } from "react";

import { useRouter } from "next/router";

// Stores
import { authContext } from "@/lib/stores/auth-context";

// Components
import Spinner from "@/components/UI/Spinner";

function AdminCheck({ children }) {
  const router = useRouter();
  const { user, loading } = useContext(authContext);

  useEffect(() => {
    if (loading) return;
    if (!router.isReady) return;

    if (!user) {
      router.push("/");
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="container-inner">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminCheck;
