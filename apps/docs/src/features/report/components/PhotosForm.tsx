"use client";
import React, { FC, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/ui/form";
import { Button } from "@repo/ui/components/ui/button";

import { useReportStore } from "../../../store/useReportStore";

import PhotoCard, { ALLOWED_TYPES } from "./PhotoCard";

const NUM_OF_PHOTOS = 6;
const INIT_ARR = new Array(NUM_OF_PHOTOS).fill(null);
const DEFAULT_VALUES = { files: INIT_ARR };

interface FormValues {
  files: (File | null | undefined)[];
}

interface Props {
  setIsScanning: (v: boolean) => void;
}

const PhotosForm: FC<Props> = ({ setIsScanning }) => {
  const bulkSetImages = useReportStore((store) => store.bulkSetImages);
  const fileUrls = useRef<(string | null)[]>(INIT_ARR);

  const form = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  const handleOnDrop = (index: number, acceptedFiles: FileList | null) => {
    const newFiles = [...(form.getValues("files") ?? [])];
    if (acceptedFiles && acceptedFiles.length > 0) {
      const fileType = ALLOWED_TYPES.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0]?.type),
      );
      if (!fileType) {
        newFiles[index] = null;
        fileUrls.current[index] = null;
        form.setError(`files.${index}`, {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        newFiles[index] = acceptedFiles[0];
        fileUrls.current[index] = acceptedFiles[0]
          ? URL.createObjectURL(acceptedFiles[0])
          : null;
        form.clearErrors(`files.${index}`);
      }
    } else {
      newFiles[index] = null;
      fileUrls.current[index] = null;
      form.setError(`files.${index}`, {
        message: "File is required",
        type: "typeError",
      });
    }
    form.setValue("files", newFiles);
  };

  const onSubmit = (data: FormValues) => {
    bulkSetImages(data.files as File[]);
    setIsScanning(true);
  };

  const files = form.watch("files");

  useEffect(() => {
    return () => {
      // revoke all URLs on component unmount
      fileUrls.current.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-between items-center grow"
      >
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`files.${index}`}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PhotoCard
                      {...field}
                      value={file}
                      error={fieldState.error?.message}
                      handleOnDrop={(acceptedFiles) =>
                        handleOnDrop(index, acceptedFiles)
                      }
                      fileUrl={fileUrls.current[index]} // Pass the file URL as a prop
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={
            files.filter((value) => value != null).length !== NUM_OF_PHOTOS
          }
        >
          Analyze it!
        </Button>
      </form>
    </Form>
  );
};

export default PhotosForm;
