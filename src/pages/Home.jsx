// src/pages/Home.jsx
import HomeMosaic from "../components/home/HomeMosaic";
import Seo from "../components/seo/Seo";
import { hotel } from "../data/hotel";
import { useLang } from "../i18n";

const text = {
  fr: {
    title: "Résidence Nanan | Hôtel et résidence à Abidjan",
    description:
      "Séjournez à la Résidence Nanan, à Abidjan : chambres confortables, spa, bar-cafétéria et services. Réservez en ligne.",
  },
  en: {
    title: "Résidence Nanan | Hotel and residence in Abidjan",
    description:
      "Stay at Résidence Nanan in Abidjan: comfortable rooms, spa, bar & café and services. Book online.",
  },
};

export default function Home() {
  const lang = useLang();
  const site = hotel.siteUrl.replace(/\/$/, "");

  // Données structurées : permet à Google d'afficher l'hôtel avec ses infos (adresse, téléphone...)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    url: `${site}/${lang}`,
    image: site + hotel.ogImage,
    telephone: hotel.phone,
    email: hotel.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abidjan",
      addressCountry: "CI",
    },
    sameAs: hotel.socials.map((s) => s.url),
  };

  return (
    <>
      <Seo raw title={text[lang].title} description={text[lang].description} schema={schema} />
      <HomeMosaic />
    </>
  );
}