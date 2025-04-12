"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteShot } from "@/app/actions/shots";
import { CLUB_VALUE_MAP } from "@/lib/constants";

interface Shot {
  id: string;
  club: string;
  created_at: string;
  distance: number;
  power: number;
}

interface AllShotsClientProps {
  initialShots: Shot[];
}

export default function AllShotsClient({ initialShots }: AllShotsClientProps) {
  const router = useRouter();
  const [selectedClub, setSelectedClub] = useState("");
  const [shots, setShots] = useState<Shot[]>(initialShots);

  // Debug logging
  useEffect(() => {
    console.log("Selected club:", selectedClub);
    console.log(
      "Filtered shots:",
      shots.filter((shot) => shot.club === selectedClub)
    );
  }, [selectedClub, shots]);

  const handleDelete = async (shotId: string) => {
    await deleteShot(shotId);
    setShots(shots.filter((shot) => shot.id !== shotId));
    router.refresh();
  };

  const filteredShots = selectedClub
    ? shots.filter((shot) => {
        console.log("Shot club:", shot.club, "Selected club:", selectedClub);
        return shot.club === selectedClub;
      })
    : shots;

  return (
    <div>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedClub}
        onChange={(e) => {
          console.log("Selected value:", e.target.value);
          setSelectedClub(e.target.value);
        }}
      >
        <option value="">All Clubs</option>
        {Object.values(CLUB_VALUE_MAP).map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>
      <div className="space-y-4">
        {filteredShots.length > 0 ? (
          filteredShots.map((shot) => (
            <div key={shot.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{shot.club}</h3>
                <p className="text-sm text-muted-foreground">{new Date(shot.created_at).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{shot.distance} m</p>
                <p className="text-sm text-muted-foreground">{shot.power}% power</p>
                <button onClick={() => handleDelete(shot.id)} className="text-red-500 hover:underline">
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            {selectedClub ? `No shots recorded for ${selectedClub}` : "No shots recorded"}
          </p>
        )}
      </div>
    </div>
  );
}
