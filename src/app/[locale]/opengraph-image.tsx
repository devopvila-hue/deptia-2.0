import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isLocale, locales, type Locale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Departify";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params: { locale } }: { params: { locale: string } }) {
  const l: Locale = isLocale(locale) ? locale : "es";
  const m = JSON.parse(readFileSync(join(process.cwd(), "messages", `${l}.json`), "utf8"));
  const logo = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), "public", "logo.svg")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: "72px 80px", color: "#121412" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logo} width={216} height={48} />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.04, maxWidth: 1000 }}>
          <span>{m.hero.title}</span>
          <span style={{ color: "#057e2f" }}>{m.hero.titleAccent}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#4a4e47" }}>
          <div style={{ display: "flex", background: "#055526", color: "#fff", borderRadius: 999, padding: "10px 24px" }}>{m.hero.price}</div>
          <div style={{ display: "flex" }}>{m.hero.priceNote}</div>
        </div>
      </div>
    ),
    size,
  );
}
