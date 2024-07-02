import { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
}

const HeaderText: FC<Props> = ({ title, subtitle }) => (
  <div className="text-center mt-6">
    <h1 className="font-bold text-2xl">{title}</h1>
    <p className="mt-2 font-normal text-base">{subtitle}</p>
  </div>
);

export default HeaderText;
