import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { bootScript } from "@/components/boot-script";
import { links } from "@/config/links";
import { inter, interExt } from "@/styles/fonts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(links.site),
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0b" },
  ],
};

export default function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) {
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={localeMeta[locale].bcp47} className={`${inter.variable} ${interExt.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
