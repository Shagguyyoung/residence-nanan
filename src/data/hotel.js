// src/data/hotel.js
// ⚠️ Valeurs d'EXEMPLE : remplace par les vraies coordonnées de la résidence.

export const hotel = {
  name: "Résidence Nanan",

  // Adresse du site en ligne (sans « / » final). À remplacer par ton vrai nom de domaine.
  siteUrl: "https://www.residencenanan.com",
  // Image affichée quand on partage le site sur WhatsApp / Facebook (1200 x 630 px, dans public/images/)
  ogImage: "/images/og.jpg",
  phone: "+225 00 00 00 00 00",
  email: "contact@residencenanan.com",
  address: "Abidjan, Côte d'Ivoire",

  // Numéro WhatsApp : indicatif pays + numéro, sans « + » ni espaces (ex: 2250707070707)
  whatsapp: "2250000000000",

  // Texte cherché dans Google Maps pour afficher la carte (nom + quartier, ou adresse exacte)
  mapQuery: "Résidence Nanan, Abidjan, Côte d'Ivoire",

  // Adresse qui reçoit le formulaire (ex: https://formspree.io/f/xxxx ou ton API Laravel : https://api.tonsite.com/api/contact)
  // Laisse "" tant que ce n'est pas prêt : le formulaire ouvrira alors le mail du visiteur.
  contactEndpoint: "",

  socials: [
    { label: "Facebook", url: "https://facebook.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "WhatsApp", url: "https://wa.me/2250000000000" },
  ],
};