"use client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/ui/form";
import { Button } from "@repo/ui/components/ui/button";

import Dropzone from "../../../shared/components/Dropzone";
import { useReportStore } from "../../../store/useReportStore";

const NUM_OF_PHOTOS = 6;
const DEFAULT_VALUES = { files: new Array(NUM_OF_PHOTOS).fill(null) };
const ALLOWED_TYPES = [{ name: "image", types: ["image/jpeg", "image/png"] }];

interface FormValues {
  files: (File | null | undefined)[];
}

const PhotosForm: FC = () => {
  const bulkSetImages = useReportStore((store) => store.bulkSetImages);

  const router = useRouter();
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
        form.setError(`files.${index}`, {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        newFiles[index] = acceptedFiles[0];
        form.clearErrors(`files.${index}`);
      }
    } else {
      newFiles[index] = null;
      form.setError(`files.${index}`, {
        message: "File is required",
        type: "typeError",
      });
    }
    form.setValue("files", newFiles);
  };

  const onSubmit = (data: FormValues) => {
    bulkSetImages(data.files as File[]);
    router.push("/results");
  };

  const files = form.watch("files");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col flex-1 justify-between items-center"
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
                    <Dropzone
                      {...field}
                      value={file}
                      error={fieldState.error?.message}
                      handleOnDrop={(acceptedFiles) =>
                        handleOnDrop(index, acceptedFiles)
                      }
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
