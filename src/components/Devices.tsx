
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/fireBaseConfig";

function Devices() {
  const [binLevel, setBinLevel] = useState<number | null>(null);
  const [mass, setMass] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [gasEmissions, setGasEmissions] = useState<number | null>(null);

  const db = getDatabase(app);

  useEffect(() => {
    // 🔹 Listen for signals from sensors
    const signalsRef = ref(db, "signals");
    onValue(signalsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.binLevel === "number") setBinLevel(data.binLevel);
        if (typeof data.mass === "number") setMass(data.mass);
        if (typeof data.temp === "number") setTemp(data.temp);
        if (typeof data.humidity === "number") setHumidity(data.humidity);
        if (typeof data.gasEmissions === "number") setGasEmissions(data.gasEmissions);
      }
    });
  }, [db]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
              <span className="text-blue-600 text-sm font-medium tracking-wider uppercase">Live Monitoring</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Smart Waste System
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Real-time environmental monitoring for sustainable waste management
          </p>
        </div>

        {/* Sensor Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Bin Level Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                <span className="text-3xl">📏</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-800">Bin Level</h3>
                <p className="text-emerald-600 text-sm">Ultrasonic Sensor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {binLevel !== null ? `${binLevel}` : "—"}
              </div>
              <div className="text-emerald-600 text-lg">cm</div>
            </div>
            <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000"
                style={{ width: binLevel !== null ? `${Math.min((binLevel / 100) * 100, 100)}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Mass Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl">
                <span className="text-3xl">⚖️</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-800">Mass</h3>
                <p className="text-amber-600 text-sm">Weight Sensor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {mass !== null ? `${mass}` : "—"}
              </div>
              <div className="text-amber-600 text-lg">kg</div>
            </div>
            <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-1000"
                style={{ width: mass !== null ? `${Math.min((mass / 50) * 100, 100)}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl">
                <span className="text-3xl">🌡️</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-800">Temperature</h3>
                <p className="text-red-600 text-sm">Thermal Sensor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {temp !== null ? `${temp}` : "—"}
              </div>
              <div className="text-red-600 text-lg">°C</div>
            </div>
            <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full transition-all duration-1000"
                style={{ width: temp !== null ? `${Math.min((temp / 50) * 100, 100)}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Humidity Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
                <span className="text-3xl">💧</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-800">Humidity</h3>
                <p className="text-blue-600 text-sm">Moisture Sensor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {humidity !== null ? `${humidity}` : "—"}
              </div>
              <div className="text-blue-600 text-lg">%</div>
            </div>
            <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: humidity !== null ? `${humidity}%` : '0%' }}
              ></div>
            </div>
          </div>

          {/* Gas Emissions Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 w-80">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                <span className="text-3xl">☁️</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-800">Gas Emissions</h3>
                <p className="text-purple-600 text-sm">Air Quality Sensor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {gasEmissions !== null ? `${gasEmissions}` : "—"}
              </div>
              <div className="text-purple-600 text-lg">ppm</div>
            </div>
            <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-violet-400 rounded-full transition-all duration-1000"
                style={{ width: gasEmissions !== null ? `${Math.min((gasEmissions / 1000) * 100, 100)}%` : '0%' }}
              ></div>
            </div>
          </div>

          

          
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-sm">
            Smart Waste Management System • Real-time Environmental Monitoring
          </p>
        </div>
      </div>
    </div>
  );
}

export default Devices;
