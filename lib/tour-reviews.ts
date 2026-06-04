type TourReview = {
  name: string;
  text: string;
};

const reviews: Record<string, TourReview[]> = {
  "kintamani-highlands": [
    {
      name: "Sarah M.",
      text: "Route A through Ubud was incredible — the guide knew every back road to Tegalalang. Kintamani was cold and stunning. Worth every kilometer.",
    },
    {
      name: "James K.",
      text: "We chose Route B for the quieter coastal start. Penglipuran felt like stepping back in time. Professional guide, premium bikes, zero stress.",
    },
    {
      name: "Annika R.",
      text: "Full day on the big bike with perfect pacing. Coffee plantation stop was a highlight. Already planning to book Bedugul next trip.",
    },
  ],
  "bedugul-pupuan-lush-ride": [
    {
      name: "Sarah M.",
      text: "Lake Bratan at sunrise was magical. Pupuan had zero tourists — just clove terraces and cool mountain air. Easiest full-day ride we did.",
    },
    {
      name: "James K.",
      text: "Botanical garden was lush and the roads north of Bedugul are smooth. Guide adjusted Tamblingan track when it looked wet. Felt very safe.",
    },
    {
      name: "Annika R.",
      text: "Greenest tour in Bali, hands down. Taman Ayun moat gardens and the lake temple — photos do not do it justice. Highly recommend.",
    },
  ],
  "tanah-lot-bedugul-explorer": [
    {
      name: "Sarah M.",
      text: "Tanah Lot at dawn, then Jatiluwih UNESCO terraces — this route hits every landscape in one day. Sarong provided, no hassle at temples.",
    },
    {
      name: "James K.",
      text: "Puri Kerambitan was the surprise — a real palace with almost no crowds. Perfect for first-time Bali riders; roads were excellent.",
    },
    {
      name: "Annika R.",
      text: "Our guide timed Tanah Lot perfectly before the rush. Jatiluwih walk was peaceful. Best overview tour if you only have one full day.",
    },
  ],
  "denpasar-tanah-lot-nusa-dua": [
    {
      name: "Sarah M.",
      text: "Perfect half-day intro — Denpasar monuments, Tanah Lot stop, then Nusa Dua coastline. Finished by lunch with energy to spare.",
    },
    {
      name: "James K.",
      text: "Rode pillion as a beginner and felt completely comfortable. Relaxed pace, great briefing, iconic temple photos at Tanah Lot.",
    },
    {
      name: "Annika R.",
      text: "Short on time but wanted the Harley experience — this tour delivered. Smooth roads, cultural stops, and a refined finish at Nusa Dua.",
    },
  ],
  "custom-tour": [
    {
      name: "Sarah M.",
      text: "WhatsApp planning was fast — we combined Sidemen valley and a coastal sunset in one custom loop. Guide adapted stops on the fly.",
    },
    {
      name: "James K.",
      text: "Second visit to Bali — wanted waterfalls and East Bali coast. They built a 10-hour route that matched our skill level perfectly.",
    },
    {
      name: "Annika R.",
      text: "Private group of four, flexible departure, no rigid schedule. Felt exclusive and well organized. Best way to see hidden Bali.",
    },
  ],
};

export function getTourReviews(slug: string): TourReview[] {
  return (
    reviews[slug] ?? [
      {
        name: "Sarah M.",
        text: "Outstanding guided ride with premium bikes and a knowledgeable local guide. Would book again.",
      },
      {
        name: "James K.",
        text: "Safe pacing, beautiful stops, and seamless WhatsApp booking. Highlight of our Bali trip.",
      },
      {
        name: "Annika R.",
        text: "Professional from pickup to return. Scenic roads and zero logistics stress on our side.",
      },
    ]
  );
}
