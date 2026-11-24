// src/components/layout/Footer.jsx
import { hotel } from "../../data/hotel";
import { useT } from "../../i18n";

export default function Footer() {
  const t = useT();

  return (
    <footer className="bg-white px-4 py-6 text-[13px] text-nanan-green-dark sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center leading-relaxed md:text-left">
          <span className="font-semibold uppercase">{hotel.name}</span> | {hotel.address} |{" "}
          <a href={`tel:${hotel.phone.replace(/\s/g, "")}`} className="hover:text-nanan-orange">
            {hotel.phone}
          </a>{" "}
          |{" "}
          <a href={`mailto:${hotel.email}`} className="hover:text-nanan-orange">
            {hotel.email}
          </a>{" "}
          | {t("legal")} | {t("privacy")}
        </p>

        <ul className="flex shrink-0 items-center gap-5">
          {hotel.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold uppercase tracking-wider text-nanan-orange hover:text-nanan-green"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}