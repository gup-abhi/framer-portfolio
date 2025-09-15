import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnalyticsDebugger = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [performance, setPerformance] = useState({});

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    // Listen for custom GA events
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (args[0] === "GA Event:") {
        setEvents(prev => [...prev.slice(-9), {
          timestamp: new Date().toLocaleTimeString(),
          event: args[1]
        }]);
      }
      originalConsoleLog(...args);
    };

    // Track performance metrics
    const updatePerformance = () => {
      if (window.performance && window.performance.memory) {
        setPerformance({
          memory: {
            used: Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(window.performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024)
          },
          connection: navigator.connection ? {
            type: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
          } : null
        });
      }
    };

    updatePerformance();
    const interval = setInterval(updatePerformance, 5000);

    return () => {
      console.log = originalConsoleLog;
      clearInterval(interval);
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-purple text-white p-3 rounded-full shadow-lg hover:bg-pink transition-colors"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Analytics Debugger"
      >
        📊
      </motion.button>

      {/* Debug Panel */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 z-50 bg-black/90 backdrop-blur-md text-white p-4 rounded-lg shadow-2xl max-w-sm w-full max-h-96 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-purple">Analytics Debug</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm">
            {/* Recent Events */}
            <div>
              <h4 className="font-semibold text-pink mb-2">Recent Events</h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {events.length === 0 ? (
                  <p className="text-gray-400">No events yet</p>
                ) : (
                  events.map((event, index) => (
                    <div key={index} className="bg-white/10 p-2 rounded text-xs">
                      <div className="text-purple">{event.timestamp}</div>
                      <div className="text-gray-300">
                        {event.event.category} - {event.event.action}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            {performance.memory && (
              <div>
                <h4 className="font-semibold text-pink mb-2">Performance</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Memory Used:</span>
                    <span className="text-purple">{performance.memory.used}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Total:</span>
                    <span className="text-purple">{performance.memory.total}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Limit:</span>
                    <span className="text-purple">{performance.memory.limit}MB</span>
                  </div>
                </div>
              </div>
            )}

            {/* Network Info */}
            {performance.connection && (
              <div>
                <h4 className="font-semibold text-pink mb-2">Network</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Connection:</span>
                    <span className="text-purple">{performance.connection.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-purple">{performance.connection.downlink}Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RTT:</span>
                    <span className="text-purple">{performance.connection.rtt}ms</span>
                  </div>
                </div>
              </div>
            )}

            {/* Clear Events Button */}
            <button
              onClick={() => setEvents([])}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-xs transition-colors"
            >
              Clear Events
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AnalyticsDebugger;
