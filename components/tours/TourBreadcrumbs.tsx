import Link from "next/link";

type TourBreadcrumbsProps = {
  tourTitle: string;
};

export default function TourBreadcrumbs({ tourTitle }: TourBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-cream">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li>
          <Link href="/tour-packages" className="transition-colors hover:text-cream">
            Tour Packages
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li className="text-cream">{tourTitle}</li>
      </ol>
    </nav>
  );
}
