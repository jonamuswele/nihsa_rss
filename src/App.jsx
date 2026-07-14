import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import WaterLevel from "./pages/WaterLevel";
import Boreholes from "./pages/Boreholes";
import Anomalies from "./pages/Anomalies";

// Initial mock data
import {
  INITIAL_STATIONS,
  INITIAL_BOREHOLES,
  INITIAL_ANOMALIES
} from "./data/mockData";

export default function App() {
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [boreholes, setBoreholes] = useState(INITIAL_BOREHOLES);
  const [anomalies, setAnomalies] = useState(INITIAL_ANOMALIES);

  // Drawer state management
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Auto-close detail drawer on routing page changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  // Helper to open details drawer for stations
  const handleSelectStation = (station) => {
    setSelectedItem({ ...station, type: "station" });
    setIsDrawerOpen(true);
  };

  // Helper to open details drawer for boreholes
  const handleSelectBorehole = (borehole) => {
    setSelectedItem({ ...borehole, type: "borehole" });
    setIsDrawerOpen(true);
  };

  // Handler to update name, coordinates, and thresholds of a specific station
  const handleUpdateStationDetails = (stationId, updatedFields) => {
    setStations((prevStations) =>
      prevStations.map((st) => {
        if (st.id === stationId) {
          const updatedStation = {
            ...st,
            ...updatedFields
          };

          // Re-evaluate safety status dynamically: Warning = Red, Anomaly = Yellow, Normal = Green
          const isWarning =
            updatedStation.currentLevel >= updatedStation.maxLevelThreshold ||
            updatedStation.currentDebit >= updatedStation.maxDebitThreshold;

          // Check if there's any active anomaly for this station
          const hasActiveAnomaly = anomalies.some(
            (a) => a.sourceId === stationId && a.status === "active"
          );

          if (isWarning) {
            updatedStation.status = "warning";
          } else if (hasActiveAnomaly) {
            updatedStation.status = "anomaly";
          } else {
            updatedStation.status = "normal";
          }

          // Sync the updated item inside the open drawer
          setSelectedItem({ ...updatedStation, type: "station" });
          return updatedStation;
        }
        return st;
      })
    );
  };

  // Handler to mark an active anomaly as resolved
  const handleResolveAnomaly = (anomalyId) => {
    setAnomalies((prevAnomalies) => {
      const updatedAnomalies = prevAnomalies.map((a) =>
        a.id === anomalyId ? { ...a, status: "resolved" } : a
      );

      // If resolved anomaly belongs to a station, check if we should clear its anomaly status
      const anomaly = prevAnomalies.find((a) => a.id === anomalyId);
      if (anomaly && anomaly.sourceType === "station") {
        const stationId = anomaly.sourceId;
        const stillHasActiveAnomalies = updatedAnomalies.some(
          (a) => a.sourceId === stationId && a.status === "active"
        );

        if (!stillHasActiveAnomalies) {
          setStations((prevStations) =>
            prevStations.map((st) => {
              if (st.id === stationId) {
                // Evaluate if it should be normal or warning based on thresholds
                const isWarning =
                  st.currentLevel >= st.maxLevelThreshold ||
                  st.currentDebit >= st.maxDebitThreshold;

                return {
                  ...st,
                  status: isWarning ? "warning" : "normal"
                };
              }
              return st;
            })
          );
        }
      }

      // Similarly for boreholes
      if (anomaly && anomaly.sourceType === "borehole") {
        const boreholeId = anomaly.sourceId;
        const stillHasActiveAnomalies = updatedAnomalies.some(
          (a) => a.sourceId === boreholeId && a.status === "active"
        );

        if (!stillHasActiveAnomalies) {
          setBoreholes((prevBoreholes) =>
            prevBoreholes.map((bh) => {
              if (bh.id === boreholeId) {
                return {
                  ...bh,
                  status: bh.contamination > 300 ? "contaminated" : bh.contamination > 150 ? "marginal" : "safe"
                };
              }
              return bh;
            })
          );
        }
      }

      return updatedAnomalies;
    });
  };

  // Count active warnings and anomalies for sidebar notification badges
  const warningCount = stations.filter(
    (st) =>
      st.currentLevel >= st.maxLevelThreshold ||
      st.currentDebit >= st.maxDebitThreshold
  ).length;

  const activeAnomalyCount = anomalies.filter((a) => a.status === "active").length;

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        warningCount={warningCount}
        anomalyCount={activeAnomalyCount}
        isMinimized={isSidebarMinimized}
        onToggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
      />

      {/* Main Panel */}
      <div className={`main-content ${isSidebarMinimized ? "ml-sidebar-min" : "ml-sidebar-full"}`}>
        {/* Top Header Strip */}
        <header className="top-bar">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Nigeria Hydrological Services Agency (NIHSA)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Telemetry Feed Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Pages */}
        <main className="page-content animate-fade-in">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  stations={stations}
                  boreholes={boreholes}
                  anomalies={anomalies}
                  onSelectStation={handleSelectStation}
                  onSelectBorehole={handleSelectBorehole}
                />
              }
            />
            <Route
              path="/water-levels"
              element={
                <WaterLevel
                  stations={stations}
                  anomalies={anomalies}
                  onSelectStation={handleSelectStation}
                />
              }
            />
            <Route
              path="/boreholes"
              element={
                <Boreholes
                  boreholes={boreholes}
                  onSelectBorehole={handleSelectBorehole}
                />
              }
            />
            <Route
              path="/anomalies"
              element={
                <Anomalies
                  anomalies={anomalies}
                  stations={stations}
                  boreholes={boreholes}
                  onResolveAnomaly={handleResolveAnomaly}
                />
              }
            />
          </Routes>
        </main>
      </div>

      {/* Side Slide-out Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
        onUpdateThresholds={handleUpdateStationDetails}
      />
    </div>
  );
}
