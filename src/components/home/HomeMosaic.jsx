// src/components/home/HomeMosaic.jsx
// Accueil en mosaïque : 8 tuiles cliquables + tuile logo au centre.
// Photos : public/images/pages/<page>/1.jpg  (si une photo manque, la tuile garde une couleur de la charte)
import { Link } from "react-router-dom";
import { tr, useLang } from "../../i18n";

// Placement desktop sur une grille 12 colonnes x 8 lignes.
const tiles = [
  { id: "logo", logo: true,
    mobile: "col-span-2", desktop: "lg:col-[5/9] lg:row-[3/6]" },

  { id: "chambres", label: { fr: "6 chambres premiums", en: "6 premium rooms" }, path: "chambres",
    image: "/images/pages/chambres/1.jpg", bg: "bg-nanan-green/25",
    mobile: "", desktop: "lg:col-[1/5] lg:row-[1/5]" },

  { id: "suite-junior", label: { fr: "Suite junior", en: "Junior suite" }, path: "suite-junior",
    image: "/images/pages/suite-junior/1.jpg", bg: "bg-nanan-orange/30",
    mobile: "", desktop: "lg:col-[5/9] lg:row-[1/3]" },

  { id: "suite-royale", label: { fr: "Suite Royale", en: "Royal Suite" }, path: "suite-royale",
    image: "/images/pages/suite-royale/1.jpg", bg: "bg-nanan-green/30",
    mobile: "", desktop: "lg:col-[9/13] lg:row-[1/5]" },

  { id: "reunions", label: { fr: "2 salles de réunion", en: "2 meeting rooms" }, path: "reunions",
    image: "/images/pages/reunions/1.jpg", bg: "bg-nanan-orange/25",
    mobile: "", desktop: "lg:col-[9/13] lg:row-[5/7]" },

  { id: "piscine", label: { fr: "Piscine", en: "Pool" }, path: "piscine",
    image: "/images/pages/piscine/1.jpg", bg: "bg-nanan-green/30",
    mobile: "", desktop: "lg:col-[9/13] lg:row-[7/9]" },

    { id: "hotel", label: { fr: "L'hôtel", en: "The hotel" }, path: "hotel",
  image: "/images/pages/hotel/1.jpg", bg: "bg-nanan-green/25",
  mobile: "", desktop: "lg:col-[1/5] lg:row-[5/7]" },

  { id: "restaurant", label: { fr: "Restaurant", en: "Restaurant" }, path: "restaurant",
    image: "/images/pages/restaurant/1.jpg", bg: "bg-nanan-orange/30",
    mobile: "col-span-2", desktop: "lg:col-[1/5] lg:row-[7/9]" },

  { id: "bar-lounge", label: { fr: "Bar-lounge", en: "Lounge bar" }, path: "bar-lounge",
    image: "/images/pages/bar-lounge/1.jpg", bg: "bg-nanan-green/25",
    mobile: "col-span-2", desktop: "lg:col-[5/9] lg:row-[6/9]" },
];

function Tile({ tile, lang }) {
  const base = `${tile.mobile} ${tile.desktop}`;

  if (tile.logo) {
    return (
      <div className={`${base} flex items-center justify-center bg-white p-4`}>
        <img
          src="/images/logo.jpeg"
          alt="Résidence Nanan"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <Link
      to={`/${lang}/${tile.path}`}
      className={`${base} ${tile.bg} group relative block overflow-hidden`}
    >
      <img
        src={tile.image}
        alt=""
        loading="lazy"
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25 px-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:bg-nanan-green/60 sm:text-sm lg:text-base">
        {tr(tile.label, lang)}
      </span>
    </Link>
  );
}

export default function HomeMosaic() {
  const lang = useLang();

  return (
    <section className="bg-white p-2 pt-[80px] sm:pt-[88px] lg:pt-[104px]">
      <div className="grid grid-cols-2 auto-rows-[42vw] gap-2 sm:auto-rows-[30vw] lg:h-[calc(100svh-112px)] lg:min-h-[640px] lg:grid-cols-12 lg:grid-rows-8 lg:auto-rows-auto">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} lang={lang} />
        ))}
      </div>
    </section>
  );
}
