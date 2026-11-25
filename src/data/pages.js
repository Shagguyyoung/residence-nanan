// src/data/pages.js
// Pages d'information : /fr/restaurant, /fr/bar-lounge, /fr/piscine, /fr/reunions
// (Les chambres et suites sont dans rooms.js.)
// ⚠️ Textes d'EXEMPLE : remplace-les par les vrais contenus (en français ET en anglais).
// Photos : public/images/pages/<slug>/1.jpg, 2.jpg, 3.jpg ...
// `items` = petite liste à puces (facultatif). `cta` = bouton d'action (facultatif) : `path` pour une page du site, `url` pour un lien externe.

const photos = (slug, n = 1) /* nombre de photos : augmente-le quand tu ajoutes 2.jpg, 3.jpg… */ =>
  Array.from({ length: n }, (_, i) => `/images/pages/${slug}/${i + 1}.jpg`);

export const pages = {
  hotel: {
    title: { fr: "L'hôtel", en: "The hotel" },
    tagline: { fr: "Bienvenue à la Résidence Nanan", en: "Welcome to Résidence Nanan" },
    intro: {
      fr: "Présentation générale de la résidence : son histoire, son emplacement et ce qui la rend unique.",
      en: "General presentation of the residence: its story, its location and what makes it unique.",
    },
    sections: [
      {
        title: { fr: "Notre histoire", en: "Our story" },
        text: {
          fr: "Texte à remplacer : l'origine du nom « Nanan », la vision de la résidence.",
          en: "Text to be replaced: the origin of the name “Nanan”, the vision of the residence.",
        },
      },
      {
        title: { fr: "Son emplacement", en: "Location" },
        text: {
          fr: "Texte à remplacer : le quartier, la proximité des lieux importants à Abidjan.",
          en: "Text to be replaced: the neighbourhood, proximity to key places in Abidjan.",
        },
      },
    ],
    items: {
      fr: ["Wi-Fi gratuit", "Climatisation", "Réception", "Parking", "Sécurité"],
      en: ["Free Wi-Fi", "Air conditioning", "Reception", "Parking", "Security"],
    },
    images: photos("hotel"),
  },

  restaurant: {
    title: { fr: "Restaurant", en: "Restaurant" },
    tagline: { fr: "Cuisine bistronomique franco-ivoirienne", en: "French-Ivorian bistronomic cuisine" },
    intro: {
      fr: "Le restaurant de la Résidence Nanan vous accueille tous les jours, du petit-déjeuner au dîner, autour d'une cuisine bistronomique franco-ivoirienne et d'une partie snacking.",
      en: "The Résidence Nanan restaurant welcomes you every day, from breakfast to dinner, with French-Ivorian bistronomic cuisine and a snack menu.",
    },
    // À ajouter quand la carte sera prête : les spécialités et le menu.
    sections: [
      {
        title: { fr: "La cuisine", en: "The cuisine" },
        text: {
          fr: "Une cuisine bistronomique franco-ivoirienne, complétée par une partie snacking.",
          en: "French-Ivorian bistronomic cuisine, complemented by snacks.",
        },
      },
      {
        title: { fr: "Horaires", en: "Opening hours" },
        text: {
          fr: "Ouvert 7j/7.\nPetit-déjeuner : de 7h à 11h30.\nService continu : de 11h30 à 22h30.",
          en: "Open 7 days a week.\nBreakfast: 7:00 am to 11:30 am.\nAll-day service: 11:30 am to 10:30 pm.",
        },
      },
      {
        title: { fr: "Capacité", en: "Seating" },
        text: {
          fr: "20 couverts, en intérieur ou en extérieur.",
          en: "20 seats, indoors or outdoors.",
        },
      },
      {
        title: { fr: "Réservation", en: "Booking" },
        text: {
          fr: "Réservation conseillée.",
          en: "Booking recommended.",
        },
      },
    ],
    cta: { label: { fr: "Réserver une table", en: "Book a table" }, path: "contact" },
    images: photos("restaurant"),
  },

  "bar-lounge": {
    title: { fr: "NananBar", en: "NananBar" },
    tagline: { fr: "Bar-lounge", en: "Lounge bar" },
    intro: {
      fr: "Le NananBar, bar-lounge de la Résidence Nanan, vous accueille du petit-déjeuner jusqu'en soirée. Les personnes extérieures à la résidence y sont aussi les bienvenues.",
      en: "NananBar, the lounge bar of Résidence Nanan, welcomes you from breakfast until the evening. Guests not staying at the residence are welcome too.",
    },
    sections: [
      {
        title: { fr: "Horaires", en: "Opening hours" },
        text: {
          fr: "De 7h à 22h30.\nPetit-déjeuner : de 7h à 11h30.\nService continu : à partir de 11h30.",
          en: "7:00 am to 10:30 pm.\nBreakfast: 7:00 am to 11:30 am.\nAll-day service: from 11:30 am.",
        },
      },
      {
        title: { fr: "Restauration", en: "Food" },
        text: {
          fr: "Petit-déjeuner, déjeuner et dîner.",
          en: "Breakfast, lunch and dinner.",
        },
      },
      {
        title: { fr: "Capacité", en: "Capacity" },
        text: {
          fr: "Environ 20 personnes, bar et piscine compris.",
          en: "Around 20 people, including the bar and pool.",
        },
      },
    ],
    items: {
      fr: ["Softs", "Mocktails et cocktails", "Bières", "Vins", "Spiritueux"],
      en: ["Soft drinks", "Mocktails and cocktails", "Beers", "Wines", "Spirits"],
    },
    rates: {
      title: { fr: "Accès et privatisation", en: "Access and private hire" },
      items: {
        fr: ["Personnes extérieures : forfait de 10 000 FCFA, une consommation incluse"],
        en: ["Non-residents: 10,000 FCFA package, one drink included"],
      },
      note: {
        fr: "Privatisation possible après validation d'un devis.",
        en: "Private hire available once a quote has been approved.",
      },
    },
    images: photos("bar-lounge"),
  },

  piscine: {
    title: { fr: "Piscine", en: "Pool" },
    tagline: { fr: "Détente et fraîcheur toute l'année", en: "Relaxation and freshness all year round" },
    intro: {
      fr: "Présentation de la piscine : dimensions, espace détente et horaires d'accès.",
      en: "Presentation of the pool: size, relaxation area and opening hours.",
    },
    sections: [
      {
        title: { fr: "L'espace piscine", en: "The pool area" },
        text: {
          fr: "Texte à remplacer : description de la piscine, des transats et de l'espace autour.",
          en: "Text to be replaced: description of the pool, sun loungers and surrounding area.",
        },
      },
    ],
    items: {
      fr: ["Transats", "Serviettes", "Accès au NananBar"],
      en: ["Sun loungers", "Towels", "Access to NananBar"],
    },
    images: photos("piscine"),
  },

  reunions: {
    title: { fr: "Salles de réunion", en: "Meeting rooms" },
    tagline: { fr: "2 salles pour vos événements professionnels", en: "2 rooms for your business events" },
    intro: {
      fr: "La Résidence Nanan met à votre disposition deux salles pour vos réunions et rencontres professionnelles : l'une au rez-de-chaussée, l'autre à l'étage.",
      en: "Résidence Nanan offers two rooms for your meetings and business gatherings: one on the ground floor, the other upstairs.",
    },
    // Une tuile par salle, qui ouvre sa page : /fr/reunions/<slug>
    // Photos : public/images/pages/reunions/salle-rdc/1.jpg et salle-etage/1.jpg
    // (sans photo, la tuile garde une couleur de la charte)
    tiles: [
      {
        slug: "salle-rdc",
        title: { fr: "Salle RDC", en: "Ground-floor room" },
        size: 35, // m²
        capacity: { fr: "environ 15 personnes", en: "around 15 people" },
        text: {
          fr: "Située au rez-de-chaussée, cette salle de 35 m² accueille environ 15 personnes pour vos réunions et rencontres professionnelles.",
          en: "Located on the ground floor, this 35 m² room accommodates around 15 people for your meetings and business gatherings.",
        },
        images: photos("reunions/salle-rdc"),
      },
      {
        slug: "salle-etage",
        title: { fr: "Salle Étage", en: "Upstairs room" },
        size: 40, // m²
        capacity: { fr: "environ 10 personnes", en: "around 10 people" },
        text: {
          fr: "Située à l'étage, cette salle de 40 m² accueille environ 10 personnes pour vos réunions et rencontres professionnelles.",
          en: "Located upstairs, this 40 m² room accommodates around 10 people for your meetings and business gatherings.",
        },
        images: photos("reunions/salle-etage"),
      },
    ],
    items: {
      fr: ["Écran dans chaque salle", "Vidéoprojecteur dans chaque salle", "Internet avec fibre", "Climatisation"],
      en: ["Screen in each room", "Projector in each room", "Fibre internet", "Air conditioning"],
    },
    rates: {
      title: { fr: "Tarifs et formules de location", en: "Rates and rental options" },
      items: {
        fr: ["Gratuit pour les groupes profitant du service de restauration"],
        en: ["Free for groups using our catering service"],
      },
      note: {
        fr: "Toutes les demandes peuvent être réalisées sur devis.",
        en: "All requests can be arranged on a quote basis.",
      },
    },
    // Pas de galerie en haut de page : les photos sont sur les tuiles. `cover` sert au partage (WhatsApp, Facebook).
    cover: "/images/pages/reunions/1.jpg",
  },
};