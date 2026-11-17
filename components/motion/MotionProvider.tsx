"use client";

import { MotionConfig } from "framer-motion";
import { createContext, type ReactNode, useContext, useEffect, useSyncExternalStore } from "react";

type PerformanceMode = "enhanced" | "lite";
const PerformanceModeContext = createContext<PerformanceMode>("enhanced");

export function usePerformanceMode() {
  return useContext(PerformanceModeContext);
}

function getPerformanceMode(): PerformanceMode {
  if (typeof window === "undefined") return "enhanced";

  type ConnectionInfo = {
    effectiveType?: string;
    saveData?: boolean;
  };

  type NavigatorWithHints = Navigator & {
    connection?: ConnectionInfo;
    deviceMemory?: number;
  };

  const navigatorWithHints = navigator as NavigatorWithHints;
  const connection = navigatorWithHints.connection;
  const slowConnection =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  const limitedDevice =
    (navigatorWithHints.deviceMemory ?? Number.POSITIVE_INFINITY) <= 4 ||
    navigator.hardwareConcurrency <= 4;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return slowConnection || limitedDevice || reducedMotion ? "lite" : "enhanced";
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const performanceMode = useSyncExternalStore<PerformanceMode>(
    () => () => {},
    getPerformanceMode,
    () => "enhanced",
  );

  useEffect(() => {
    document.documentElement.dataset.performance = performanceMode;
  }, [performanceMode]);

  return (
    <PerformanceModeContext.Provider value={performanceMode}>
      <MotionConfig reducedMotion={performanceMode === "lite" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceModeContext.Provider>
  );
}
