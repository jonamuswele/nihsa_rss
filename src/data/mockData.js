// NIHSA Hydrological System Mock Data

// ── River Stations (Water Level & Debit) ──────────────────────────────────
// Locations roughly mapped to coordinates within Nigeria (scale: Lat 4 to 14, Lng 3 to 15)
export const INITIAL_STATIONS = [
  {
    id: "STN_01",
    name: "Lokoja Confluence",
    river: "Niger / Benue Confluence",
    location: "Kogi State",
    lat: 7.8004,
    lng: 6.7440,
    currentLevel: 8.92, // meters
    currentDebit: 3120, // m³/s
    maxLevelThreshold: 9.50,
    maxDebitThreshold: 3500,
    status: "warning", // Close to threshold
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((8.2 + Math.sin(i * 0.2) * 0.4 + (i * 0.03)).toFixed(2)),
        debit: parseFloat((2800 + Math.sin(i * 0.2) * 150 + (i * 12)).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_02",
    name: "Makurdi Station",
    river: "Benue River",
    location: "Benue State",
    lat: 7.7337,
    lng: 8.5214,
    currentLevel: 6.45,
    currentDebit: 1980,
    maxLevelThreshold: 8.00,
    maxDebitThreshold: 2800,
    status: "normal",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((6.6 - Math.sin(i * 0.15) * 0.2 + Math.random() * 0.05).toFixed(2)),
        debit: parseFloat((2020 - Math.sin(i * 0.15) * 80 + Math.random() * 20).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_03",
    name: "Jebba Gorge",
    river: "Niger River",
    location: "Kwara State",
    lat: 9.1364,
    lng: 4.8219,
    currentLevel: 4.12,
    currentDebit: 1150,
    maxLevelThreshold: 7.00,
    maxDebitThreshold: 2000,
    status: "anomaly", // Flagged anomaly: water went below a certain level
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      // Simulating a rapid drop in water level (anomaly)
      let level = 5.8;
      if (i > 12) level -= (i - 12) * 0.25; // Sudden drop below normal
      return {
        time,
        level: parseFloat(level.toFixed(2)),
        debit: parseFloat((level * 280 + Math.random() * 15).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_04",
    name: "Kainji Reservoir",
    river: "Niger River",
    location: "Niger State",
    lat: 9.8700,
    lng: 4.5683,
    currentLevel: 11.20,
    currentDebit: 4250,
    maxLevelThreshold: 11.00, // Exceeded
    maxDebitThreshold: 4000, // Exceeded
    status: "warning",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((10.5 + (i * 0.04) + Math.sin(i * 0.1) * 0.1).toFixed(2)),
        debit: parseFloat((3900 + (i * 20) + Math.sin(i * 0.1) * 50).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_05",
    name: "Baro Port",
    river: "Niger River",
    location: "Niger State",
    lat: 8.5833,
    lng: 6.4167,
    currentLevel: 5.18,
    currentDebit: 1320,
    maxLevelThreshold: 6.80,
    maxDebitThreshold: 1800,
    status: "normal",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((5.0 + Math.sin(i * 0.1) * 0.15 + Math.random() * 0.02).toFixed(2)),
        debit: parseFloat((1250 + Math.sin(i * 0.1) * 50 + Math.random() * 10).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_06",
    name: "Onitsha Bridge",
    river: "Niger River",
    location: "Anambra State",
    lat: 6.1424,
    lng: 6.7770,
    currentLevel: 9.82,
    currentDebit: 3890,
    maxLevelThreshold: 10.50,
    maxDebitThreshold: 4200,
    status: "normal",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((9.5 + Math.sin(i * 0.25) * 0.3).toFixed(2)),
        debit: parseFloat((3750 + Math.sin(i * 0.25) * 110).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_07",
    name: "Yola Basin",
    river: "Benue River",
    location: "Adamawa State",
    lat: 9.2035,
    lng: 12.4954,
    currentLevel: 5.34,
    currentDebit: 1240,
    maxLevelThreshold: 7.20,
    maxDebitThreshold: 2200,
    status: "normal",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((5.2 + Math.sin(i * 0.2) * 0.12).toFixed(2)),
        debit: parseFloat((1180 + Math.sin(i * 0.2) * 40).toFixed(0)),
      };
    }),
  },
  {
    id: "STN_08",
    name: "Shiroro Basin",
    river: "Kaduna River",
    location: "Niger State",
    lat: 9.9764,
    lng: 6.8331,
    currentLevel: 7.15,
    currentDebit: 1840,
    maxLevelThreshold: 8.50,
    maxDebitThreshold: 2500,
    status: "normal",
    history: Array.from({ length: 24 }, (_, i) => {
      const time = `${String((8 + i) % 24).padStart(2, "0")}:00`;
      return {
        time,
        level: parseFloat((7.0 + Math.cos(i * 0.15) * 0.2).toFixed(2)),
        debit: parseFloat((1780 + Math.cos(i * 0.15) * 70).toFixed(0)),
      };
    }),
  },
];

// ── Boreholes (Water Level & Contamination) ───────────────────────────────
// Monitoring depth to water table (meters) and Contamination Index in TDS (PPM)
// TDS reference: <150 Safe (Green), 150-300 Marginal (Yellow), >300 Contaminated (Red)
export const INITIAL_BOREHOLES = [
  {
    id: "BH_01",
    name: "Abuja Garki BH-01",
    state: "FCT",
    location: "Garki Area 11, Abuja",
    lat: 9.0272,
    lng: 7.4893,
    waterLevel: 14.8, // depth from surface in meters
    contamination: 85, // TDS PPM (Safe)
    status: "safe",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((15.2 - Math.sin(i * 0.4) * 0.3).toFixed(1)),
      contamination: 80 + Math.floor(Math.sin(i * 0.5) * 6),
    })),
  },
  {
    id: "BH_02",
    name: "Kano Central BH-02",
    state: "Kano",
    location: "Fagge, Kano City",
    lat: 12.0022,
    lng: 8.5920,
    waterLevel: 28.5,
    contamination: 240, // TDS PPM (Marginal)
    status: "marginal",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((28.1 + Math.sin(i * 0.3) * 0.2).toFixed(1)),
      contamination: 210 + (i * 3) + Math.floor(Math.random() * 10),
    })),
  },
  {
    id: "BH_03",
    name: "Lagos Mainland BH-03",
    state: "Lagos",
    location: "Yaba, Lagos",
    lat: 6.5244,
    lng: 3.3792,
    waterLevel: 6.2,
    contamination: 412, // TDS PPM (Contaminated - high salinity/runoff)
    status: "contaminated",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((5.8 + Math.cos(i * 0.4) * 0.4).toFixed(1)),
      contamination: 350 + (i * 6) + Math.floor(Math.random() * 15),
    })),
  },
  {
    id: "BH_04",
    name: "Port Harcourt BH-04",
    state: "Rivers",
    location: "Diobu, Port Harcourt",
    lat: 4.8156,
    lng: 7.0498,
    waterLevel: 8.4,
    contamination: 325, // TDS PPM (Contaminated - oil/industrial runoff)
    status: "contaminated",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((8.0 + Math.sin(i * 0.3) * 0.3).toFixed(1)),
      contamination: 290 + (i * 4) + Math.floor(Math.random() * 8),
    })),
  },
  {
    id: "BH_05",
    name: "Maiduguri Bypass BH-05",
    state: "Borno",
    location: "Bama Road, Maiduguri",
    lat: 11.8311,
    lng: 13.1510,
    waterLevel: 42.1,
    contamination: 110,
    status: "safe",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((41.5 + Math.sin(i * 0.2) * 0.4).toFixed(1)),
      contamination: 105 + Math.floor(Math.sin(i * 0.3) * 8),
    })),
  },
  {
    id: "BH_06",
    name: "Enugu Coal-Camp BH-06",
    state: "Enugu",
    location: "Coal Camp, Enugu",
    lat: 6.4281,
    lng: 7.5022,
    waterLevel: 19.3,
    contamination: 195, // TDS PPM (Marginal)
    status: "marginal",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((19.6 - Math.cos(i * 0.35) * 0.3).toFixed(1)),
      contamination: 180 + Math.floor(Math.sin(i * 0.4) * 15),
    })),
  },
  {
    id: "BH_07",
    name: "Sokoto Basin BH-07",
    state: "Sokoto",
    location: "Runjin Sambo, Sokoto",
    lat: 13.0627,
    lng: 5.2330,
    waterLevel: 34.6,
    contamination: 92,
    status: "safe",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((34.9 - Math.sin(i * 0.25) * 0.3).toFixed(1)),
      contamination: 85 + Math.floor(Math.random() * 10),
    })),
  },
  {
    id: "BH_08",
    name: "Ibadan Agodi BH-08",
    state: "Oyo",
    location: "Agodi Gate, Ibadan",
    lat: 7.3775,
    lng: 3.9470,
    waterLevel: 12.1,
    contamination: 130,
    status: "safe",
    history: Array.from({ length: 15 }, (_, i) => ({
      day: `Day ${i + 1}`,
      level: parseFloat((12.5 - Math.sin(i * 0.3) * 0.2).toFixed(1)),
      contamination: 120 + Math.floor(Math.sin(i * 0.25) * 10),
    })),
  },
];

