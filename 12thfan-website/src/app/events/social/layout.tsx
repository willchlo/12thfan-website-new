import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Social",
  description: "Community clips and launch news from 12th Fan.",
};

export default function EventsSocialLayout({ children }: { children: ReactNode }) {
  return children;
}
