import "@/app/globals.css";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { GolfProvider } from "./context/GolfContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwingTrack - Golf Club Distance Tracker",
  description: "Track your golf club distances and swing power percentages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GolfProvider>
            <Nav />
            {children}
            <Toaster position="bottom-center" expand={false} richColors closeButton />
          </GolfProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
