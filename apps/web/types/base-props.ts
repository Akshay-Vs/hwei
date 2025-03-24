import { PropsWithChildren } from "react";

export type BaseProps = PropsWithChildren & {
  className?: string;
};

export type TBaseLoading = {
  loading: boolean;
};