import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Quote = {
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
};

type Resp = { quotes: Quote[]; updatedAt: string; error?: string };

const fmt = (n: number | null, d = 2) =>
  n == null || !Number.isFinite(n)
    ? "—"
    : n.toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d });

export const LiveTicker = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const load = async () => {
    try {
      const { data } = await supabase.functions.invoke<Resp>("get-live-indices");
      if (data?.quotes) setQuotes(data.quotes.filter((q) => q.price != null));
    } catch {
      /* silent */
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  if (quotes.length === 0) {
    return (
      <div className="border-y border-border/60 bg-card/40 backdrop-blur py-2 text-xs text-muted-foreground text-center">
        Fetching live market data…
      </div>
    );
  }

  // Duplicate the list so the marquee loops seamlessly
  const loop = [...quotes, ...quotes, ...quotes];

  return (
    <div className="border-y border-border/60 bg-card/40 backdrop-blur overflow-hidden group">
      <div className="flex items-center">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-rose-400 border-r border-border/60 shrink-0">
          <Circle className="h-2 w-2 fill-rose-500 text-rose-500 animate-pulse" />
          Live
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-8 py-2 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {loop.map((q, i) => {
              const up = (q.change ?? 0) >= 0;
              return (
                <div key={`${q.symbol}-${i}`} className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-foreground">{q.name}</span>
                  <span className="tabular-nums font-mono">{fmt(q.price)}</span>
                  <span
                    className={`inline-flex items-center gap-1 tabular-nums font-mono text-xs ${
                      up ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {up ? "+" : ""}
                    {fmt(q.change)} ({up ? "+" : ""}
                    {fmt(q.changePct)}%)
                  </span>
                  <span className="text-border">•</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
