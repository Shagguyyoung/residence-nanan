// src/pages/Booking.jsx
// Page de demande de réservation : dates, hébergement, estimation du prix, coordonnées.
// ⚠️ Ce n'est PAS une réservation automatique : l'hôtel reçoit la demande puis confirme au client.
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { hotel } from "../data/hotel";
import { formatPrice, roomTypes } from "../data/rooms";
import { tr, useLang, useT } from "../i18n";
import Seo from "../components/seo/Seo";

const text = {
  fr: {
    title: "Réserver",
    tagline: "Envoyez votre demande, nous vous confirmons rapidement",
    stay: "Votre séjour",
    details: "Vos coordonnées",
    checkIn: "Arrivée",
    checkOut: "Départ",
    guests: "Personnes",
    roomsCount: "Nombre de chambres",
    roomType: "Hébergement",
    name: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    notes: "Demande particulière (facultatif)",
    summary: "Récapitulatif",
    nights: "nuit(s)",
    estimate: "Total estimé",
    estimateNote: "Estimation indicative selon nos tarifs. Le prix final vous sera confirmé par l'hôtel.",
    pickDates: "Choisissez vos dates pour voir l'estimation.",
    invalidDates: "La date de départ doit être après la date d'arrivée.",
    send: "Envoyer ma demande",
    sending: "Envoi en cours...",
    whatsapp: "Réserver via WhatsApp",
    or: "ou",
    success: "Merci ! Votre demande a bien été envoyée.",
    successNote: "Elle sera confirmée par l'hôtel par e-mail ou par téléphone. Ce n'est pas encore une réservation confirmée.",
    error: "Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp ou par téléphone.",
    waHello: "Bonjour, je souhaite réserver :",
    perNight: "par nuit",
    upTo: "max.",
  },
  en: {
    title: "Book",
    tagline: "Send your request, we will confirm quickly",
    stay: "Your stay",
    details: "Your details",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    roomsCount: "Number of rooms",
    roomType: "Accommodation",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    notes: "Special request (optional)",
    summary: "Summary",
    nights: "night(s)",
    estimate: "Estimated total",
    estimateNote: "Indicative estimate based on our rates. The final price will be confirmed by the hotel.",
    pickDates: "Choose your dates to see the estimate.",
    invalidDates: "The check-out date must be after the check-in date.",
    send: "Send my request",
    sending: "Sending...",
    whatsapp: "Book via WhatsApp",
    or: "or",
    success: "Thank you! Your request has been sent.",
    successNote: "The hotel will confirm it by email or phone. This is not yet a confirmed booking.",
    error: "Something went wrong. Please try again or contact us on WhatsApp or by phone.",
    waHello: "Hello, I would like to book:",
    perNight: "per night",
    upTo: "max.",
  },
};

const input =
  "w-full border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition-colors focus:border-nanan-orange";
const label = "mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-nanan-green-dark";

const today = () => new Date().toISOString().slice(0, 10);

