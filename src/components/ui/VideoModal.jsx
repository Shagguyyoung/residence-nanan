// src/components/ui/VideoModal.jsx
import { useEffect } from "react";
import { useT } from "../../i18n";

export default function VideoModal({ open, onClose, src = "/videos/presentation.mp4", poster }) {
  const t = useT();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t("videoTitle")}
    >
      <button
        onClick={onClose}
        aria-label={t("closeVideo")}
        className="absolute right-5 top-4 cursor-pointer text-3xl text-white"
      >
        ✕
      </button>

      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <video src={src} poster={poster} controls autoPlay playsInline className="aspect-video w-full bg-black">
          {t("videoUnsupported")}
        </video>
      </div>
    </div>
  );
}