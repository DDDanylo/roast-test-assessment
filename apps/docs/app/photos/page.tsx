import Image from "next/image";

import HeaderText from "../../src/features/report/components/HeaderText";
import PhotosForm from "../../src/features/report/components/PhotosForm";

import secondaryLogo from "../../public/secondary-logo.svg";

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen px-2 py-6 bg-secondary text-secondary-foreground text-center">
      <Image src={secondaryLogo} alt="Roast logo" className="mx-auto" />
      <div className="mt-4 h-full flex flex-col flex-1 gap-5">
        <HeaderText
          title="Upload your dating pics"
          subtitle="To get your profile analysis"
        />

        <PhotosForm />
      </div>
    </main>
  );
}
