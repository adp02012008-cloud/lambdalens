import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TEST_HISTORY } from '../data/mockHistory';
import { ALARM_INFO } from '../data/mockConfig';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  // Demo Alarm State (Synchronized between Overview, Alerts, and Sidebar)
  const [alarmState, setAlarmState] = useState(() => {
    return localStorage.getItem('lambdawatch_alarm_state') || ALARM_INFO.initialState;
  });

  // Time Range ('1h', '3h', '24h', '7d')
  const [timeRange, setTimeRange] = useState('1h');

  // Test History stored in localStorage
  const [testHistory, setTestHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('lambdawatch_test_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage test history:', e);
    }
    return INITIAL_TEST_HISTORY;
  });

  // Refresh indicator & timestamp
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync alarm state to localStorage
  useEffect(() => {
    localStorage.setItem('lambdawatch_alarm_state', alarmState);
  }, [alarmState]);

  // Sync test history to localStorage
  useEffect(() => {
    localStorage.setItem('lambdawatch_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  const addTestExecution = (execution) => {
    setTestHistory(prev => [execution, ...prev]);
  };

  const clearTestHistory = () => {
    setTestHistory([]);
    localStorage.removeItem('lambdawatch_test_history');
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshTime(new Date());
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <DashboardContext.Provider
      value={{
        alarmState,
        setAlarmState,
        timeRange,
        setTimeRange,
        testHistory,
        addTestExecution,
        clearTestHistory,
        lastRefreshTime,
        isRefreshing,
        triggerRefresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
