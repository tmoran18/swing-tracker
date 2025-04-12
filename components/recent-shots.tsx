import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRecentShots } from "@/app/actions/shots";

export async function RecentShots() {
  const { data: shots } = await getRecentShots();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Shots
          <a href="/all-shots" className="text-blue-500 hover:underline ml-4">
            View All
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shots && shots.length > 0 ? (
            shots.map((shot, index) => (
              <div key={shot.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{shot.club}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(shot.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{shot.distance} m</p>
                    <p className="text-sm text-muted-foreground">{shot.power}% power</p>
                  </div>
                </div>
                {index < shots.length - 1 && <Separator className="mt-4" />}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No shots recorded yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
