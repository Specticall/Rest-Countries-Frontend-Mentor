import { ReactElement } from "react";
import { ChilrenProp } from "../Types/types";

interface AppLayoutProp extends ChilrenProp {
  containerClassName?: string;
  wrapperClassName?: string;
}

export default function AppLayout({
  children,
  containerClassName,
  wrapperClassName,
}: AppLayoutProp): ReactElement {
  return (
    <main
      className={`bg-background-lightmode dark:bg-background-darkmode min-h-screen font-main pt-[7rem] pb-10 ${containerClassName}`}
    >
      <div className={`max-w-[1300px] mx-auto px-8 ${wrapperClassName}`}>
        {children}
      </div>
    </main>
  );
}
