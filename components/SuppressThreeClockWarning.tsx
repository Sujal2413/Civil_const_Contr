"use client";

import { useEffect } from "react";

/**
 * Suppresses the "THREE.Clock: This module has been deprecated" console warning
 * that originates from @react-three/fiber internals (which still use THREE.Clock).
 * This is a cosmetic patch — R3F functions correctly despite the deprecation notice.
 * Remove this component once @react-three/fiber ships a version that uses THREE.Timer.
 */
export function SuppressThreeClockWarning() {
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("THREE.Clock") &&
        args[0].includes("deprecated")
      ) {
        return; // swallow this specific warning
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
