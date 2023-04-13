import "./globals.css";
import React, { StrictMode } from "react";

export const metadata = {
  title: "Kameground V1",
  description: "Play, Clip and Share !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </StrictMode>
  );
}
