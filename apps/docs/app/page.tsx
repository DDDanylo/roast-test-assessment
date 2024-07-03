import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import logo from "../public/logo.svg";
import weakProfile from "../public/images/weak-profile.png";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "../src/shared/components/Section";

export default function Page() {
  return (
    <main className="flex flex-col justify-between items-center h-screen pb-6 bg-primary text-primary-foreground text-center">
      <Section>
        <SectionHeader>
          <Image src={logo} alt="Roast logo" className="mx-auto" />
          <SectionTitle title="Upload your dating pics" className="mt-6" />
          <SectionDescription description="To get your profile analysis" />
        </SectionHeader>
        <SectionContent>
          <Image
            src={weakProfile}
            alt="Report Flow screenshot"
            className="mt-6"
          />
        </SectionContent>
      </Section>
      <Link href="/photos" className="w-full">
        <Button variant="secondary">Upload Photos</Button>
      </Link>
    </main>
  );
}
