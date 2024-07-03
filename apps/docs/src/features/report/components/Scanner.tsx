"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { useReportStore } from "../../../store/useReportStore";
import secondaryLogo from "../../../../public/secondary-logo.svg";

import "./index.css";
import { useRouter } from "next/navigation";

const Scanner: FC = () => {
  const photos = useReportStore((store) => store.photos);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextActiveIndex = activePhotoIndex + 1;
      if (nextActiveIndex >= photos.length) {
        router.push("/results");
        return;
      }

      setActivePhotoIndex(nextActiveIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activePhotoIndex]);

  const activePhoto = photos[activePhotoIndex];

  return (
    <div
      className="w-full min-h-screen flex flex-col flex-grow justify-center bg-cover bg-no-repeat bg-center relative"
      style={{
        ...(activePhoto && {
          backgroundImage: `linear-gradient(45deg, rgba(245, 70, 66, 0.55), rgba(8, 83, 156, 0.55)), url(${URL.createObjectURL(activePhoto)})`,
        }),
      }}
    >
      <div className="absolute w-full h-1 bg-primary animate-scan top-3" />

      <div className="absolute top-6 flex justify-center w-full">
        <Image src={secondaryLogo} alt="Roast logo" className="mx-auto pt-6" />
      </div>

      <div className="text-4xl text-center">🧨</div>
      <h1 className="mt-5 font-black text-4xl text-center">
        Analyzing your profile...
      </h1>
    </div>
  );
};

export default Scanner;
