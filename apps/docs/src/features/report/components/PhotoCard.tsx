import React, {
  InputHTMLAttributes,
  ChangeEvent,
  useRef,
  FC,
  forwardRef,
  MouseEvent,
  useEffect,
} from "react";
import { CardContent } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";

import { useToast } from "../../../../../../packages/ui/src/components/ui/use-toast";

import UserIcon from "../../../shared/components/icons/UserIcon";
import CloseIcon from "../../../shared/components/icons/CloseIcon";
import PlusIcon from "../../../shared/components/icons/PlusIcon";

export const ALLOWED_TYPES = [
  { name: "image", types: ["image/jpeg", "image/png", "image/webp"] },
];
const ACCEPT_STR = ALLOWED_TYPES.flatMap((typeSet) =>
  typeSet.types.map((type) => type),
).join(", ");

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: File | null;
  error?: string;
  classNameWrapper?: string;
  className?: string;
  fileUrl?: string | null;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const PhotoCard: FC<Props> = forwardRef<HTMLDivElement, Props>(
  (
    {
      value,
      error,
      classNameWrapper,
      className,
      handleOnDrop,
      fileUrl,
      ...props
    },
    ref,
  ) => {
    const { toast } = useToast();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    const handleButtonClick = (
      e: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleRemoveFile = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleOnDrop(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    useEffect(() => {
      if (!error?.length) return;

      toast({
        variant: "destructive",
        title: error,
        duration: 2500,
      });
    }, [error, toast]);

    return (
      <div
        ref={ref}
        className={cn(
          `min-w-[100px] aspect-[3/5] bg-card-bg bg-cover bg-no-repeat bg-center rounded-lg hover:cursor-pointer`,
          { "border-2 border-dashed border-muted-foreground/50": !value },
          classNameWrapper,
        )}
        style={{
          ...(fileUrl && {
            backgroundImage: `url(${fileUrl})`,
          }),
        }}
      >
        <CardContent
          className="p-0 w-full h-full flex flex-col items-center justify-center space-y-2 text-xs relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {!value && <UserIcon />}
          <Input
            {...props}
            value={undefined}
            ref={inputRef}
            type="file"
            accept={ACCEPT_STR}
            className={cn("hidden", className)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOnDrop(e.target.files)
            }
          />
          <Button
            type="button"
            className={"p-0 w-7 h-7 absolute -bottom-1.5 -right-1.5"}
            variant={value ? "muted" : "default"}
            onClick={value ? handleRemoveFile : handleButtonClick}
          >
            {value ? <CloseIcon /> : <PlusIcon />}
          </Button>
        </CardContent>
      </div>
    );
  },
);

export default PhotoCard;
