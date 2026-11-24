// src/data/navigation.js

export const languages = [
  { code: "fr", label: "FRA" },
  { code: "en", label: "ENG" },
];

export const bookingUrl = "https://exemple-reservation.com"; // à remplacer par ton lien ou ton formulaire

export const menuItems = [
  { label: { fr: "Accueil", en: "Home" }, path: "" },
  { label: { fr: "L'hôtel", en: "The hotel" }, path: "hotel" },
  { label: { fr: "Chambres premiums", en: "premiums rooms" }, path: "chambres" },
  { label: { fr: "Suite junior", en: "Junior suite" }, path: "suite-junior" },
  { label: { fr: "Suite Royale", en: "Royal Suite" }, path: "suite-royale" },
  { label: { fr: "Salles de réunion", en: "Meeting rooms" }, path: "reunions" },
  { label: { fr: "Piscine", en: "Pool" }, path: "piscine" },
  { label: { fr: "Restaurant", en: "Restaurant" }, path: "restaurant" },
  { label: { fr: "Bar-lounge", en: "Lounge bar" }, path: "bar-lounge" },
  { label: { fr: "Contact", en: "Contact" }, path: "contact" },
];