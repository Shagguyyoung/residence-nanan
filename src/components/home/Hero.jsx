// src/components/home/Hero.jsx
import { Link, useParams } from "react-router-dom";
import { bookingUrl } from "../../data/navigation";

/**
 * Hero plein écran.
 * - Mets ta photo dans public/images/hero.jpg (ou change `image`).
 * - Pour une vidéo : passe `video="/videos/hero.mp4"` (mp4 léger, < 8 Mo idéalement).
 */
export default function Hero({
  image = "/images/hero.jpg",
  video,
  title = "Résidence Nanan",
  subtitle = "Votre séjour, comme à la maison, au cœur d'Abidjan",
}) {
  const { lang = "fr" } = useParams();

  return (
    <section className="relative flex h-svh min-h-[560px] items-center justify-center overflow-hidden bg-nanan-green-dark text-white">
      {/* Média de fond */}
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Voile sombre pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* Contenu */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-nanan-orange sm:text-sm">
          Hôtel &amp; résidence
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-[0.12em] sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/90 sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-sm bg-nanan-orange px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-nanan-green sm:w-auto"
          >
            Réserver
          </a>
          <Link
            to={`/${lang}/chambres`}
            className="w-full rounded-sm border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-nanan-green-dark sm:w-auto"
          >
            Découvrir les chambres
          </Link>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white/80">
        ↓
      </div>
    </section>
  );
}