// src/components/rooms/RoomCard.jsx
import { Link } from "react-router-dom";
import { formatPrice } from "../../data/rooms";
import { tr, useLang, useT } from "../../i18n";

export default function RoomCard({ room }) {
  const lang = useLang();
  const t = useT();
  const name = tr(room.name, lang);
  const to = `/${lang}/${room.path}`;

  return (
    <article className="group flex flex-col overflow-hidden bg-white shadow-md transition-shadow hover:shadow-xl">
      <Link to={to} className="relative block aspect-[4/3] overflow-hidden bg-nanan-green/15">
        <img
          src={room.images[0]}
          alt={name}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-0 left-0 bg-nanan-orange px-4 py-2 text-sm font-semibold text-white">
          {t("fromPrice")} {formatPrice(room.price, lang)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold uppercase tracking-[0.08em] text-nanan-green-dark">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {room.capacity} {t("guests")} · {room.size} m²
        </p>
        <p className="mt-4 flex-1 leading-relaxed text-gray-700">{tr(room.tagline, lang)}</p>

        <Link
          to={to}
          className="mt-6 inline-block self-start border-b-2 border-nanan-orange pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-nanan-orange transition-colors hover:border-nanan-green hover:text-nanan-green"
        >
          {t("viewDetails")} →
        </Link>
      </div>
    </article>
  );
}