
import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../utils/fireBaseConfig";

function Devices() {
  const [fan, setFan] = useState(false);
  const [motor, setMotor] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);

  const db = getDatabase(app);

  useEffect(() => {
    // 🔹 Listen for devices state
    const devicesRef = ref(db, "devices");
    onValue(devicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.fan === "boolean") setFan(data.fan);
        if (typeof data.motor === "boolean") setMotor(data.motor);
      }
    });

    // 🔹 Listen for signals (temp & humidity)
    const signalsRef = ref(db, "signals");
    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.temp === "number") setTemp(data.temp);
        if (typeof data.humidity === "number") setHumidity(data.humidity);
      }
    });
  }, [db]);

  const toggleFan = () => {
    set(ref(db, "devices/fan"), !fan);
  };

  const toggleMotor = () => {
    set(ref(db, "devices/motor"), !motor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            Smart Home Dashboard
          </h1>
          <p className="text-slate-600 text-lg">Control your devices and monitor your environment</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Devices Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Devices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className={`group relative overflow-hidden bg-gradient-to-r ${
                  fan
                    ? "from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
                } text-white font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
                onClick={toggleFan}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">💨</span>
                  <span>Fan {fan ? "ON" : "OFF"}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              <button
                className={`group relative overflow-hidden bg-gradient-to-r ${
                  motor
                    ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600"
                } text-white font-medium py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95`}
                onClick={toggleMotor}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">⚙️</span>
                  <span>Motor {motor ? "ON" : "OFF"}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Signals Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Environment</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <p className="text-sm text-slate-600">Temperature</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {temp !== null ? `${temp} °C` : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <p className="text-sm text-slate-600">Humidity</p>
                    <p className="text-xl font-semibold text-slate-800">
                      {humidity !== null ? `${humidity} %` : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;
