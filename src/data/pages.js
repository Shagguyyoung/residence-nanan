// src/data/pages.js
// Pages d'information : /fr/restaurant, /fr/bar-lounge, /fr/piscine, /fr/reunions
// (Les chambres et suites sont dans rooms.js.)
// ⚠️ Textes d'EXEMPLE : remplace-les par les vrais contenus (en français ET en anglais).
// Photos : public/images/pages/<slug>/1.jpg, 2.jpg, 3.jpg ...
// `items` = petite liste à puces (facultatif). `cta` = bouton d'action (facultatif).

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
    tagline: { fr: "Une cuisine à savourer", en: "Cuisine to savour" },
    intro: {
      fr: "Présentation du restaurant : la cuisine, l'ambiance et les horaires de service.",
      en: "Presentation of the restaurant: the cuisine, the atmosphere and service hours.",
    },
    sections: [
      {
        title: { fr: "La cuisine", en: "The cuisine" },
        text: {
          fr: "Texte à remplacer : spécialités, produits locaux, petit-déjeuner, déjeuner et dîner.",
          en: "Text to be replaced: specialities, local produce, breakfast, lunch and dinner.",
        },
      },
      {
        title: { fr: "Horaires", en: "Opening hours" },
        text: {
          fr: "Texte à remplacer : horaires du petit-déjeuner, du déjeuner et du dîner.",
          en: "Text to be replaced: breakfast, lunch and dinner hours.",
        },
      },
    ],
    images: photos("restaurant"),
  },

  "bar-lounge": {
    title: { fr: "Bar-lounge", en: "Poolside lounge bar" },
    tagline: { fr: "Un moment de détente au bord de la piscine", en: "A moment of relaxation by the pool" },
    intro: {
      fr: "Présentation du bar-lounge : l'ambiance, les cocktails, les boissons et les horaires d'ouverture.",
      en: "Presentation of the poolside lounge bar: the atmosphere, cocktails, drinks and opening hours.",
    },
    sections: [
      {
        title: { fr: "L'ambiance", en: "The atmosphere" },
        text: {
          fr: "Texte à remplacer : décris le lieu, la décoration, ce qu'on y ressent.",
          en: "Text to be replaced: describe the place, the decor and the feeling.",
        },
      },
    ],
    items: {
      fr: ["Cocktails", "Boissons fraîches et chaudes", "Snacks et plats légers"],
      en: ["Cocktails", "Cold and hot drinks", "Snacks and light meals"],
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
      fr: ["Transats", "Serviettes", "Accès au bar-lounge"],
      en: ["Sun loungers", "Towels", "Access to the lounge bar"],
    },
    images: photos("piscine"),
  },

  reunions: {
    title: { fr: "Salles de réunion", en: "Meeting rooms" },
    tagline: { fr: "2 salles pour vos événements professionnels", en: "2 rooms for your business events" },
    intro: {
      fr: "Présentation des deux salles de réunion : capacité, équipements et services associés.",
      en: "Presentation of the two meeting rooms: capacity, equipment and related services.",
    },
    sections: [
      {
        title: { fr: "Nos salles", en: "Our rooms" },
        text: {
          fr: "Texte à remplacer : capacité de chaque salle, configurations possibles (théâtre, U, tables).",
          en: "Text to be replaced: capacity of each room, possible layouts (theatre, U-shape, tables).",
        },
      },
    ],
    items: {
      fr: ["Vidéoprojecteur", "Wi-Fi", "Climatisation", "Pauses café", "Restauration sur demande"],
      en: ["Projector", "Wi-Fi", "Air conditioning", "Coffee breaks", "Catering on request"],
    },
    images: photos("reunions"),
  },
};