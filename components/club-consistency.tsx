import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConsistentClub } from "@/app/actions/shots";

interface ClubConsistencyProps {
  consistentClubs: ConsistentClub[];
}

export function ClubConsistency({ consistentClubs }: ClubConsistencyProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Consistency</CardTitle>
        <CardDescription>Standard deviation of your shots</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {consistentClubs.length === 0 ? (
            <p className="text-center text-muted-foreground">No consistency data available yet</p>
          ) : (
            consistentClubs.map((club) => (
              <div key={club.name} className="flex items-center justify-between">
                <span className="text-sm">
                  {club.name} ({club.power}% power, {club.shotCount} shots)
                </span>
                <span className="text-sm font-medium">±{club.standardDeviation} m</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
