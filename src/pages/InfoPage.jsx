// src/pages/InfoPage.jsx
// Page modèle pour : bar, hotel, services, presse, spa  (/fr/bar, /en/spa, ...)
import { Link, useParams } from "react-router-dom";
import { pages } from "../data/pages";
import { tr, useLang, useT } from "../i18n";
import RoomGallery from "../components/rooms/RoomGallery";
import Seo from "../components/seo/Seo";

export default function InfoPage() {
  const { page } = useParams();
  const lang = useLang();
  const t = useT();
  const data = pages[page];

  if (!data) {
    return (
      <section className="px-6 pb-20 pt-[160px] text-center">
        <h1 className="text-3xl font-bold text-nanan-green-dark">{t("pageNotFound")}</h1>
        <Link to={`/${lang}`} className="mt-6 inline-block text-nanan-orange underline">
          {t("backHome")}
        </Link>
      </section>
    );
  }

  const title = tr(data.title, lang);
  const items = data.items ? tr(data.items, lang) : [];

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={title} description={tr(data.intro, lang)} image={data.images?.[0]} />
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> / {title}
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-nanan-orange">{tr(data.tagline, lang)}</p>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
          <p className="text-lg leading-relaxed text-gray-700">{tr(data.intro, lang)}</p>
        </div>

        {data.images?.length > 0 && (
          <div className="mt-12">
            <RoomGallery images={data.images} alt={title} />
          </div>
        )}

        {data.sections?.length > 0 && (
          <div className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-2">
            {data.sections.map((s) => (
              <div key={tr(s.title, "fr")}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">
                  {tr(s.title, lang)}
                </h2>
                <p className="mt-3 leading-relaxed text-gray-700">{tr(s.text, lang)}</p>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 bg-nanan-cream p-8 sm:grid-cols-2">
            {items.map((it) => (
              <li key={it} className="flex items-center gap-3 text-gray-700">
                <span className="h-2 w-2 shrink-0 rounded-full bg-nanan-orange" />
                {it}
              </li>
            ))}
          </ul>
        )}

        {data.cta && (
          <div className="mt-12 text-center">
            <a
              href={data.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm bg-nanan-orange px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green"
            >
              {tr(data.cta.label, lang)}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}