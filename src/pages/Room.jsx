// src/pages/Room.jsx
// Une seule page pour toutes les chambres : /fr/chambres/double, /en/chambres/superieure, ...
import { Link, useParams } from "react-router-dom";
import { formatPrice, getRelated, getRoom } from "../data/rooms";
import { tr, useLang, useT } from "../i18n";
import RoomGallery from "../components/rooms/RoomGallery";
import Seo from "../components/seo/Seo";

export default function Room({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const lang = useLang();
  const t = useT();
  const room = getRoom(slug);

  if (!room) {
    return (
      <section className="px-6 pb-20 pt-[160px] text-center">
        <h1 className="text-3xl font-bold text-nanan-green-dark">{t("roomNotFound")}</h1>
        <Link to={`/${lang}`} className="mt-6 inline-block text-nanan-orange underline">
          {t("backHome")}
        </Link>
      </section>
    );
  }

  const name = tr(room.name, lang);
  const others = getRelated(room);

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={name} description={tr(room.description, lang)} image={room.images[0]} />
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> /{" "}
          {room.group === "classic" && (
            <>
              <Link to={`/${lang}/chambres`} className="hover:text-nanan-orange">{t("classicRooms")}</Link> /{" "}
            </>
          )}
          {name}
        </p>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <RoomGallery images={room.images} alt={name} />

            <h1 className="mt-10 text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-4xl">
              {name}
            </h1>
            <p className="mt-2 text-nanan-orange">{tr(room.tagline, lang)}</p>
            <div className="my-6 h-0.5 w-16 bg-nanan-orange" />
            <p className="text-lg leading-relaxed text-gray-700">{tr(room.description, lang)}</p>

            <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">
              {t("amenities")}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {tr(room.amenities, lang).map((a) => (
                <li key={a} className="flex items-center gap-3 text-gray-700">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-nanan-orange" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit bg-nanan-cream p-6 lg:sticky lg:top-[120px]">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{t("fromPrice")}</p>
            <p className="mt-1 text-3xl font-bold text-nanan-orange">
              {formatPrice(room.price, lang)}
              <span className="text-base font-normal text-gray-500"> {t("perNight")}</span>
            </p>

            <dl className="mt-6 space-y-3 border-t border-nanan-green/20 pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">{t("capacity")}</dt><dd>{room.capacity} {t("guests")}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">{t("size")}</dt><dd>{room.size} m²</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">{t("bed")}</dt><dd className="text-right">{tr(room.bed, lang)}</dd></div>
            </dl>

            <Link
              to={`/${lang}/reservation?room=${room.group === "classic" ? "chambres" : room.slug}`}
              className="mt-8 block rounded-sm bg-nanan-orange py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green"
            >
              {t("bookRoom")}
            </Link>
          </aside>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-nanan-green-dark">
            {t("discoverAlso")}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((r) => (
              <Link
                key={r.path}
                to={`/${lang}/${r.path}`}
                className="group relative block aspect-[16/7] overflow-hidden bg-nanan-green/20"
              >
                <img
                  src={r.images[0]}
                  alt=""
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover:bg-nanan-green/60">
                  {tr(r.name, lang)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}