// src/data/rooms.js
// ⚠️ Données d'EXEMPLE : remplace noms, descriptions, prix, surfaces, équipements par les vraies.
// Chaque texte existe en { fr, en }.
//
// Adresses des pages :
//   /fr/chambres                 -> liste des 6 chambres classiques
//   /fr/chambres/chambre-1 ...   -> détail d'une chambre classique
//   /fr/suite-junior, /fr/suite-royale
//
// Photos de chaque chambre : public/images/pages/chambres/chambre-1/1.jpg (puis 2.jpg, 3.jpg…)
// Photo de couverture de la tuile d'accueil : public/images/pages/chambres/1.jpg

const photos = (folder, n = 1) /* nombre de photos : augmente-le quand tu ajoutes 2.jpg, 3.jpg… */ =>
  Array.from({ length: n }, (_, i) => `/images/pages/${folder}/${i + 1}.jpg`);

const classicAmenities = {
  fr: ["Climatisation", "Wi-Fi gratuit", "Télévision", "Salle de bain privée", "Eau chaude", "Bureau"],
  en: ["Air conditioning", "Free Wi-Fi", "Television", "Private bathroom", "Hot water", "Desk"],
};

// Fabrique une chambre classique. Pour personnaliser UNE chambre, passe un objet en 2e argument :
//   classic(3, { price: 30000, size: 25, description: { fr: "...", en: "..." } })
const classic = (n, overrides = {}) => ({
  slug: `chambre-${n}`,
  path: `chambres/chambre-${n}`,
  group: "classic",
  name: { fr: `Chambre ${n}`, en: `Room ${n}` },
  tagline: { fr: "Chambre premium", en: "premium room" },
  description: {
    fr: "Une chambre lumineuse et confortable pensée pour se reposer après une journée à Abidjan. Description à remplacer par le vrai texte de cette chambre.",
    en: "A bright and comfortable room designed to rest after a day in Abidjan. Description to be replaced with the real text for this room.",
  },
  price: 25000, // FCFA par nuit (exemple)
  capacity: 2,
  size: 22, // m²
  bed: { fr: "1 lit double", en: "1 double bed" },
  amenities: classicAmenities,
  images: photos(`chambres/chambre-${n}`),
  ...overrides,
});

export const classicRooms = [1, 2, 3, 4, 5, 6].map((n) => classic(n));

export const suites = [
  {
    slug: "suite-junior",
    path: "suite-junior",
    group: "suite",
    name: { fr: "Suite junior", en: "Junior suite" },
    tagline: {
      fr: "Un salon et une chambre, en un seul espace",
      en: "A living area and a bedroom in one space",
    },
    description: {
      fr: "Une suite avec un coin salon séparé, idéale pour un séjour plus long ou en famille. Description à remplacer.",
      en: "A suite with a separate living area, ideal for a longer stay or for families. Description to be replaced.",
    },
    price: 55000,
    capacity: 3,
    size: 40,
    bed: { fr: "1 lit king size + canapé-lit", en: "1 king-size bed + sofa bed" },
    amenities: {
      fr: ["Climatisation", "Wi-Fi gratuit", "Télévision écran plat", "Salle de bain privée", "Mini-bar", "Coin salon", "Balcon"],
      en: ["Air conditioning", "Free Wi-Fi", "Flat-screen TV", "Private bathroom", "Mini-bar", "Living area", "Balcony"],
    },
    images: photos("suite-junior"),
  },
  {
    slug: "suite-royale",
    path: "suite-royale",
    group: "suite",
    name: { fr: "Suite Royale", en: "Royal Suite" },
    tagline: {
      fr: "Notre hébergement le plus prestigieux",
      en: "Our most prestigious accommodation",
    },
    description: {
      fr: "La plus grande et la plus raffinée de nos suites, avec salon indépendant et prestations haut de gamme. Description à remplacer.",
      en: "The largest and most refined of our suites, with a separate living room and premium services. Description to be replaced.",
    },
    price: 90000,
    capacity: 4,
    size: 70,
    bed: { fr: "1 lit king size + salon", en: "1 king-size bed + living room" },
    amenities: {
      fr: ["Climatisation", "Wi-Fi gratuit", "Télévision écran plat", "Salle de bain de luxe", "Mini-bar", "Grand salon", "Balcon"],
      en: ["Air conditioning", "Free Wi-Fi", "Flat-screen TV", "Luxury bathroom", "Mini-bar", "Large living room", "Balcony"],
    },
    images: photos("suite-royale"),
  },
];

export const rooms = [...classicRooms, ...suites];

export const getRoom = (slug) => rooms.find((r) => r.slug === slug);

// Autres hébergements proposés en bas d'une page chambre ("Découvrez aussi")
export const getRelated = (room) =>
  room.group === "classic"
    ? suites
    : [
        ...suites.filter((s) => s.slug !== room.slug),
        {
          slug: "chambres",
          path: "chambres",
          name: { fr: "Chambres premiums", en: "Premium rooms" },
          images: ["/images/pages/chambres/1.jpg"],
        },
      ];

// Types d'hébergement proposés dans le formulaire de contact
export const roomTypes = [
  {
    slug: "chambres",
    name: { fr: "Chambre premium", en: "Premium room" },
    price: classicRooms[0].price,
    capacity: classicRooms[0].capacity,
    images: ["/images/pages/chambres/1.jpg"],
  },
  ...suites,
];

export const formatPrice = (n, lang = "fr") =>
  new Intl.NumberFormat(lang === "en" ? "en-US" : "fr-FR").format(n) + " FCFA";