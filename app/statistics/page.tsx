import { Statistics } from "@/components/statistics";
import { ThemeToggler } from "@/components/theme-toggler";
import { getClubStats, getTopConsistentClubs } from "../actions/shots";

interface StatisticsPageProps {
  searchParams: Promise<{ club?: string }>;
}

export const revalidate = 0; // Disable caching and revalidate on every request

export default async function StatisticsPage({ searchParams }: StatisticsPageProps) {
  const { club } = await searchParams;

  const [{ data: initialClubStats }, { data: initialConsistentClubs }] = await Promise.all([
    getClubStats(club || "Driver"),
    getTopConsistentClubs(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-600 via-green-900 to-green-700">
      <main className="flex-1 container px-4 py-6 md:py-10 mx-auto">
        <Statistics initialClubStats={initialClubStats} initialConsistentClubs={initialConsistentClubs} />
      </main>
      <ThemeToggler />
    </div>
  );
}
