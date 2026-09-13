import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type TourBreadcrumbsProps = {
  tourTitle: string;
};

export default async function TourBreadcrumbs({ tourTitle }: TourBreadcrumbsProps) {
  const t = await getTranslations("tours.ui");
  const tSeo = await getTranslations("seo");

  return (
    <nav aria-label={t("breadcrumb")} className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-cream">
            {tSeo("breadcrumbHome")}
          </Link>
        </li>
        <li aria-hidden className="text-border">
          /
        </li>
        <li>
          <Link href="/tour-packages" className="transition-colors hover:text-cream">
            {tSeo("breadcrumbTours")}
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
