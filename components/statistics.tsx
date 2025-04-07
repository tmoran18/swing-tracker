"use client";

import { useState } from "react";
import { useGolf } from "@/app/context/GolfContext";
import { ClubStats } from "./club-stats";
import { ClubConsistency } from "./club-consistency";
import type { ClubStats as ClubStatsType, ConsistentClub } from "@/app/actions/shots";
import { getClubStats, getTopConsistentClubs } from "@/app/actions/shots";

interface StatisticsProps {
  initialClubStats: ClubStatsType[] | null;
  initialConsistentClubs: ConsistentClub[];
}

export function Statistics({ initialClubStats, initialConsistentClubs }: StatisticsProps) {
  const { selectedClub, setSelectedClub } = useGolf();
  const [clubStats, setClubStats] = useState<ClubStatsType[] | null>(initialClubStats);
  const [consistentClubs, setConsistentClubs] = useState<ConsistentClub[]>(initialConsistentClubs);
  const [isLoading, setIsLoading] = useState(false);

  const handleClubChange = async (club: string) => {
    setSelectedClub(club);
    setIsLoading(true);
    try {
      const [clubStatsResult, consistentClubsResult] = await Promise.all([getClubStats(club), getTopConsistentClubs()]);
      setClubStats(clubStatsResult.data);
      setConsistentClubs(consistentClubsResult.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 max-w-md mx-auto">
      <ClubStats
        clubStats={clubStats}
        selectedClub={selectedClub}
        isLoading={isLoading}
        onClubChange={handleClubChange}
      />
      <ClubConsistency consistentClubs={consistentClubs} />
    </div>
  );
}
