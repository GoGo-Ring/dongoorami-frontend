import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "~/libs/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <section>{children}</section>
      </body>
    </html>
  );
}
