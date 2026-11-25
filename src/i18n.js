// src/i18n.js
// Mini système de traduction, sans librairie.
// - Les textes des données sont des objets { fr: "...", en: "..." } lus avec tr(valeur, lang)
// - Les petits textes d'interface (boutons, titres fixes) sont dans `ui` ci-dessous, lus avec t("clé")
import { useParams } from "react-router-dom";

export const SUPPORTED = ["fr", "en"];

// Langue courante, prise dans l'adresse (/fr/..., /en/...). Retombe sur "fr" si inconnue.
export function useLang() {
  const { lang = "fr" } = useParams();
  return SUPPORTED.includes(lang) ? lang : "fr";
}

// Choisit la bonne langue dans { fr, en }. Si la traduction manque, on affiche le français.
export function tr(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[lang] ?? value.fr;
  }
  return value;
}

const ui = {
  menu: { fr: "MENU", en: "MENU" },
  book: { fr: "RÉSERVER", en: "BOOK NOW" },
  openMenu: { fr: "Ouvrir le menu", en: "Open menu" },
  closeMenu: { fr: "Fermer le menu", en: "Close menu" },
  watchVideo: { fr: "Voir la vidéo de présentation", en: "Watch the presentation video" },
  videoTitle: { fr: "Vidéo de présentation", en: "Presentation video" },
  closeVideo: { fr: "Fermer la vidéo", en: "Close video" },
  videoUnsupported: { fr: "Votre navigateur ne peut pas lire cette vidéo.", en: "Your browser cannot play this video." },
  home: { fr: "Accueil", en: "Home" },
  backHome: { fr: "Retour à l'accueil", en: "Back to home" },
  roomNotFound: { fr: "Chambre introuvable", en: "Room not found" },
  meetingRoomNotFound: { fr: "Salle introuvable", en: "Meeting room not found" },
  askQuote: { fr: "Demander un devis", en: "Request a quote" },
  pageNotFound: { fr: "Page introuvable", en: "Page not found" },
  amenities: { fr: "Équipements", en: "Amenities" },
  fromPrice: { fr: "À partir de", en: "From" },
  perNight: { fr: "/ nuit", en: "/ night" },
  breakfastIncluded: { fr: "Petit-déjeuner inclus", en: "Breakfast included" },
  capacity: { fr: "Capacité", en: "Capacity" },
  guests: { fr: "personnes", en: "guests" },
  size: { fr: "Surface", en: "Size" },
  outdoorSize: { fr: "Extérieur", en: "Outdoor area" },
  bed: { fr: "Couchage", en: "Bed" },
  bookRoom: { fr: "Réserver cette chambre", en: "Book this room" },
  discoverAlso: { fr: "Découvrez aussi", en: "Discover also" },
  prevPhoto: { fr: "Photo précédente", en: "Previous photo" },
  nextPhoto: { fr: "Photo suivante", en: "Next photo" },
  photo: { fr: "photo", en: "photo" },
  seePhoto: { fr: "Voir la photo", en: "View photo" },
  close: { fr: "Fermer", en: "Close" },
  viewDetails: { fr: "Voir les détails", en: "View details" },
  classicRooms: { fr: "Chambres premiums", en: "Premium rooms" },
  legal: { fr: "Mentions légales", en: "Legal notice" },
  privacy: { fr: "Politique de confidentialité", en: "Privacy policy" },
};

// Utilisation dans un composant :  const t = useT();  t("book")
export function useT() {
  const lang = useLang();
  return (key) => ui[key]?.[lang] ?? ui[key]?.fr ?? key;
}