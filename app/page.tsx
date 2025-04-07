import { ShotForm } from "@/components/shot-form";
import { RecentShots } from "@/components/recent-shots";
import { ThemeToggler } from "@/components/theme-toggler";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-600 via-green-900 to-green-700 dark:bg-gray-950">
      <main className="flex-1 container px-4 py-6 md:py-10 mx-auto">
        <div className="grid gap-6 max-w-md mx-auto">
          <ShotForm />
          <RecentShots />
        </div>
      </main>
      <ThemeToggler />
    </div>
  );
}
