'use Client'
import LandingPage from "@/components/landingPage";
import { useUser } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
