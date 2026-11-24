// src/components/rooms/RoomGallery.jsx
// Galerie en MOSAÏQUE : photos de tailles variées, un clic ouvre la photo en grand (avec flèches).
// Fonctionne avec n'importe quel nombre de photos (la liste est dans rooms.js / pages.js).
import { useCallback, useEffect, useState } from "react";
import { useT } from "../../i18n";

// Formes qui se répètent pour donner l'effet mosaïque
const shapes = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

export default function RoomGallery({ images, alt }) {
  const t = useT();
  const [open, setOpen] = useState(null); // index de la photo ouverte, ou null
  const total = images.length;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((i) => setOpen((i + total) % total), [total]);

  // Clavier + blocage du défilement quand la photo est ouverte
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(open - 1);
      if (e.key === "ArrowRight") go(open + 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      {/* Mosaïque */}
      <div className="columns-2 gap-2 sm:columns-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            aria-label={`${t("seePhoto")} ${i + 1}`}
            className={`group relative mb-2 block w-full break-inside-avoid cursor-zoom-in overflow-hidden bg-nanan-green/15 ${shapes[i % shapes.length]}`}
          >
            <img
              src={src}
              alt={`${alt} - ${t("photo")} ${i + 1}`}
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-nanan-green/0 transition-colors duration-300 group-hover:bg-nanan-green/20" />
          </button>
        ))}
      </div>

      {/* Photo en grand */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label={t("close")}
            className="absolute right-5 top-4 cursor-pointer text-3xl text-white"
          >
            ✕
          </button>

          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(open - 1); }}
                aria-label={t("prevPhoto")}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer bg-white/80 px-3 py-2 text-2xl text-nanan-green-dark transition-colors hover:bg-nanan-orange hover:text-white sm:left-6"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(open + 1); }}
                aria-label={t("nextPhoto")}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-white/80 px-3 py-2 text-2xl text-nanan-green-dark transition-colors hover:bg-nanan-orange hover:text-white sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <img
            src={images[open]}
            alt={`${alt} - ${t("photo")} ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full object-contain"
          />

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 text-xs text-white">
            {open + 1} / {total}
          </span>
        </div>
      )}
    </>
  );
}