import React from "react";

export function LogoGretta({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" fill="currentColor">
      <text x="0" y="22" fontFamily="sans-serif" fontSize="22" fontWeight="400" letterSpacing="-0.5">Gretta</text>
    </svg>
  );
}

export function LogoEnergyMax({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 30" fill="currentColor">
      <rect x="0" y="8" width="14" height="3" />
      <rect x="0" y="15" width="14" height="3" />
      <text x="22" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="600" letterSpacing="-0.5">Energy Max</text>
    </svg>
  );
}

export function LogoCareer({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" fill="currentColor">
      <rect x="0" y="4" width="20" height="20" rx="4" fill="var(--ink)" />
      <text x="5" y="19" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="white">C</text>
      <text x="28" y="22" fontFamily="sans-serif" fontSize="20" fontWeight="600" letterSpacing="-0.5">Career</text>
    </svg>
  );
}

export function LogoAllReno({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 30" fill="currentColor">
      <path d="M10,2 L2,10 L2,24 M10,2 L18,10 L18,24" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="24" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.5">ALL RENO</text>
    </svg>
  );
}

export function LogoChema({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 30" fill="currentColor">
      <text x="0" y="22" fontFamily="sans-serif" fontSize="22" fontWeight="600" letterSpacing="-0.5">Chema</text>
      <text x="75" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="400" letterSpacing="0">Premium</text>
    </svg>
  );
}

export function LogoInsure({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 30" fill="currentColor">
      <path d="M10,4 L10,20 M2,12 L18,12 M4,6 L16,18 M4,18 L16,6" stroke="currentColor" strokeWidth="2.5" />
      <text x="26" y="22" fontFamily="sans-serif" fontSize="21" fontWeight="600" letterSpacing="-0.5">Insure</text>
    </svg>
  );
}
