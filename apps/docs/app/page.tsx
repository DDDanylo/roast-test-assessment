import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import HeaderText from "../src/features/report/components/HeaderText";

import logo from "../public/logo.svg";

export default function Page() {
  return (
    <main className="flex flex-col justify-between items-center w-full h-[100vh] pt-6 py-5 pb-6 bg-primary text-primary-foreground text-center bg-[url('/images/weak-profile.png')] bg-no-repeat bg-center">
      <div>
        <Image src={logo} alt="Roast logo" className="mx-auto" />
        <HeaderText
          title="Upload your dating pics"
          subtitle="To get your profile analysis"
        />
      </div>

      <Link href="/photos" className="w-full">
        <Button variant="secondary">Upload Photos</Button>
      </Link>
    </main>
  );
}
