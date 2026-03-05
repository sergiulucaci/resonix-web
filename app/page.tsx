import { Hero } from "@/components/landing/hero";
import { TopicsGrid } from "@/components/landing/topics-grid";
import { SampleBriefing } from "@/components/landing/sample-briefing";
import { SourcesWall } from "@/components/landing/sources-wall";
import { Footer } from "@/components/landing/footer";
import { ThemeToggle } from "@/components/landing/theme-toggle";

export default function LandingPage() {
  return (
    <div className="landing">
      <ThemeToggle />
      <Hero />
      <SampleBriefing />
      <TopicsGrid />
      <SourcesWall />
      <Footer />
    </div>
  );
}
