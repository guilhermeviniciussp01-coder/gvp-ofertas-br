import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1800);
    const t2 = setTimeout(() => setVisible(false), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-orange-500 flex flex-col items-center justify-center transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-2xl">
          <svg viewBox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="#f97316" />
            <text x="30" y="42" textAnchor="middle" fontSize="32" fontWeight="900" fill="white" fontFamily="Arial">G</text>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white font-black text-2xl">GVP Ofertas BR</p>
          <p className="text-orange-200 text-sm mt-1">Sua loja de confiança 🇧🇷</p>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
