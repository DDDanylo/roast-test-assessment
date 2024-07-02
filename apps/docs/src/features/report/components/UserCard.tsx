import { Card } from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import Image from "next/image";

import { FC } from "react";

import secondaryLogo from "../../../../public/secondary-logo.svg";

export interface UserCardData {
  meta?: string[];
  statistics?: { [k: string]: number }[];
  imageUrl?: string;
}

const UserCard: FC<UserCardData> = ({ meta, statistics, imageUrl }) => (
  <Card className="p-4 mx-auto max-w-[342px] bg-transparent text-secondary-foreground ">
    <div className="flex gap-4">
      {imageUrl ? (
        <Image
          width={112}
          height={158}
          src={imageUrl}
          alt="User pic"
          className="rounded-lg"
        />
      ) : (
        <div className="w-[112px] h-[158px] bg-primary rounded-lg" />
      )}
      <div className="mt-3">
        <p className="font-bold text-xl">Martha</p>
        <div className="mt-[2px]">
          {meta?.map((data, i) => (
            <p className="mt-2 font-normal text-xs" key={i}>
              {data}
            </p>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-4 flex flex-col gap-3">
      {statistics?.map((item, id) => {
        const entry = Object.entries(item)[0];
        if (!entry) return null;
        const [key, value] = entry;

        return (
          <div className="flex flex-col gap-1" key={id}>
            <p className="font-medium text-lg">{key}</p>
            <Progress
              value={value}
              indicatorColor={value > 70 ? "bg-primary" : undefined}
            />
          </div>
        );
      })}
    </div>

    <Image
      src={secondaryLogo}
      alt="Roast logo"
      className="mx-auto mt-4"
      width={80}
    />
  </Card>
);

export default UserCard;
