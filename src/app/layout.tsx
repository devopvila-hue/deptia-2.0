import type { ReactNode } from "react";
import "@/styles/globals.css";

// The <html> element lives in [locale]/layout so `lang` always matches the page.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
