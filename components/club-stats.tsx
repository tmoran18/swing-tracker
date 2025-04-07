"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClubStats as ClubStatsType } from "@/app/actions/shots";
import { CLUB_VALUE_MAP } from "@/lib/constants";

interface ClubStatsProps {
  clubStats: ClubStatsType[] | null;
  selectedClub: string;
  isLoading: boolean;
  onClubChange: (club: string) => void;
}

export function ClubStats({ clubStats, selectedClub, isLoading, onClubChange }: ClubStatsProps) {
  return (
    <Card>
      <CardContent className="grid gap-6">
        <div className="flex justify-between items-center">
          <label htmlFor="club-select" className="text-sm font-medium">
            Select Club
          </label>
          <Select value={selectedClub} onValueChange={onClubChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select club" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CLUB_VALUE_MAP).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="pt-4">
            <div className="w-full bg-white dark:bg-card rounded-md border p-4">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : !clubStats || clubStats.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No data available for this club</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between pb-4">
                  <div className="space-y-6">
                    {clubStats.map((stat) => {
                      return (
                        <div key={stat.power} className="space-y-2">
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block dark:text-green-600">
                                  {stat.shotCount} shots
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block dark:text-green-600">
                                  {stat.power}%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-6 text-xs flex rounded bg-input">
                              <div
                                style={{
                                  width: `${stat.power}%`,
                                  background: "linear-gradient(to right, #00cb49, #166534)",
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                              >
                                <span className="text-xs font-semibold inline-block text-white text-right pr-2">
                                  {stat.averageDistance} m
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="table" className="pt-4">
            <div className="border rounded-md overflow-hidden">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">Loading...</div>
              ) : !clubStats || clubStats.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No data available for this club</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2 font-medium text-xs">Power %</th>
                      <th className="text-right p-2 font-medium text-xs dark:text-primary">Avg. Distance</th>
                      <th className="text-right p-2 font-medium text-xs">Shots</th>
                      <th className="text-right p-2 font-medium text-xs">±</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubStats.map((stat, index) => (
                      <tr key={stat.power} className={`border-t ${index % 2 === 1 ? "bg-muted/20" : ""}`}>
                        <td className="p-2 text-xs">{stat.power}%</td>
                        <td className="text-right p-2 text-sm dark:text-primary">{stat.averageDistance} m</td>
                        <td className="text-right p-2 text-xs">{stat.shotCount}</td>
                        <td className="text-right p-2 text-xs">{stat.standardDeviation} m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