export default function Booking() {
  const lang = useLang();
  const t = useT();
  const c = text[lang];
  const [params] = useSearchParams();

  const wanted = params.get("room");
  const [form, setForm] = useState({
    room: roomTypes.some((r) => r.slug === wanted) ? wanted : roomTypes[0].slug,
    checkIn: "", checkOut: "", guests: "2", roomsCount: "1",
    name: "", email: "", phone: "", notes: "", website: "", // "website" = piège anti-spam
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const type = roomTypes.find((r) => r.slug === form.room) ?? roomTypes[0];
  const typeName = tr(type.name, lang);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    return Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000);
  }, [form.checkIn, form.checkOut]);

  const datesInvalid = form.checkIn && form.checkOut && nights <= 0;
  const roomsCount = Math.max(1, Number(form.roomsCount) || 1);
  const total = nights > 0 ? nights * type.price * roomsCount : 0;
  const maxGuests = type.capacity * roomsCount;

  const summaryLine = `${typeName} x${roomsCount} | ${form.checkIn} -> ${form.checkOut} (${nights} ${c.nights}) | ${form.guests} ${t("guests")}`;

  const submit = async (e) => {
    e.preventDefault();
    if (form.website || datesInvalid || nights <= 0) return;

    setStatus("sending");
    const payload = {
      type: "reservation",
      lang,
      room: typeName,
      roomsCount,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      guests: form.guests,
      estimatedTotal: total,
      name: form.name,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
    };

    // Pas de serveur configuré : on ouvre le mail du visiteur, déjà rempli.
    if (!hotel.contactEndpoint) {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${hotel.email}?subject=${encodeURIComponent(
        "Réservation - " + form.name
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
    } catch {
      setStatus("error");
    }
  };

  const waLink = `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(
    `${c.waHello} ${summaryLine}${form.name ? ` | ${form.name}` : ""}`
  )}`;

  if (status === "success") {
    return (
      <section className="bg-white px-6 pb-24 pt-[140px] text-center">
        <Seo title={c.title} description={c.tagline} />
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark">{c.success}</h1>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
          <p className="text-lg text-gray-700">{c.successNote}</p>
          <p className="mt-6 bg-nanan-cream p-4 text-sm text-gray-700">{summaryLine}</p>
          <Link to={`/${lang}`} className="mt-8 inline-block text-nanan-orange underline">
            {t("backHome")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 pb-20 pt-[104px] sm:px-6 sm:pt-[112px] lg:pt-[136px]">
      <Seo title={c.title} description={c.tagline} />
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-gray-500">
          <Link to={`/${lang}`} className="hover:text-nanan-orange">{t("home")}</Link> / {c.title}
        </p>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.1em] text-nanan-green-dark sm:text-5xl">{c.title}</h1>
          <p className="mt-3 text-nanan-orange">{c.tagline}</p>
          <div className="mx-auto my-6 h-0.5 w-16 bg-nanan-orange" />
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-8">
            {/* Séjour */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">{c.stay}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="room">{c.roomType}</label>
                  <select id="room" name="room" value={form.room} onChange={set} className={input}>
                    {roomTypes.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {tr(r.name, lang)} - {formatPrice(r.price, lang)} {c.perNight}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="checkIn">{c.checkIn} *</label>
                  <input id="checkIn" name="checkIn" type="date" required min={today()} value={form.checkIn} onChange={set} className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="checkOut">{c.checkOut} *</label>
                  <input id="checkOut" name="checkOut" type="date" required min={form.checkIn || today()} value={form.checkOut} onChange={set} className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="roomsCount">{c.roomsCount}</label>
                  <input id="roomsCount" name="roomsCount" type="number" min="1" max="6" value={form.roomsCount} onChange={set} className={input} />
                </div>
                <div>
                  <label className={label} htmlFor="guests">{c.guests} ({c.upTo} {maxGuests})</label>
                  <input id="guests" name="guests" type="number" min="1" max={maxGuests} value={form.guests} onChange={set} className={input} />
                </div>
              </div>
              {datesInvalid && <p className="mt-3 text-sm text-red-600" role="alert">{c.invalidDates}</p>}
            </div>

            {/* Coordonnées */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">{c.details}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="name">{c.name} *</label>
                  <input id="name" name="name" required value={form.name} onChange={set} className={input} autoComplete="name" />
                </div>
                <div>
                  <label className={label} htmlFor="email">{c.email} *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={set} className={input} autoComplete="email" />
                </div>
                <div>
                  <label className={label} htmlFor="phone">{c.phone} *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={set} className={input} autoComplete="tel" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="notes">{c.notes}</label>
                  <textarea id="notes" name="notes" rows="4" value={form.notes} onChange={set} className={input} />
                </div>
              </div>
            </div>

            {/* Champ piège anti-spam */}
            <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            {status === "error" && <p className="bg-red-50 p-4 text-red-700" role="alert">{c.error}</p>}

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "sending" || datesInvalid}
                className="cursor-pointer rounded-sm bg-nanan-orange px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-nanan-green disabled:cursor-not-allowed disabled:opacity-60"
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
          </div>

          {/* Récapitulatif */}
          <aside className="h-fit bg-nanan-cream lg:sticky lg:top-[120px]">
            <div className="relative aspect-[16/9] overflow-hidden bg-nanan-green/15">
              <img
                src={type.images[0]}
                alt={typeName}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-nanan-green-dark">{c.summary}</h2>
              <p className="mt-3 text-xl font-bold text-nanan-green-dark">{typeName}</p>
              <p className="text-sm text-gray-500">{formatPrice(type.price, lang)} {c.perNight}</p>

              <dl className="mt-5 space-y-2 border-t border-nanan-green/20 pt-5 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">{c.checkIn}</dt><dd>{form.checkIn || "-"}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">{c.checkOut}</dt><dd>{form.checkOut || "-"}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">{c.roomsCount}</dt><dd>{roomsCount}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">{c.guests}</dt><dd>{form.guests}</dd></div>
                {nights > 0 && (
                  <div className="flex justify-between"><dt className="text-gray-500">{nights} {c.nights}</dt><dd>x {roomsCount}</dd></div>
                )}
              </dl>

              <div className="mt-5 border-t border-nanan-green/20 pt-5">
                {total > 0 ? (
                  <>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">{c.estimate}</p>
                    <p className="text-3xl font-bold text-nanan-orange">{formatPrice(total, lang)}</p>
                    <p className="mt-2 text-xs text-gray-500">{c.estimateNote}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">{c.pickDates}</p>
                )}
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}