// ── Anomaly Logs & History ────────────────────────────────────────────────
// Types: "Low Level" | "Rate of Change" | "Flatline" | "Contamination Spike"
export const INITIAL_ANOMALIES = [
  {
    id: "ANOM_01",
    type: "Rate of Change",
    sourceType: "station",
    sourceId: "STN_03",
    sourceName: "Jebba Gorge",
    description: "Water level dropped 1.68m within 2 hours, signaling rapid reservoir discharge or sensor failure.",
    detectedAt: "2026-07-09 11:00",
    status: "active",
  },
  {
    id: "ANOM_02",
    type: "Contamination Spike",
    sourceType: "borehole",
    sourceId: "BH_03",
    sourceName: "Lagos Mainland BH-03",
    description: "TDS salinity readings spiked from 280 PPM to 412 PPM after recent heavy coastal rainfall.",
    detectedAt: "2026-07-08 16:30",
    status: "active",
  },
  {
    id: "ANOM_03",
    type: "Flatline Detection",
    sourceType: "station",
    sourceId: "STN_07",
    sourceName: "Yola Basin",
    description: "Sensor reported exactly 5.34m for 36 consecutive hours. Suspected mechanical stuck-float error.",
    detectedAt: "2026-07-07 08:00",
    status: "resolved",
  },
  {
    id: "ANOM_04",
    type: "Low Level Alert",
    sourceType: "station",
    sourceId: "STN_03",
    sourceName: "Jebba Gorge",
    description: "Water level dropped below critical safety level (minimum limit: 4.50m, current: 4.12m).",
    detectedAt: "2026-07-09 13:00",
    status: "active",
  },
];

// Weather Forecast for Dashboard
export const WEATHER_FORECAST = [
  { day: "Lokoja", temp: 31, condition: "Thunderstorms", icon: "⛈️", rainProb: 85 },
  { day: "Abuja", temp: 29, condition: "Scattered Rain", icon: "🌦️", rainProb: 60 },
  { day: "Lagos", temp: 28, condition: "Heavy Showers", icon: "🌧️", rainProb: 90 },
  { day: "Kano", temp: 35, condition: "Sunny/Dusty", icon: "☀️", rainProb: 10 },
  { day: "Port Harcourt", temp: 27, condition: "Heavy Rain", icon: "🌧️", rainProb: 95 },
  { day: "Maiduguri", temp: 37, condition: "Hot & Dry", icon: "☀️", rainProb: 5 },
];
