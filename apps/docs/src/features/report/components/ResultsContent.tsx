"use client";
import { FC, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@repo/ui/components/ui/carousel";

import { useReportStore } from "../../../store/useReportStore";
import { USER_DATA } from "../mocks";

import UserCard from "./UserCard";
import Scanner from "./Scanner";
import WithPhotosGate from "./WithPhotosGate";

const ResultsContent: FC = () => {
  const photos = useReportStore((store) => store.photos);

  const [isScanning, setIsScanning] = useState(true);

  const extendedUserData = photos.map((file, i) => ({
    ...USER_DATA[i],
    imageUrl: URL.createObjectURL(file),
  }));

  return isScanning ? (
    <Scanner setIsScanning={setIsScanning} />
  ) : (
    <div className="flex flex-col justify-between items-center min-h-screen pt-8 px-4 pb-5">
      <div className="flex flex-col gap-5">
        <h1 className="font-black text-4xl text-center">Get detailed report</h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {extendedUserData.map((user, index) => (
              <CarouselItem key={index}>
                <UserCard
                  meta={user.meta}
                  statistics={user.statistics}
                  imageUrl={user.imageUrl}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Button>Continue</Button>
    </div>
  );
};

export default WithPhotosGate(ResultsContent);
