import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Overview from './pages/Overview';
import FunctionTesting from './pages/FunctionTesting';
import Monitoring from './pages/Monitoring';
import Logs from './pages/Logs';
import Alerts from './pages/Alerts';
import TestHistory from './pages/TestHistory';
import FunctionInfo from './pages/FunctionInfo';

export default function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="testing" element={<FunctionTesting />} />
            <Route path="metrics" element={<Monitoring />} />
            <Route path="logs" element={<Logs />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="history" element={<TestHistory />} />
            <Route path="info" element={<FunctionInfo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  );
}
