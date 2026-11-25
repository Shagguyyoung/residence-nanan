// src/components/ui/RatesBox.jsx
// Encadré « Tarifs et formules de location » avec un bouton de demande de devis.
// `rates` = { title, items, note } (voir `reunions` dans pages.js)
import { Link } from "react-router-dom";
import { tr, useLang, useT } from "../../i18n";

export default function RatesBox({ rates, className = "" }) {
  const lang = useLang();
  const t = useT();

  return (
    <div className={`border-l-4 border-nanan-orange bg-nanan-cream p-8 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">
        {tr(rates.title, lang)}
      </h2>
      <ul className="mt-4 space-y-3">
        {tr(rates.items, lang).map((it) => (
          <li key={it} className="flex items-start gap-3 text-gray-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-nanan-orange" />
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-700">{tr(rates.note, lang)}</p>
      <Link
        to={`/${lang}/contact`}
        className="mt-6 inline-block rounded-sm bg-nanan-orange px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green"
      >
        {t("askQuote")}
      </Link>
    </div>
  );
}
