// Official Departify logo (D symbol + wordmark). Only the wordmark ink is
// darkened so it reads on light backgrounds.
export function BrandLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="Departify" width={1794} height={398} className={className} decoding="async" />
  );
}
