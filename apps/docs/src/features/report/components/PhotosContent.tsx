"use client";
import { FC, useState } from "react";

import Scanner from "./Scanner";
import Image from "next/image";

import secondaryLogo from "/public/secondary-logo.svg";

import PhotosForm from "./PhotosForm";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "../../../shared/components/Section";

const PhotosContent: FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  return isScanning ? (
    <Scanner />
  ) : (
    <Section className="flex flex-col">
      <SectionHeader>
        <Image src={secondaryLogo} alt="Roast logo" className="mx-auto" />
        <SectionTitle title="Upload your dating pics" className="mt-6" />
        <SectionDescription description="To get your profile analysis" />
      </SectionHeader>

      <SectionContent className="grow">
        <PhotosForm setIsScanning={setIsScanning} />
      </SectionContent>
    </Section>
  );
};

export default PhotosContent;
