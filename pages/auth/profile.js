import React, { useRef, useContext } from "react";
import { useRouter } from "next/router";

// Stores
import { authContext } from "@/lib/stores/auth-context";

// Firebase
import { auth } from "@/lib/firebase";

// Toast
import { toast } from "react-toastify";

// Components
import AdminCheck from "@/components/AdminCheck";

function Profile() {
  const { user, signout } = useContext(authContext);
  const router = useRouter();

  const handleSignout = () => {
    signout();
    router.push("/");
  };

  return (
    <AdminCheck>
      <div className="section-container">
        <div className="flex items-center justify-between">
          <div>
            <small>Welcome</small>
            <h1>{user?.displayName}</h1>
          </div>
          <div>
            <button className="text-xs btn btn-danger" onClick={handleSignout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </AdminCheck>
  );
}

export default Profile;
