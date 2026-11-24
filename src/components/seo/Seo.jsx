// src/components/seo/Seo.jsx
// Met à jour le titre, la description, les liens de langue et les données structurées de chaque page.
// Utilisation :  <Seo title="Spa" description="..." image="/images/pages/spa/1.jpg" />
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hotel } from "../../data/hotel";
import { SUPPORTED, useLang } from "../../i18n";

// Crée la balise si elle n'existe pas, sinon met à jour sa valeur
function upsert(selector, create, value, attr = "content") {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key, value, by = "name") =>
  upsert(`meta[${by}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(by, key);
    return m;
  }, value);

const link = (rel, href, extra = "") =>
  upsert(`link[rel="${rel}"]${extra}`, () => {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    if (extra) {
      const m = extra.match(/\[(\w+)="([^"]+)"\]/);
      if (m) l.setAttribute(m[1], m[2]);
    }
    return l;
  }, href, "href");

export default function Seo({ title, description, image, raw = false, schema = null }) {
  const lang = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    const site = hotel.siteUrl.replace(/\/$/, "");
    const fullTitle = raw ? title : `${title} | ${hotel.name}`;
    const img = site + (image || hotel.ogImage);
    const url = site + pathname;
    const rest = pathname.split("/").slice(2).join("/"); // /fr/spa -> "spa"

    document.title = fullTitle;
    document.documentElement.lang = lang;

    meta("description", description);
    meta("og:type", "website", "property");
    meta("og:site_name", hotel.name, "property");
    meta("og:title", fullTitle, "property");
    meta("og:description", description, "property");
    meta("og:url", url, "property");
    meta("og:image", img, "property");
    meta("og:locale", lang === "en" ? "en_US" : "fr_FR", "property");
    meta("twitter:card", "summary_large_image");

    link("canonical", url);

    // Versions dans les autres langues (aide Google à afficher la bonne langue)
    SUPPORTED.forEach((code) =>
      link("alternate", `${site}/${code}${rest ? `/${rest}` : ""}`, `[hreflang="${code}"]`)
    );
    link("alternate", `${site}/fr${rest ? `/${rest}` : ""}`, `[hreflang="x-default"]`);

    // Données structurées (JSON-LD), seulement si la page en fournit
    const id = "ld-json";
    const old = document.getElementById(id);
    if (old) old.remove();
    if (schema) {
      const s = document.createElement("script");
      s.id = id;
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
  }, [title, description, image, raw, schema, lang, pathname]);

  return null;
}