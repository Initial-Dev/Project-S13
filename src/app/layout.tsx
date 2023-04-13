import "./globals.css";
import React, { StrictMode } from "react";

export const metadata = {
  title: "Kameground V1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StrictMode>
  );
}
