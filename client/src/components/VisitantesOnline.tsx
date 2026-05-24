import { useEffect, useState } from "react";

export default function VisitantesOnline() {
  const [count, setCount] = useState(Math.floor(Math.random() * 30) + 25);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(18, Math.min(99, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 w-fit">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
      <span className="text-xs font-bold text-green-700">{count} pessoas vendo agora</span>
    </div>
  );
}
