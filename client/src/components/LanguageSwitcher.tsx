import { useLang } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 bg-white/20 rounded-xl p-1">
      <button
        onClick={() => setLang("pt")}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${lang === "pt" ? "bg-white text-orange-500" : "text-white hover:bg-white/20"}`}
      >
        🇧🇷 PT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${lang === "en" ? "bg-white text-orange-500" : "text-white hover:bg-white/20"}`}
      >
        🌍 EN
      </button>
    </div>
  );
}
