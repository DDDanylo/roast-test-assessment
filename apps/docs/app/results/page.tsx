import { Button } from "@repo/ui/components/ui/button";

import ResultsCarousel from "../../src/features/report/components/ResultsCarousel";
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTitle,
} from "../../src/shared/components/Section";

export default function Page() {
  return (
    <main className="flex flex-col justify-between items-center pb-5 min-h-screen bg-secondary text-secondary-foreground">
      <Section>
        <SectionHeader>
          <SectionTitle title="Get detailed report" />
        </SectionHeader>
        <SectionContent>
          <ResultsCarousel />
        </SectionContent>
      </Section>
      <Button>Continue</Button>
    </main>
  );
}
