import Link from "next/link";
import React, { useContext } from "react";

// Icons
import { GiWeightScale } from "react-icons/gi";

// Stores
import { authContext } from "@/lib/stores/auth-context";

function Nav() {
  const { user, loading } = useContext(authContext);

  return (
    <header className="bg-gray-200 shadow-md">
      <div className="nav-container">
        <div className="flex flex-col items-center justify-between gap-2 text-gray-800 sm:flex-row">
          <div className="text-lg font-semibold uppercase">
            <Link href="/" className="flex items-center">
              <GiWeightScale className="text-2xl" />
              <span className="font-extrabold rounded-md">WeightLoss</span>
              <span className="font-thin">Tracker</span>
            </Link>
          </div>
          <nav>
            <ul className="flex items-center justify-center gap-4 text-sm">
              {!loading && user && (
                <>
                  <li>
                    <Link href="/auth/profile">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                          src={user.photoURL}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
