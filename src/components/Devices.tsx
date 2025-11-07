import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../utils/fireBaseConfig";
import Map from "./Map";

function Devices() {
  const [binLevel_1, setBinLevel_1] = useState<number | null>(null);
  const [gasEmissions_1, setGasEmissions_1] = useState<number | null>(null);
  const [smoke_1, setSmoke_1] = useState<number | null>(null);
  const [binLevel_2, setBinLevel_2] = useState<number | null>(null);
  const [gasEmissions_2, setGasEmissions_2] = useState<number | null>(null);
  const [smoke_2, setSmoke_2] = useState<number | null>(null);

  const [binLevel_3, setBinLevel_3] = useState<number | null>(null);
  const [gasEmissions_3, setGasEmissions_3] = useState<number | null>(null);
  const [smoke_3, setSmoke_3] = useState<number | null>(null);

  const [selectedBin, setSelectedBin] = useState<number | null>(null);

  const binPositions = [
    { lat: 29.320483, lng: 48.044731 }, // Bin 1
    { lat: 29.321241, lng: 48.044704 }, // Bin 2
    { lat: 29.321653, lng: 48.044543 }, // Bin 3
  ];

  const db = getDatabase(app);

  useEffect(() => {
    // 🔹 Listen for signals from sensors
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

    const signalsRef3 = ref(db, "signals_bin3");
    onValue(signalsRef3, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (typeof data.binLevel === "number") setBinLevel_3(data.binLevel);
        if (typeof data.gasEmissions === "number")
          setGasEmissions_3(data.gasEmissions);
        if (typeof data.smoke === "number") setSmoke_3(data.smoke);
      }
    });
  }, [db]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
                <span className="text-blue-600 text-sm font-medium tracking-wider uppercase animate-pulse">
                  Live Monitoring
                </span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Smart Waste System
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real-time environmental monitoring for sustainable waste management
          </p>
        </div>

        {/* Sensor Grid */}
        <div className="space-y-12">
          {/* Bin 1 Container */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <img src="/logo.png" alt="Logo" className="h-10" />
                  <h2 className="text-3xl font-bold text-gray-800">
                    Bin ID: 1
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedBin(1)}
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                >
                  🗺️
                </button>
              </div>
              <p className="text-gray-600">Primary waste bin monitoring</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Bin Level Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Bin Level
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ultrasonic Sensor
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <span className="text-3xl">📏</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const percentage = binLevel_1 !== null ? Math.round(((100 - binLevel_1) / 100) * 100) : 0;
                    if (percentage < 33) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (percentage < 66) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {binLevel_1 !== null
                      ? `${Math.round(((100 - binLevel_1) / 100) * 100)}`
                      : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">%</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const percentage = binLevel_1 !== null ? Math.round(((100 - binLevel_1) / 100) * 100) : 0;
                        if (percentage < 33) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (percentage < 66) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        binLevel_1 !== null
                          ? `${Math.min(
                              ((100 - binLevel_1) / 100) * 100,
                              100
                            )}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Gas Emissions Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Gas Emissions
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Air Quality Sensor
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                    <span className="text-3xl">☁️</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const emissions = gasEmissions_1;
                    if (emissions !== null && emissions < 200) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (emissions !== null && emissions < 600) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {gasEmissions_1 !== null ? `${gasEmissions_1}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const emissions = gasEmissions_1;
                        if (emissions !== null && emissions < 200) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (emissions !== null && emissions < 600) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        gasEmissions_1 !== null
                          ? `${Math.min((gasEmissions_1 / 1000) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Smoke Detector Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Fire Detector
                    </h3>
                    <p className="text-gray-600 text-sm">Smoke Sensor</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl">
                    <span className="text-3xl">🔥</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const smoke = smoke_1;
                    if (smoke !== null && smoke < 1000) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (smoke !== null && smoke < 3000) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {smoke_1 !== null ? `${smoke_1}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const smoke = smoke_1;
                        if (smoke !== null && smoke < 1000) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (smoke !== null && smoke < 3000) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        smoke_1 !== null
                          ? `${Math.min((smoke_1 / 4095) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bin 2 Container */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <img src="/logo.png" alt="Logo" className="h-10" />
                  <h2 className="text-3xl font-bold text-gray-800">
                    Bin ID: 2
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedBin(2)}
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                >
                  🗺️
                </button>
              </div>
              <p className="text-gray-600">Secondary waste bin monitoring</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Bin Level Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Bin Level
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ultrasonic Sensor
                    </p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <span className="text-3xl">📏</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const percentage = binLevel_2 !== null ? Math.round(((100 - binLevel_2) / 100) * 100) : 0;
                    if (percentage < 33) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (percentage < 66) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {binLevel_2 !== null
                      ? `${Math.round(((100 - binLevel_2) / 100) * 100)}`
                      : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">%</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const percentage = binLevel_2 !== null ? Math.round(((100 - binLevel_2) / 100) * 100) : 0;
                        if (percentage < 33) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (percentage < 66) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        binLevel_2 !== null
                          ? `${Math.min(
                              ((100 - binLevel_2) / 100) * 100,
                              100
                            )}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Gas Emissions Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Gas Emissions
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Air Quality Sensor
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                    <span className="text-3xl">☁️</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const emissions = gasEmissions_2;
                    if (emissions !== null && emissions < 200) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (emissions !== null && emissions < 600) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {gasEmissions_2 !== null ? `${gasEmissions_2}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const emissions = gasEmissions_2;
                        if (emissions !== null && emissions < 200) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (emissions !== null && emissions < 600) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        gasEmissions_2 !== null
                          ? `${Math.min((gasEmissions_2 / 1000) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Smoke Detector Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Fire Detector
                    </h3>
                    <p className="text-gray-600 text-sm">Smoke Sensor</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl">
                    <span className="text-3xl">🔥</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const smoke = smoke_2;
                    if (smoke !== null && smoke < 1000) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (smoke !== null && smoke < 3000) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {smoke_2 !== null ? `${smoke_2}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const smoke = smoke_2;
                        if (smoke !== null && smoke < 1000) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (smoke !== null && smoke < 3000) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        smoke_2 !== null
                          ? `${Math.min((smoke_2 / 4095) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bin 3 Container */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <img src="/logo.png" alt="Logo" className="h-10" />
                  <h2 className="text-3xl font-bold text-gray-800">
                    Bin ID: 3
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedBin(3)}
                  className="text-3xl hover:scale-110 transition-transform cursor-pointer"
                >
                  🗺️
                </button>
              </div>
              <p className="text-gray-600">Secondary waste bin monitoring</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Bin Level Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Bin Level
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ultrasonic Sensor
                    </p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <span className="text-3xl">📏</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const percentage = binLevel_3 !== null ? Math.round(((100 - binLevel_3) / 100) * 100) : 0;
                    if (percentage < 33) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (percentage < 66) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {binLevel_3 !== null
                      ? `${Math.round(((100 - binLevel_3) / 100) * 100)}`
                      : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">%</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const percentage = binLevel_3 !== null ? Math.round(((100 - binLevel_3) / 100) * 100) : 0;
                        if (percentage < 33) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (percentage < 66) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        binLevel_3 !== null
                          ? `${Math.min(
                              ((100 - binLevel_3) / 100) * 100,
                              100
                            )}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Gas Emissions Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Gas Emissions
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Air Quality Sensor
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl">
                    <span className="text-3xl">☁️</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const emissions = gasEmissions_3;
                    if (emissions !== null && emissions < 200) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (emissions !== null && emissions < 600) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {gasEmissions_3 !== null ? `${gasEmissions_3}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const emissions = gasEmissions_3;
                        if (emissions !== null && emissions < 200) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (emissions !== null && emissions < 600) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        gasEmissions_3 !== null
                          ? `${Math.min((gasEmissions_3 / 1000) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Smoke Detector Card */}
              <div className="bg-gray-50 rounded-3xl shadow-lg p-8 w-80 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Fire Detector
                    </h3>
                    <p className="text-gray-600 text-sm">Smoke Sensor</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl">
                    <span className="text-3xl">🔥</span>
                  </div>
                </div>
                <div className="text-center">
                  {(() => {
                    const smoke = smoke_3;
                    if (smoke !== null && smoke < 1000) {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-green-500 inline-block px-8 py-1 rounded-full">
                          Low
                        </div>
                      );
                    } else if (smoke !== null && smoke < 3000) {
                      return (
                        <div className="text-black text-sm font-bold mb-1 bg-yellow-400 inline-block px-8 py-1 rounded-full">
                          Average
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-white text-sm font-bold mb-1 bg-red-500 inline-block px-8 py-1 rounded-full animate-pulse">
                          High
                        </div>
                      );
                    }
                  })()}
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {smoke_3 !== null ? `${smoke_3}` : "—"}
                  </div>
                  <div className="text-gray-600 text-lg">ppm</div>
                </div>
                <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: (() => {
                        const smoke = smoke_3;
                        if (smoke !== null && smoke < 1000) {
                          return 'linear-gradient(to right, #10b981, #14b8a6)'; // green to teal
                        } else if (smoke !== null && smoke < 3000) {
                          return 'linear-gradient(to right, #fbbf24, #f59e0b)'; // yellow to amber
                        } else {
                          return 'linear-gradient(to right, #ef4444, #dc2626)'; // red to red-600
                        }
                      })(),
                      width:
                        smoke_3 !== null
                          ? `${Math.min((smoke_3 / 4095) * 100, 100)}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
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

      {/* Modal */}
      {selectedBin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Bin {selectedBin} Location</h2>
              <button
                onClick={() => setSelectedBin(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <Map
              id={selectedBin}
              name={`Recycling Bin #${selectedBin}`}
              description=""
              position={binPositions[selectedBin - 1]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Devices;
