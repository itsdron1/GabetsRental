import type { TourGalleryImage } from "@/data/tours";
import TourGallery from "@/components/tours/TourGallery";

type TourGallerySectionProps = {
  images: TourGalleryImage[];
};

export default function TourGallerySection({ images }: TourGallerySectionProps) {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="section-inner">
        <h2 className="section-title mb-8">Photo Gallery</h2>
        <TourGallery images={images} premium />
      </div>
    </section>
  );
}
