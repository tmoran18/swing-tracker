"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGolf } from "@/app/context/GolfContext";
import { createShot } from "@/app/actions/shots";
import { PowerSlider } from "@/components/power-slider";
import { toast } from "sonner";

const CLUB_OPTIONS = [
  "Driver",
  "3 Wood",
  "5 Wood",
  "4 Iron",
  "5 Iron",
  "6 Iron",
  "7 Iron",
  "8 Iron",
  "9 Iron",
  "PW",
  "SW",
  "Wedge",
];

export function ShotForm() {
  const [swingPower, setSwingPower] = useState(100);
  const { selectedClub, setSelectedClub } = useGolf();
  const distanceInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSaveShot() {
    const distance = distanceInputRef.current ? parseInt(distanceInputRef.current.value, 10) : 0;

    if (!distance) {
      toast.error("Please enter a valid distance");
      return;
    }

    setIsLoading(true);
    try {
      const shotData = {
        club: selectedClub,
        distance: distance,
        power: swingPower,
      };

      const { error } = await createShot(shotData);

      if (error) {
        throw new Error(error);
      }

      // Clear the input
      if (distanceInputRef.current) {
        distanceInputRef.current.value = "";
      }

      toast.success("Shot saved!");
    } catch (error) {
      console.error("Error saving shot:", error);
      toast.error("Failed to save shot");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="club-select" className="text-sm font-medium mb-2">
            Select Club
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CLUB_OPTIONS.map((club) => (
              <Button
                key={club}
                variant="outline"
                className="h-auto py-3 px-2 text-sm data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-800 data-[state=active]:border-green-600 dark:data-[state=active]:border-green-500 dark:data-[state=active]:text-green-100"
                data-state={club === selectedClub ? "active" : "inactive"}
                onClick={() => setSelectedClub(club)}
              >
                {club}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium mb-2">Distance (meters)</label>
          <input
            ref={distanceInputRef}
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter distance..."
          />
        </div>

        <PowerSlider value={swingPower} onChange={setSwingPower} />

        <Button
          className="w-full bg-green-600 hover:bg-green-700 dark:text-white"
          onClick={handleSaveShot}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Shot"}
        </Button>
      </CardContent>
    </Card>
  );
}
