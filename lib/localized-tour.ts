import type { Tour } from "@/data/tours";

type TourCopy = {
  title?: string;
  tagline?: string;
  description?: string[];
  distance?: string;
  duration?: string;
  departureTime?: string;
  startingPrice?: string;
  priceNote?: string;
  difficulty?: Tour["difficulty"];
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  toBring?: string[];
  safetyRequirements?: string[];
  riderRequirements?: string[];
  places?: Tour["placesToVisit"];
  faq?: Tour["faq"];
  routes?: Tour["routes"];
};

export function localizeTour(tour: Tour, t: { raw: (key: never) => unknown }): Tour {
  const copy = t.raw(`packages.${tour.slug}` as never) as TourCopy | undefined;
  if (!copy) return tour;

  return {
    ...tour,
    title: copy.title ?? tour.title,
    tagline: copy.tagline ?? tour.tagline,
    description: copy.description ?? tour.description,
    distance: copy.distance ?? tour.distance,
    duration: copy.duration ?? tour.duration,
    departureTime: copy.departureTime ?? tour.departureTime,
    startingPrice: copy.startingPrice ?? tour.startingPrice,
    priceNote: copy.priceNote || tour.priceNote,
    difficulty: copy.difficulty ?? tour.difficulty,
    highlights: copy.highlights ?? tour.highlights,
    included: copy.included ?? tour.included,
    notIncluded: copy.notIncluded ?? tour.notIncluded,
    toBring: copy.toBring ?? tour.toBring,
    safetyRequirements: copy.safetyRequirements ?? tour.safetyRequirements,
    riderRequirements: copy.riderRequirements ?? tour.riderRequirements,
    placesToVisit: copy.places ?? tour.placesToVisit,
    faq: copy.faq ?? tour.faq,
    routes: copy.routes
      ? tour.routes.map((route, index) => ({
          ...route,
          ...copy.routes?.[index],
          stops: copy.routes?.[index]?.stops?.length
            ? copy.routes[index].stops
            : route.stops,
        }))
      : tour.routes,
  };
}

export function localizeTours(tours: Tour[], t: { raw: (key: never) => unknown }): Tour[] {
  return tours.map((tour) => localizeTour(tour, t));
}
