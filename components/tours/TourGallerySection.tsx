import { getTranslations } from "next-intl/server";
import type { TourGalleryImage } from "@/data/tours";
import TourGallery from "@/components/tours/TourGallery";

type TourGallerySectionProps = {
  images: TourGalleryImage[];
};

export default async function TourGallerySection({ images }: TourGallerySectionProps) {
  const t = await getTranslations("tours.ui");
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-8">{t("gallery")}</h2>
        <TourGallery images={images} premium />
      </div>
    </section>
  );
}
