import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Movies Database",
  description: "Discover movies",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <head></head>
    <body>
      {children}
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
