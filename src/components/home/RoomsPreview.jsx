// src/components/home/RoomsPreview.jsx
import { Link, useParams } from "react-router-dom";
import { rooms } from "../../data/rooms";
import RoomCard from "../rooms/RoomCard";

export default function RoomsPreview() {
  const { lang = "fr" } = useParams();

  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-nanan-orange">Hébergement</p>
          <h2 className="mt-4 text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-4xl">
            Nos chambres
          </h2>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
          <p className="text-lg text-gray-700">
            Choisissez le confort qui vous convient pour votre séjour.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={`/${lang}/chambres`}
            className="inline-block rounded-sm bg-nanan-green px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-orange"
          >
            Voir toutes les chambres
          </Link>
        </div>
      </div>
    </section>
  );
}