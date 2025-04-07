"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type GolfContextType = {
  selectedClub: string;
  setSelectedClub: (club: string) => void;
};

const GolfContext = createContext<GolfContextType | undefined>(undefined);

export function GolfProvider({ children }: { children: ReactNode }) {
  const [selectedClub, setSelectedClub] = useState("Driver");

  return <GolfContext.Provider value={{ selectedClub, setSelectedClub }}>{children}</GolfContext.Provider>;
}

export function useGolf() {
  const context = useContext(GolfContext);
  if (context === undefined) {
    throw new Error("useGolf must be used within a GolfProvider");
  }
  return context;
}
