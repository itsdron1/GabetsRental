import Image from "next/image";
import { Link } from "@/i18n/navigation";

const LOGO_SRC = "/brand/gdrive-logo-horizontal-1600.png";
export const BRAND_LOGO_ALT = "G-DRIVE — Premium Motorcycle Rental Bali";

type BrandLogoProps = {
  size?: "header" | "footer";
  priority?: boolean;
};

export default function BrandLogo({ size = "header", priority = false }: BrandLogoProps) {
  const heightClass = size === "footer" ? "h-14" : "h-8 md:h-10";

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={BRAND_LOGO_ALT}>
      <Image
        src={LOGO_SRC}
        alt={BRAND_LOGO_ALT}
        width={1600}
        height={347}
        priority={priority}
        className={`${heightClass} w-auto max-w-[min(72vw,280px)]`}
      />
    </Link>
  );
}
