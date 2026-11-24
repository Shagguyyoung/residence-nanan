// src/pages/Contact.jsx
// Page contact : formulaire de demande de réservation + coordonnées + carte.
import { useState } from "react";
import { Link } from "react-router-dom";
import { hotel } from "../data/hotel";
import { roomTypes } from "../data/rooms";
import { tr, useLang, useT } from "../i18n";
import Seo from "../components/seo/Seo";

const text = {
  fr: {
    title: "Contact",
    tagline: "Une question ? Une réservation ? Écrivez-nous",
    name: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    checkIn: "Arrivée",
    checkOut: "Départ",
    guests: "Nombre de personnes",
    room: "Type de chambre",
    anyRoom: "Pas de préférence",
    message: "Message",
    send: "Envoyer la demande",
    sending: "Envoi en cours...",
    whatsapp: "Écrire sur WhatsApp",
    success: "Merci ! Votre demande a bien été envoyée. Nous vous répondons très vite.",
    error: "Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp ou par téléphone.",
    required: "Champ obligatoire",
    coords: "Nos coordonnées",
    address: "Adresse",
    or: "ou",
    waHello: "Bonjour, je souhaite des informations / réserver à la Résidence Nanan.",
  },
  en: {
    title: "Contact",
    tagline: "A question? A booking? Write to us",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Number of guests",
    room: "Room type",
    anyRoom: "No preference",
    message: "Message",
    send: "Send request",
    sending: "Sending...",
    whatsapp: "Message us on WhatsApp",
    success: "Thank you! Your request has been sent. We will reply very soon.",
    error: "Something went wrong. Please try again or contact us on WhatsApp or by phone.",
    required: "Required field",
    coords: "Our details",
    address: "Address",
    or: "or",
    waHello: "Hello, I would like information / to book at Résidence Nanan.",
  },
};

const input =
  "w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition-colors focus:border-nanan-orange";
const label = "mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-nanan-green-dark";

const empty = {
  name: "", email: "", phone: "", checkIn: "", checkOut: "",
  guests: "2", room: "", message: "", website: "", // "website" = piège anti-spam (doit rester vide)
};

export default function Contact() {
  const lang = useLang();
  const t = useT();
  const c = text[lang];

  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return; // un robot a rempli le champ caché

    setStatus("sending");
    const payload = { ...form, lang };
    delete payload.website;

    // Pas de serveur configuré : on ouvre le mail du visiteur, déjà rempli.
    if (!hotel.contactEndpoint) {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${hotel.email}?subject=${encodeURIComponent(
        "Demande - " + form.name
      )}&body=${encodeURIComponent(body)}`;
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch(hotel.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  const waLink = `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(c.waHello)}`;

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={c.title} description={c.tagline} />
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> / {c.title}
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-3 text-nanan-orange">{c.tagline}</p>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr]">
          {/* Formulaire */}
          <form onSubmit={submit} className="space-y-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">{c.name} *</label>
                <input id="name" name="name" required value={form.name} onChange={set} className={input} autoComplete="name" />
              </div>
              <div>
                <label className={label} htmlFor="email">{c.email} *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={set} className={input} autoComplete="email" />
              </div>
              <div>
                <label className={label} htmlFor="phone">{c.phone}</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={set} className={input} autoComplete="tel" />
              </div>
              <div>
                <label className={label} htmlFor="guests">{c.guests}</label>
                <input id="guests" name="guests" type="number" min="1" max="10" value={form.guests} onChange={set} className={input} />
              </div>
              <div>
                <label className={label} htmlFor="checkIn">{c.checkIn}</label>
                <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={set} className={input} />
              </div>
              <div>
                <label className={label} htmlFor="checkOut">{c.checkOut}</label>
                <input id="checkOut" name="checkOut" type="date" min={form.checkIn} value={form.checkOut} onChange={set} className={input} />
              </div>
            </div>

            <div>
              <label className={label} htmlFor="room">{c.room}</label>
              <select id="room" name="room" value={form.room} onChange={set} className={input}>
                <option value="">{c.anyRoom}</option>
                {roomTypes.map((r) => (
                  <option key={r.slug} value={tr(r.name, lang)}>{tr(r.name, lang)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} htmlFor="message">{c.message}</label>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={set} className={input} />
            </div>

            {/* Champ piège anti-spam : invisible pour les humains */}
            <input
              name="website" value={form.website} onChange={set}
              tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {status === "success" && (
              <p className="bg-nanan-green/10 p-4 text-nanan-green-dark" role="status">{c.success}</p>
            )}
            {status === "error" && (
              <p className="bg-red-50 p-4 text-red-700" role="alert">{c.error}</p>
            )}

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="cursor-pointer rounded-sm bg-nanan-orange px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? c.sending : c.send}
              </button>
              <span className="text-center text-sm text-gray-400">{c.or}</span>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-nanan-green px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-nanan-green transition-colors hover:bg-nanan-green hover:text-white"
              >
                {c.whatsapp}
              </a>
            </div>
          </form>

          {/* Coordonnées + carte */}
          <aside className="space-y-6">
            <div className="bg-nanan-cream p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">
                {c.coords}
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><span className="text-gray-500">{c.address} :</span> {hotel.address}</li>
                <li>
                  <a href={`tel:${hotel.phone.replace(/\s/g, "")}`} className="hover:text-nanan-orange">
                    {hotel.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${hotel.email}`} className="hover:text-nanan-orange">{hotel.email}</a>
                </li>
              </ul>
            </div>

            <div className="aspect-[4/3] overflow-hidden bg-nanan-green/10">
              <iframe
                title="Plan d'accès"
                src={`https://www.google.com/maps?q=${encodeURIComponent(hotel.mapQuery)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}