


import  { useState, useEffect } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, app } from "../utils/fireBaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import LoginPage from "./LoginPage";


const API_KEY = "AIzaSyBoryl8NBe9Sr3OQVfeiyclmT4LNDiUzWU";

type Location = {
  id: number;
  name: string;
  description: string;
  position: { lat: number; lng: number };
};

function MapPage() {
  const locations: Location[] = [
    {
      id: 1,
      name: "Recycling bin #1",
      description: "Montior the status of bin #1",
      position: { lat: 29.3389, lng: 48.0273 },
    },
    {
      id: 2,
      name: "Recycling bin #2",
      description: "Montior the status of bin #2",
      position: { lat: 29.3342, lng: 48.0289 },
    }
  ];

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

  const [selected, setSelected] = useState<Location | null>(null);

  const [binLevel_1, setBinLevel_1] = useState<number | null>(null);
  const [gasEmissions_1, setGasEmissions_1] = useState<number | null>(null);
  const [smoke_1, setSmoke_1] = useState<number | null>(null);
  const [binLevel_2, setBinLevel_2] = useState<number | null>(null);
  const [gasEmissions_2, setGasEmissions_2] = useState<number | null>(null);
  const [smoke_2, setSmoke_2] = useState<number | null>(null);

  const db = getDatabase(app);

  useEffect(() => {
    // Listen for signals from sensors
    const signalsRef1 = ref(db, "signals_bin1");
    onValue(signalsRef1, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.binLevel === "number") setBinLevel_1(data.binLevel);
        if (typeof data.gasEmissions === "number")
          setGasEmissions_1(data.gasEmissions);
        if (typeof data.smoke === "number") setSmoke_1(data.smoke);
      }
    });

    const signalsRef2 = ref(db, "signals_bin2");
    onValue(signalsRef2, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.binLevel === "number") setBinLevel_2(data.binLevel);
        if (typeof data.gasEmissions === "number")
          setGasEmissions_2(data.gasEmissions);
        if (typeof data.smoke === "number") setSmoke_2(data.smoke);
      }
    });
  }, [db]);

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
                onClick={() => navigate("/main")}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Map Component */}
          <APIProvider apiKey={API_KEY}>
            <Map
              style={{ width: "100%", height: "83vh" }}
              defaultCenter={{ lat: 29.336, lng: 48.025 }}
              defaultZoom={14}
              gestureHandling="greedy"
              disableDefaultUI={false}
              zoom = {15}
            >
              {locations.map((loc) => (
                <Marker
                  key={loc.id}
                  position={loc.position}
                  icon={{
                    url: "/logo.png",
                    scaledSize: { width: 30, height: 30 },
                    anchor: { x: 25, y: 25 }
                  }}
                  onClick={() => setSelected(loc)}
                />
              ))}

              {selected && (
                <InfoWindow
                  position={selected.position}
                  onCloseClick={() => setSelected(null)}
                >
                  <div className="p-4 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 w-[500px]">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{selected.name}</h3>
                      <p className="text-sm text-gray-600">{selected.description}</p>
                    </div>
                    {(selected.id === 1 || selected.id === 2) && (() => {
                      const binLevel = selected.id === 1 ? binLevel_1 : binLevel_2;
                      const gasEmissions = selected.id === 1 ? gasEmissions_1 : gasEmissions_2;
                      const smoke = selected.id === 1 ? smoke_1 : smoke_2;

                      return (
                        <div className="space-y-3">
                          {/* Bin Level */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📏</span>
                                <span className="text-sm font-medium text-gray-700">Bin Level</span>
                              </div>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                binLevel !== null && binLevel < 10
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {binLevel !== null && binLevel < 10 ? 'High' : 'Normal'}
                              </span>
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-1">
                              {binLevel !== null ? `${Math.round(((100 - binLevel) / 100) * 100)}` : "—"}
                              <span className="text-sm font-normal text-gray-500 ml-1">%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: binLevel !== null ? `${Math.min(((100 - binLevel) / 100) * 100, 100)}%` : "0%"
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Gas Emissions */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">☁️</span>
                                <span className="text-sm font-medium text-gray-700">Gas Emissions</span>
                              </div>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                gasEmissions !== null && gasEmissions > 600
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {gasEmissions !== null && gasEmissions > 600 ? 'High' : 'Normal'}
                              </span>
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-1">
                              {gasEmissions !== null ? `${gasEmissions}` : "—"}
                              <span className="text-sm font-normal text-gray-500 ml-1">ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-400 to-violet-400 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: gasEmissions !== null ? `${Math.min((gasEmissions / 1000) * 100, 100)}%` : "0%"
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Smoke */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🔥</span>
                                <span className="text-sm font-medium text-gray-700">Smoke Detector</span>
                              </div>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                smoke !== null && smoke > 3000
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {smoke !== null && smoke > 3000 ? 'High' : 'Normal'}
                              </span>
                            </div>
                            <div className="text-xl font-bold text-gray-800 mb-1">
                              {smoke !== null ? `${smoke}` : "—"}
                              <span className="text-sm font-normal text-gray-500 ml-1">ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: smoke !== null ? `${Math.min((smoke / 4095) * 100, 100)}%` : "0%"
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default MapPage;
