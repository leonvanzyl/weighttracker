import { createContext, useState, useEffect } from "react";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const authContext = createContext({
  user: null,
  userData: null,
  loading: true,
  signout: async () => {},
  addWeight: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, userLoading, userError] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handler Functions
  const handleSignout = async () => {
    try {
      await auth.signOut();
      setUserData(null);
    } catch (error) {
      throw error;
    }
  };

  // Handler functions
  const addWeightHandler = async (userData, newWeight) => {
    try {
      const userRef = doc(db, "users", user.uid);

      // First check if an entry for this date exists
      const existingWeight = userData.weights.find((w) => {
        console.log(
          w.date.toISOString().substring(0, 10),
          "vs",
          newWeight.date.toISOString().substring(0, 10)
        );

        return (
          w.date.toISOString().substring(0, 10) ===
          newWeight.date.toISOString().substring(0, 10)
        );
      });

      console.log(existingWeight);

      // Update Firestore
      if (existingWeight) {
        // Delete existing record for the date
        await updateDoc(userRef, { weights: arrayRemove(existingWeight) });
      }

      // Add new record
      await updateDoc(userRef, {
        weights: arrayUnion(newWeight),
      });

      // Update Stats
      setUserData((prevState) => {
        let weights = [...prevState.weights];
        if (existingWeight) {
          weights = weights.filter(
            (w) =>
              w.date.toISOString().substring(0, 10) !==
              existingWeight.date.toISOString().substring(0, 10)
          );

          console.log("Filtered weights", weights);
        }

        return {
          ...prevState,
          weights: [...weights, newWeight],
        };
      });
    } catch (error) {
      throw error;
    }
  };

  // Effects
  useEffect(() => {
    if (!user) return;
    if (userLoading) return;

    const getUserData = async () => {
      setLoading(true);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        setUserData({
          ...userDocSnap.data(),
          weights: userDocSnap.data().weights.map((weight) => {
            return {
              weight: weight.weight,
              date: new Date(weight.date.toMillis()),
            };
          }),
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [user, userLoading]);

  const context = {
    user,
    userData,
    loading,
    signout: handleSignout,
    addWeight: addWeightHandler,
  };
  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
}
