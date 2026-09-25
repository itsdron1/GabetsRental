import type { ReactNode } from "react";

export type BrandIconName =
  | "cruiser"
  | "sport"
  | "adventure"
  | "enduro"
  | "scooter"
  | "delivery"
  | "faq"
  | "clients"
  | "service"
  | "shield"
  | "chat"
  | "license"
  | "card"
  | "calendar"
  | "pin"
  | "helmet";

const PATHS: Record<BrandIconName, ReactNode> = {
  cruiser: (
    <>
      <circle cx="6.5" cy="17" r="2.4" />
      <circle cx="17.5" cy="17" r="2.4" />
      <path d="M8.8 17h5.2M4.5 17 7 11.5h6.2l2.4 3.2h3.2" />
      <path d="M9.2 11.5 11 8.2h4.2M13.4 11.5V9.4" />
    </>
  ),
  sport: (
    <>
      <circle cx="6.2" cy="17.2" r="2.3" />
      <circle cx="17.8" cy="17.2" r="2.3" />
      <path d="M8.4 17.2 11.2 10l4.6-2.6M11.2 10l3.6 7.2M14.6 12.6h4.2l-1.6-3.8" />
      <path d="M8.8 12.4H12" />
    </>
  ),
  adventure: (
    <>
      <circle cx="6.4" cy="17" r="2.4" />
      <circle cx="17.6" cy="17" r="2.4" />
      <path d="M8.7 17h5.4M5.2 17 8 10.6h5.6l2.2 3.6h3.4" />
      <path d="M9.4 10.6 8.2 7.6h4.8M12.2 10.6V8.4" />
      <path d="M16.2 9.2v-2.4M15.2 6.8h2" />
    </>
  ),
  enduro: (
    <>
      <circle cx="6.3" cy="17.1" r="2.5" />
      <circle cx="17.7" cy="17.1" r="2.5" />
      <path d="M8.8 17.1h5.2M5 17.1 8.4 10h5l2.4 4.2h3" />
      <path d="M10 10 8.6 6.8h3.8M13.2 10.2 15.4 7" />
      <path d="M7.2 13.4h3.4" />
    </>
  ),
  scooter: (
    <>
      <circle cx="6.6" cy="17" r="2.3" />
      <circle cx="17.6" cy="17" r="2.3" />
      <path d="M8.8 17h5.4M5.8 17 8 13.2h5.6l1.8 3.8" />
      <path d="M13.6 13.2V9.2h3.4" />
      <path d="M8.4 13.2 10 9.6h3.6" />
    </>
  ),
  delivery: (
    <>
      <path d="M3.8 8.2h9.6v8.2H3.8z" />
      <path d="M13.4 11.2h4.2l2.6 3.2v2H13.4" />
      <circle cx="7.2" cy="17.6" r="1.7" />
      <circle cx="16.8" cy="17.6" r="1.7" />
    </>
  ),
  faq: (
    <>
      <path d="M6.2 16.6 4.6 19.4 8 17.6A8 8 0 1 0 6.2 16.6Z" />
      <path d="M9.8 10.2c.4-1.3 1.6-1.9 2.8-1.9 1.4 0 2.5.8 2.5 2.2 0 1.6-1.5 2-2.2 2.6-.5.4-.7 1-.7 1.6" />
      <path d="M12.1 16.6h.1" />
    </>
  ),
  clients: (
    <>
      <circle cx="9" cy="8.4" r="2.3" />
      <path d="M4.6 17.6c.4-3 2.2-4.6 4.4-4.6s4 1.6 4.4 4.6" />
      <circle cx="16.2" cy="9" r="1.9" />
      <path d="M14.2 17.6c.2-2.2 1.4-3.4 3.2-3.4 1.2 0 2.2.6 2.8 1.8" />
    </>
  ),
  service: (
    <>
      <path d="M8.2 8.2 6 6a2.6 2.6 0 0 1 3.7-3.7l1.4 1.4" />
      <path d="M10.2 7.4 18.8 16a1.8 1.8 0 0 1-2.6 2.6l-8.6-8.6" />
      <path d="M14.8 16.8 17 19" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.6 19.2 6.2v6.2c0 4-3 6.6-7.2 8-4.2-1.4-7.2-4-7.2-8V6.2Z" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </>
  ),
  chat: (
    <>
      <path d="M6 16.8 4.4 19.6 8 17.8A8 8 0 1 0 6 16.8Z" />
      <path d="M8.6 11.2h6.8M8.6 14h4.6" />
    </>
  ),
  license: (
    <>
      <rect x="3.6" y="6.2" width="16.8" height="11.6" rx="1.6" />
      <circle cx="8.4" cy="11.4" r="1.8" />
      <path d="M12.4 10h5.2M12.4 13.2h4" />
    </>
  ),
  card: (
    <>
      <rect x="3.4" y="6.4" width="17.2" height="11.2" rx="1.6" />
      <path d="M3.4 10.2h17.2M7 14.4h4.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.8" width="16" height="14" rx="1.6" />
      <path d="M4 10h16M8.2 4.4v2.8M15.8 4.4v2.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.4s6.2-5.2 6.2-9.4A6.2 6.2 0 0 0 5.8 11c0 4.2 6.2 9.4 6.2 9.4Z" />
      <circle cx="12" cy="11" r="2.1" />
    </>
  ),
  helmet: (
    <>
      <path d="M5 14.6c.4-4.6 3.2-8 7-8s6.6 3.4 7 8H5Z" />
      <path d="M5 14.6h14v2.2a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 16.8Z" />
      <path d="M12 6.6V9" />
    </>
  ),
};

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  framed?: boolean;
  className?: string;
};

export default function BrandIcon({
  name,
  size = 16,
  framed = false,
  className = "",
}: BrandIconProps) {
  const glyph = (
    <svg
      viewBox="0 0 24 24"
      width={framed ? Math.round(size * 0.5) : size}
      height={framed ? Math.round(size * 0.5) : size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={framed ? "text-ivory" : className}
    >
      {PATHS[name]}
    </svg>
  );

  if (!framed) return glyph;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-teal text-ivory ${className}`}
      style={{ width: size, height: size }}
    >
      {glyph}
    </span>
  );
}
