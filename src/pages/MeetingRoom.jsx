// src/pages/MeetingRoom.jsx
// Détail d'une salle de réunion : /fr/reunions/salle-rdc, /en/reunions/salle-etage
// (les données sont dans pages.js, bloc `reunions`)
import { Link, useParams } from "react-router-dom";
import { pages } from "../data/pages";
import { tr, useLang, useT } from "../i18n";
import RoomGallery from "../components/rooms/RoomGallery";
import RatesBox from "../components/ui/RatesBox";
import Seo from "../components/seo/Seo";

export default function MeetingRoom() {
  const { slug } = useParams();
  const lang = useLang();
  const t = useT();
  const parent = pages.reunions;
  const room = parent.tiles.find((tile) => tile.slug === slug);

  if (!room) {
    return (
      <section className="px-6 pb-20 pt-[160px] text-center">
        <h1 className="text-3xl font-bold text-nanan-green-dark">{t("meetingRoomNotFound")}</h1>
        <Link to={`/${lang}/reunions`} className="mt-6 inline-block text-nanan-orange underline">
          {tr(parent.title, lang)}
        </Link>
      </section>
    );
  }

  const title = tr(room.title, lang);
  const others = parent.tiles.filter((tile) => tile.slug !== slug);

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={title} description={tr(room.text, lang)} image={room.images[0]} />
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> /{" "}
          <Link to={`/${lang}/reunions`} className="hover:text-nanan-orange">{tr(parent.title, lang)}</Link> / {title}
        </p>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <RoomGallery key={room.slug} images={room.images} alt={title} />

            <h1 className="mt-10 text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-4xl">
              {title}
            </h1>
            <div className="my-6 h-0.5 w-16 bg-nanan-orange" />
            <p className="text-lg leading-relaxed text-gray-700">{tr(room.text, lang)}</p>

            {parent.items && (
              <>
                <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">
                  {t("amenities")}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tr(parent.items, lang).map((it) => (
                    <li key={it} className="flex items-center gap-3 text-gray-700">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-nanan-orange" />
                      {it}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {parent.rates && <RatesBox rates={parent.rates} className="mt-10" />}
          </div>

          <aside className="h-fit bg-nanan-cream p-6 lg:sticky lg:top-[120px]">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">{t("size")}</dt><dd>{room.size} m²</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("capacity")}</dt><dd className="text-right">{tr(room.capacity, lang)}</dd></div>
            </dl>
            <Link
              to={`/${lang}/contact`}
              className="mt-8 block rounded-sm bg-nanan-orange py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green"
            >
              {t("askQuote")}
            </Link>
          </aside>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-nanan-green-dark">
            {t("discoverAlso")}
          </h2>
          <div className="mx-auto mt-8 max-w-3xl">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/${lang}/reunions/${o.slug}`}
                className="group relative block aspect-[16/7] overflow-hidden bg-nanan-green"
              >
                <img
                  src={o.images[0]}
                  alt=""
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-nanan-green/60">
                  {tr(o.title, lang)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
