// src/pages/Rooms.jsx
// Liste des 6 chambres premium : /fr/chambres  (chaque carte mène au détail)
import { Link } from "react-router-dom";
import { classicRooms } from "../data/rooms";
import { useLang, useT } from "../i18n";
import RoomCard from "../components/rooms/RoomCard";
import Seo from "../components/seo/Seo";

const text = {
  fr: {
    title: "Chambres premiums",
    tagline: "6 chambres confortables pour votre séjour",
    intro: "Choisissez votre chambre et découvrez ses photos, ses équipements et son tarif.",
  },
  en: {
    title: "Premium rooms",
    tagline: "6 comfortable rooms for your stay",
    intro: "Choose your room and discover its photos, amenities and rate.",
  },
};

export default function Rooms() {
  const lang = useLang();
  const t = useT();
  const c = text[lang];

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={c.title} description={`${c.tagline}. ${c.intro}`} image="/images/pages/chambres/1.jpg" />
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> / {c.title}
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-3 text-nanan-orange">{c.tagline}</p>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
          <p className="text-lg leading-relaxed text-gray-700">{c.intro}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {classicRooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}