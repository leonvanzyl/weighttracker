import { useState, useEffect, useContext } from "react";

// Chart
import LineChart from "@/components/LineChart";

// Icons
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

// Context
import { authContext } from "@/lib/stores/auth-context";

// Firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Modals
import AddWeightModal from "@/components/modals/AddWeightModal";

export default function Home() {
  // States
  const { user, userData, loading } = useContext(authContext);
  const [showAddWeightModal, setShowAddWeightModal] = useState(false);

  const googleProvider = new GoogleAuthProvider(auth);

  const [chartData, setChartData] = useState(null);

  // Handler functions
  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const hideAddWeightModalHandler = () => {
    setShowAddWeightModal(false);
  };

  const showAddWeightModalHandler = () => {
    setShowAddWeightModal(true);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (!userData) return;

    userData.weights.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }

      return 1;
    });

    setChartData({
      labels: userData.weights.map((d) =>
        d.date.toISOString().substring(0, 10)
      ),
      datasets: [
        {
          label: "Weight",
          data: userData.weights.map((d) => d.weight),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgb(255, 99, 132)",
          color: "#666",
        },
      ],
    });
  }, [user, userData, loading]);

  return (
    <>
      <AddWeightModal
        show={showAddWeightModal}
        onClose={hideAddWeightModalHandler}
      />
      {!user && !userData && (
        <section className="section-container">
          <h1 className="text-center uppercase md:text-left">
            Sign in with one of our providers
          </h1>
          <div className="pt-6">
            <button
              className="flex self-start gap-2 p-4 font-medium text-white align-middle bg-gray-700 rounded-lg"
              onClick={googleLoginHandler}
            >
              <FcGoogle className="text-2xl" />
              Google
            </button>
          </div>
        </section>
      )}

      {user && userData && (
        <>
          <section className="section-container">
            <button
              className="flex items-center justify-between gap-1 text-xs btn btn-primary"
              onClick={showAddWeightModalHandler}
            >
              <HiOutlineDocumentAdd className="text-xl" /> Add Weight
            </button>
          </section>
          <section className="section-container">
            <h1>Weight Loss Progress</h1>
            {chartData && <LineChart chartData={chartData} />}
          </section>
        </>
      )}
    </>
  );
}
