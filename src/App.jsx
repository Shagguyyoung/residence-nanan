// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { SUPPORTED } from "./i18n";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Room from "./pages/Room";
import InfoPage from "./pages/InfoPage";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import MeetingRoom from "./pages/MeetingRoom";
import { getRoom } from "./data/rooms";

function Layout() {
  const { pathname } = useLocation();
  const { lang } = useParams();

  // Remonte en haut de la page à chaque changement de page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Indique la langue au navigateur (accessibilité, référencement)
  useEffect(() => {
    document.documentElement.lang = SUPPORTED.includes(lang) ? lang : "fr";
  }, [lang]);

  // Langue inconnue (ex: /xx/spa) -> retour au français
  if (!SUPPORTED.includes(lang)) return <Navigate to="/fr" replace />;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// /fr/chambres, /fr/suite-junior, /fr/suite-senior -> page chambre ; le reste -> page d'information
function PageSwitch() {
  const { page } = useParams();
  const room = getRoom(page);
  // Seules les suites ont une adresse directe ; les chambres classiques passent par /chambres/:slug
  return room && room.path === page ? <Room slug={page} /> : <InfoPage />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/fr" replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reservation" element={<Booking />} />
        <Route path="chambres" element={<Rooms />} />
        <Route path="chambres/:slug" element={<Room />} />
        <Route path="reunions/:slug" element={<MeetingRoom />} />
        {/* chambres, suites, restaurant, bar-lounge, piscine, reunions */}
        <Route path=":page" element={<PageSwitch />} />
      </Route>
    </Routes>
  );
}