"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGolf } from "@/app/context/GolfContext";
export const Nav = () => {
  const pathname = usePathname();
  const isStatisticsPage = pathname === "/statistics";
  const { selectedClub } = useGolf();

  return (
    <header className="sticky top-0 z-10 bg-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg
            stroke="currentColor"
            fill="#16a34a"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 25C163.7 25 89 99.66 89 192c0 92.3 74.7 167 167 167s167-74.7 167-167c0-92.34-74.7-167-167-167zm129.8 111.3a15.37 27.75 2.13 0 1 14.3 28.3 15.37 27.75 2.13 0 1-16.4 27.1 15.37 27.75 2.13 0 1-14.3-28.3 15.37 27.75 2.13 0 1 16.4-27.1zm-49.4 25.8a19.12 35.25 24.94 0 1 5.1 1.3 19.12 35.25 24.94 0 1 1.4 40.8 19.12 35.25 24.94 0 1-32.2 22.6 19.12 35.25 24.94 0 1-1.5-40.8 19.12 35.25 24.94 0 1 27.2-23.9zm38.9 55.1a15.37 27.75 22.37 0 1 1.2 0 15.37 27.75 22.37 0 1 3 .6 15.37 27.75 22.37 0 1 3.6 31.5 15.37 27.75 22.37 0 1-24.8 19.8 15.37 27.75 22.37 0 1-3.6-31.5 15.37 27.75 22.37 0 1 20.6-20.4zM288 247.1a19.12 35.25 54.78 0 1 12.6 5.8 19.12 35.25 54.78 0 1-19.1 36.1 19.12 35.25 54.78 0 1-39.2 3.6 19.12 35.25 54.78 0 1 19.1-36.1 19.12 35.25 54.78 0 1 26.6-9.4zm39.2 37.2a15.37 27.75 46.31 0 1 1.4 0 15.37 27.75 46.31 0 1 7.5 3 15.37 27.75 46.31 0 1-9.4 30.3 15.37 27.75 46.31 0 1-30.7 8 15.37 27.75 46.31 0 1 9.4-30.3 15.37 27.75 46.31 0 1 21.8-11zm-133.8 81.8C224 412.5 224 431 224 494h64c0-63 0-81.5 30.6-127.9C299.1 373.2 278 377 256 377s-43.1-3.8-62.6-10.9z"></path>
          </svg>
          <h1 className="text-md font-bold">SwingTracker</h1>
        </Link>
        <div className="flex items-center gap-2">
          {isStatisticsPage ? (
            <Link href="/">
              <Button variant="ghost" className="gap-1">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          ) : (
            <Link href={`/statistics?club=${selectedClub}`}>
              <Button variant="ghost" className="gap-1">
                Statistics
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
