"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { Shot } from "@/lib/supabase";

export type ClubStats = {
  power: number;
  averageDistance: number;
  shotCount: number;
  standardDeviation: number;
};

export type ConsistentClub = {
  name: string;
  power: number;
  standardDeviation: number;
  shotCount: number;
};

export async function createShot(shot: Omit<Shot, "id" | "created_at">) {
  try {
    const { data, error } = await supabase.from("shots").insert([shot]).select().single();

    if (error) throw error;

    // Revalidate the shots list page
    revalidatePath("/");
    return { data, error: null };
  } catch (error) {
    console.error("Error creating shot:", error);
    return { data: null, error: "Failed to save shot" };
  }
}

export async function getRecentShots() {
  try {
    const { data, error } = await supabase.from("shots").select("*").order("created_at", { ascending: false }).limit(5);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching shots:", error);
    return { data: null, error: "Failed to fetch shots" };
  }
}

export async function getClubStats(club: string): Promise<{ data: ClubStats[] | null; error: string | null }> {
  try {
    const { data: shots, error } = await supabase
      .from("shots")
      .select("*")
      .eq("club", club)
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!shots?.length) {
      return { data: null, error: null };
    }

    // Calculate stats for different power levels
    const powerLevels = [100, 75, 50, 25];
    const stats = powerLevels
      .map((power) => {
        const shotsAtPower = shots.filter((s) => {
          // Group shots within ±12.5% of the target power
          const powerRange = 12.5;
          return s.power >= power - powerRange && s.power <= power + powerRange;
        });

        if (!shotsAtPower.length) return null;

        // Calculate average distance
        const avgDistance = Math.round(
          shotsAtPower.reduce((sum, shot) => sum + shot.distance, 0) / shotsAtPower.length
        );

        // Calculate standard deviation
        const mean = avgDistance;
        const variance =
          shotsAtPower.reduce((sum, shot) => {
            return sum + Math.pow(shot.distance - mean, 2);
          }, 0) / shotsAtPower.length;
        const standardDeviation = Math.round(Math.sqrt(variance));

        return {
          power,
          averageDistance: avgDistance,
          shotCount: shotsAtPower.length,
          standardDeviation,
        };
      })
      .filter((stat): stat is ClubStats => stat !== null);

    return { data: stats, error: null };
  } catch (error) {
    console.error("Error fetching club stats:", error);
    return { data: null, error: "Failed to fetch club statistics" };
  }
}

export async function getTopConsistentClubs(): Promise<{ data: ConsistentClub[]; error: string | null }> {
  try {
    const { data: shots, error } = await supabase.from("shots").select("*").order("created_at", { ascending: false });

    if (error) throw error;

    if (!shots?.length) {
      return { data: [], error: null };
    }

    // Group shots by club
    const clubStats = (
      Object.entries(
        shots.reduce((acc, shot) => {
          if (!acc[shot.club]) {
            acc[shot.club] = [];
          }
          acc[shot.club].push(shot);
          return acc;
        }, {} as Record<string, Shot[]>)
      ) as [string, Shot[]][]
    )
      .map(([club, clubShots]) => {
        // Calculate standard deviation for 75% power shots (±12.5%)
        const shotsAt75 = clubShots.filter((s) => s.power >= 62.5 && s.power <= 87.5);

        if (shotsAt75.length < 3) return null;

        const avgDistance = shotsAt75.reduce((sum, shot) => sum + shot.distance, 0) / shotsAt75.length;
        const variance =
          shotsAt75.reduce((sum, shot) => {
            return sum + Math.pow(shot.distance - avgDistance, 2);
          }, 0) / shotsAt75.length;
        const standardDeviation = Math.round(Math.sqrt(variance));

        return {
          name: club,
          power: 75,
          standardDeviation,
          shotCount: shotsAt75.length,
        };
      })
      .filter((club): club is ConsistentClub => club !== null);

    // Sort by standard deviation (ascending) and take top 3
    return {
      data: clubStats.sort((a, b) => a.standardDeviation - b.standardDeviation).slice(0, 3),
      error: null,
    };
  } catch (error) {
    console.error("Error fetching consistent clubs:", error);
    return { data: [], error: "Failed to fetch club consistency data" };
  }
}
