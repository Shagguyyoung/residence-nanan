// src/data/rooms.js
// Données réelles des chambres et suites (noms, surfaces, prix, équipements).
// Chaque texte existe en { fr, en }.
//
// Adresses des pages :
//   /fr/chambres                 -> liste des 6 chambres premium
//   /fr/chambres/chambre-1 ...   -> détail d'une chambre premium
//   /fr/suite-junior, /fr/suite-senior
//
// Photos de chaque chambre : public/images/pages/chambres/chambre-1/1.jpg (puis 2.jpg, 3.jpg…)
// Photo de couverture de la tuile d'accueil : public/images/pages/chambres/1.jpg

const photos = (folder, n = 1) /* nombre de photos : augmente-le quand tu ajoutes 2.jpg, 3.jpg… */ =>
  Array.from({ length: n }, (_, i) => `/images/pages/${folder}/${i + 1}.jpg`);

const classicAmenities = {
  fr: ["Climatisation", "Internet avec fibre", "Bouquet TV", "Room-service", "Accès piscine"],
  en: ["Air conditioning", "Fibre internet", "TV channel package", "Room service", "Pool access"],
};

// Valeurs communes aux chambres premium. Une fiche ci-dessous peut remplacer n'importe laquelle :
//   premium(3, { price: 30000, size: 25, name: { fr: "...", en: "..." }, description: { ... } })
const premium = (n, fiche) => ({
  slug: `chambre-${n}`,
  path: `chambres/chambre-${n}`,
  group: "classic", // identifiant interne, ne s'affiche pas
  name: { fr: `Chambre ${n}`, en: `Room ${n}` },
  tagline: { fr: "Chambre premium", en: "Premium room" },
  price: 65000, // FCFA par nuit, petit-déjeuner inclus
  capacity: 2,
  size: 22, // m²
  bed: { fr: "1 lit king size", en: "1 king-size bed" },
  amenities: classicAmenities,
  images: photos(`chambres/chambre-${n}`),
  ...fiche,
});

// Équipement propre à une chambre (baignoire, terrasse), affiché avant les équipements communs.
const withExtras = (...extras) => ({
  fr: [...extras.map((e) => e.fr), ...classicAmenities.fr],
  en: [...extras.map((e) => e.en), ...classicAmenities.en],
});
const BATHTUB = { fr: "Baignoire", en: "Bathtub" };
const TERRACE = { fr: "Terrasse privatisée", en: "Private terrace" };

// Noms, surfaces, capacités, lits, équipements : données réelles.
export const classicRooms = [
  premium(1, {
    name: { fr: "Amon N'Douffou", en: "Amon N'Douffou" },
    size: 47,
    amenities: withExtras(TERRACE),
    description: {
      fr: "Avec ses 47 m², la chambre Amon N'Douffou offre un bel espace pour deux personnes. Son lit king size invite au repos, que vous soyez de passage ou en long séjour.",
      en: "With its 47 m², the Amon N'Douffou room offers generous space for two guests. Its king-size bed invites you to rest, whether you are passing through or staying longer.",
    },
  }),
  premium(2, {
    name: { fr: "Tom Daté", en: "Tom Daté" },
    size: 23,
    description: {
      fr: "La chambre Tom Daté réunit l'essentiel dans 23 m² : un espace à taille humaine et un lit king size, pour un séjour simple et reposant à une ou deux personnes.",
      en: "The Tom Daté room brings the essentials together in 23 m²: a comfortably sized space and a king-size bed, for a simple, restful stay for one or two guests.",
    },
  }),
  premium(3, {
    name: { fr: "Oben Aka", en: "Oben Aka" },
    size: 34,
    description: {
      fr: "La chambre Oben Aka accueille deux personnes dans 34 m². Son lit king size et ses volumes bien proportionnés en font une adresse confortable pour quelques nuits ou plus.",
      en: "The Oben Aka room welcomes two guests in 34 m². Its king-size bed and well-proportioned space make it a comfortable base for a few nights or more.",
    },
  }),
  premium(4, {
    name: { fr: "Opoku Ware", en: "Opoku Ware" },
    size: 31,
    amenities: withExtras(BATHTUB),
    description: {
      fr: "La chambre Opoku Ware propose 31 m² bien équilibrés, un lit king size et une baignoire pour se détendre en fin de journée. Elle accueille deux personnes.",
      en: "The Opoku Ware room offers a well-balanced 31 m², a king-size bed and a bathtub to unwind in at the end of the day. It sleeps two guests.",
    },
  }),
  premium(5, {
    name: { fr: "Yaa Asantewaa", en: "Yaa Asantewaa" },
    size: 43,
    amenities: withExtras(BATHTUB, TERRACE),
    description: {
      fr: "Lit king size, baignoire et terrasse : sur 43 m², la chambre Yaa Asantewaa permet à deux personnes de profiter du dedans comme du dehors.",
      en: "King-size bed, bathtub and terrace: across 43 m², the Yaa Asantewaa room lets two guests enjoy both indoors and outdoors.",
    },
  }),
  premium(6, {
    name: { fr: "Ano Kpangui", en: "Ano Kpangui" },
    size: 53,
    amenities: withExtras(TERRACE),
    description: {
      fr: "La plus spacieuse de nos chambres premium : 53 m², un lit king size et une terrasse. La chambre Ano Kpangui donne à deux personnes toute la place de s'installer.",
      en: "The largest of our premium rooms: 53 m², a king-size bed and a terrace. The Ano Kpangui room gives two guests plenty of space to settle in.",
    },
  }),
];

export const suites = [
  {
    slug: "suite-junior",
    path: "suite-junior",
    group: "suite",
    name: { fr: "Suite junior Osei Tutu I", en: "Osei Tutu I Junior Suite" },
    tagline: { fr: "Suite junior", en: "Junior suite" },
    description: {
      fr: "Dans ses 42 m², la suite junior Osei Tutu I associe un lit king size et une baignoire. De quoi prendre son temps à deux, du bain du soir au réveil.",
      en: "Across 42 m², the Osei Tutu I junior suite pairs a king-size bed with a bathtub. A place for two to take their time, from an evening bath to the morning.",
    },
    price: 110000, // FCFA par nuit, petit-déjeuner inclus
    capacity: 2,
    size: 42,
    bed: { fr: "1 lit king size", en: "1 king-size bed" },
    amenities: withExtras(BATHTUB),
    images: photos("suite-junior"),
  },
  {
    slug: "suite-senior",
    path: "suite-senior",
    group: "suite",
    name: { fr: "Suite Senior Abla Poku", en: "Abla Poku Senior Suite" },
    tagline: { fr: "Suite Senior", en: "Senior Suite" },
    description: {
      fr: "La suite senior Abla Poku est le plus grand hébergement de la résidence : 65 m² à l'intérieur, prolongés par 55 m² à l'extérieur. Deux personnes y profitent d'un lit king size et de tout l'espace pour vivre dedans comme dehors.",
      en: "The Abla Poku senior suite is the largest accommodation at the residence: 65 m² indoors, extended by 55 m² outdoors. Two guests enjoy a king-size bed and plenty of space to live both inside and out.",
    },
    price: 130000, // FCFA par nuit, petit-déjeuner inclus
    capacity: 2,
    size: 65, // m² intérieurs
    outdoorSize: 55, // m² extérieurs
    bed: { fr: "1 lit king size", en: "1 king-size bed" },
    amenities: classicAmenities,
    images: photos("suite-senior"),
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