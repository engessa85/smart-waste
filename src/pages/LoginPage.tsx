

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/fireBaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  

  const login = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/map");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
              <span className="text-blue-600 text-sm font-medium tracking-wider uppercase">Smart Waste</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-200">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your smart waste system</p>
          </div>

          {!user ? (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); login(); }}>
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Additional Links */}
              <div className="flex items-center justify-center text-sm gap-2">
                <div>Don't have account </div>
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 transition-colors duration-200 cursor-pointer hover:scale-105"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">Logged in as {user.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">Smart Waste Management System</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
