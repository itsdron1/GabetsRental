import { writeFileSync } from "node:fs";
import { bikes, deliveryPerks, deliveryZones, whyCards, trustItems } from "../lib/data";
import { tours } from "../data/tours";
import { HOME_FAQS } from "../lib/seo";

const taglines: Record<string, string> = {};
const badges: Record<string, string> = {};
for (const bike of bikes) {
  taglines[bike.id] = bike.tagline;
  if (bike.badge) badges[bike.badge] = bike.badge;
}

const packages: Record<string, unknown> = {};
for (const tour of tours) {
  packages[tour.slug] = {
    title: tour.title,
    tagline: tour.tagline,
    description: tour.description,
    distance: tour.distance,
    duration: tour.duration,
    departureTime: tour.departureTime,
    startingPrice: tour.startingPrice,
    priceNote: tour.priceNote ?? "",
    difficulty: tour.difficulty,
    highlights: tour.highlights,
    included: tour.included,
    notIncluded: tour.notIncluded,
    toBring: tour.toBring,
    safetyRequirements: tour.safetyRequirements,
    riderRequirements: tour.riderRequirements,
    places: tour.placesToVisit,
    faq: tour.faq,
    routes: tour.routes.map((route) => ({
      label: route.label ?? "",
      stops: route.stops.map((stop) => ({
        name: stop.name,
        note: stop.note ?? "",
      })),
    })),
  };
}

writeFileSync(
  "scripts/.extracted-content.json",
  JSON.stringify(
    {
      taglines,
      badges,
      whyCards: whyCards.map(({ title, text }) => ({ title, text })),
      deliveryPerks: deliveryPerks.map(({ title, text }) => ({ title, text })),
      deliveryZones: deliveryZones.map(({ name, price }) => ({ name, price })),
      trustItems,
      homeFaqs: HOME_FAQS,
      packages,
    },
    null,
    2,
  ),
);

console.log("wrote scripts/.extracted-content.json");
