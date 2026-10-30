// Official Departify logo (D symbol + wordmark): dark wordmark on light
// backgrounds, the original white wordmark on dark ones.
export function BrandLogo({ className = "h-[22px] w-auto" }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="Departify" width={1794} height={398} className={`logo-for-light ${className}`} decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-dark.svg" alt="Departify" width={1794} height={398} className={`logo-for-dark ${className}`} decoding="async" />
    </>
  );
}
