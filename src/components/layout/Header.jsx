// src/components/layout/Header.jsx  (menu burger + vidéo de présentation, bilingue)
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { languages, menuItems } from "../../data/navigation";
import { tr, useLang, useT } from "../../i18n";
import VideoModal from "../ui/VideoModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lang = useLang();
  const t = useT();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Change la langue en gardant la même page : /fr/spa -> /en/spa
  const changeLang = (code) => {
    const rest = location.pathname.split("/").slice(2).join("/");
    navigate(`/${code}${rest ? `/${rest}` : ""}`);
  };

  const currentLang = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white text-nanan-green-dark transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:h-24">
          <Link to={`/${lang}`} aria-label="Résidence Nanan" className="shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="Résidence Nanan"
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Vidéo de présentation */}
            <button
              onClick={() => setVideoOpen(true)}
              aria-label={t("watchVideo")}
              title={t("videoTitle")}
              className="cursor-pointer text-nanan-green-dark transition-colors hover:text-nanan-orange"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="6" width="13" height="12" rx="2" />
                <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
              </svg>
            </button>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={menuOpen}
              className="flex cursor-pointer items-center gap-3 text-sm font-semibold tracking-[0.15em] transition-colors hover:text-nanan-orange"
            >
              <span className="grid gap-[5px]" aria-hidden="true">
                <i className="block h-0.5 w-6 bg-current" />
                <i className="block h-0.5 w-6 bg-current" />
                <i className="block h-0.5 w-6 bg-current" />
              </span>
              <span className="hidden sm:inline">{t("menu")}</span>
            </button>

            <Link
              to={`/${lang}/reservation`}
              className="rounded-sm border border-nanan-orange bg-nanan-orange px-3 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-white transition-colors hover:border-nanan-green hover:bg-nanan-green sm:px-5 sm:py-3 sm:text-[13px]"
            >
              {t("book")}
            </Link>

            {/* Langue */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="cursor-pointer text-sm font-semibold tracking-widest"
              >
                {currentLang.label} ▾
              </button>
              {langOpen && (
                <ul className="absolute right-0 top-full mt-3 min-w-20 bg-white py-2 shadow-xl">
                  {languages
                    .filter((l) => l.code !== lang)
                    .map((l) => (
                      <li key={l.code}>
                        <button
                          onClick={() => changeLang(l.code)}
                          className="w-full cursor-pointer px-4 py-2 text-left text-[13px] font-semibold text-nanan-green-dark hover:text-nanan-orange"
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menu plein écran */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto bg-nanan-cream text-nanan-green-dark transition-all duration-300 ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label={t("closeMenu")}
          className="absolute right-6 top-5 cursor-pointer text-3xl"
        >
          ✕
        </button>

        <Link to={`/${lang}`} className="mb-6 mt-16 shrink-0" aria-label="Résidence Nanan">
          <img src="/images/logo.jpeg" alt="Résidence Nanan" className="h-24 w-auto object-contain sm:h-28" />
        </Link>

        <nav className="pb-10">
          <ul className="text-center">
            {menuItems.map((item, i) => (
              <li
                key={item.path}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className={`transition-all duration-500 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <NavLink
                  to={`/${lang}${item.path ? `/${item.path}` : ""}`}
                  end={item.path === ""}
                  tabIndex={menuOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `inline-block py-2 text-base uppercase tracking-[0.12em] transition-colors hover:text-nanan-orange sm:text-xl ${
                      isActive ? "text-nanan-orange" : ""
                    }`
                  }
                >
                  {tr(item.label, lang)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} src="/videos/presentation.mp4" />
    </>
  );
}