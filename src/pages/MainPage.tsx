import Devices from "../components/Devices";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/fireBaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

function MainPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {user ? (
        <div className="container mx-auto px-4 py-6">
          {/* Header with Logout Button */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/logo.png" alt="Logo" className="h-10 md:h-12 mr-4" />
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                Smart Waste Dashboard
              </h1>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-slate-700 text-sm md:text-base">
                  Welcome back,{" "}
                  <span className="font-semibold text-slate-800">
                    {user.email}
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate("/map")}
                className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base"
              >
                Map
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Devices Component */}
          <Devices />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default MainPage;
