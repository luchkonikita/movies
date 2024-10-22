import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title: ReactNode;
}>;

const ErrorPage = ({ title, children }: Props) => (
  <div className="h-screen w-screen p-8 flex flex-col items-center justify-center gap-4">
    <h1 className="text-2xl">{title}</h1>
    {children}
  </div>
);

export default ErrorPage;
