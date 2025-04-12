import { getAllShots } from "@/app/actions/shots";
import AllShotsClient from "@/components/all-shots-client";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 0;

export default async function AllShots() {
  const shots = await getAllShots();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-600 via-green-900 to-green-700">
      <main className="flex-1 container px-4 py-6 md:py-10 mx-auto">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent>
              <h1 className="text-2xl font-bold mb-4">All Shots</h1>
              <AllShotsClient initialShots={shots} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
