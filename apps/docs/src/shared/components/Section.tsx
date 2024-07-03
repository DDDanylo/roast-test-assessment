import { cn } from "@repo/ui/lib/utils";
import { FC, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section: FC<SectionProps> = ({ children, className }) => (
  <div className={cn("w-full px-4 py-6", className)}>{children}</div>
);

const SectionHeader: FC<SectionProps> = ({ children, className }) => (
  <div className={cn("text-center mt-6", className)}>{children}</div>
);

const SectionTitle: FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => <h1 className={cn("font-bold text-2xl", className)}>{title}</h1>;

const SectionDescription: FC<{ description: string; className?: string }> = ({
  description,
  className,
}) => (
  <p className={cn("mt-2 font-normal text-base", className)}>{description}</p>
);

const SectionContent: FC<SectionProps> = ({ children, className }) => (
  <div className={cn("mt-4 flex flex-col items-center", className)}>
    {children}
  </div>
);

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
};
