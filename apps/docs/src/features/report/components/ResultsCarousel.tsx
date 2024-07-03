"use client";
import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@repo/ui/components/ui/carousel";

import { useReportStore } from "../../../store/useReportStore";
import { USER_DATA } from "../mocks";

import UserCard from "./UserCard";
import WithPhotosGate from "./WithPhotosGate";

const ResultsCarousel: FC = () => {
  const photos = useReportStore((store) => store.photos);

  const extendedUserData = photos.map((file, i) => ({
    ...USER_DATA[i],
    imageUrl: file ? URL.createObjectURL(file) : undefined,
  }));

  return (
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
  );
};

export default WithPhotosGate(ResultsCarousel);
