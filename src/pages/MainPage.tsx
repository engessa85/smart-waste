

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

  return(
    <div className="min-h-screen bg-slate-50">
      {user ? (
        <div className="container mx-auto px-4 py-6">
          {/* Header with Logout Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Smart Home Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Logout
            </button>
          </div>

          {/* User Info */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <p className="text-slate-700">Welcome back, <span className="font-semibold text-slate-800">{user.email}</span></p>
          </div>

          {/* Devices Component */}
          <Devices />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  )
}

export default MainPage;
