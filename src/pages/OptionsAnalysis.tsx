import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, TrendingUp, Search, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BookCallDialog } from "@/components/BookCallDialog";
import { LiveTicker } from "@/components/LiveTicker";


type SheetResp = { rows: string[][]; updatedAt: string; error?: string };

const toNum = (v: string | undefined) => {
  if (!v) return NaN;
  const n = Number(String(v).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(n) ? n : NaN;
};

const fmtNum = (n: number, digits = 2) =>
  Number.isFinite(n) ? n.toLocaleString("en-IN", { maximumFractionDigits: digits }) : "—";

const fmtPct = (raw: string | undefined) => {
  if (!raw) return "—";
  const s = String(raw).trim();
  if (s.endsWith("%")) return s;
  const n = toNum(s);
  if (!Number.isFinite(n)) return s || "—";
  const pct = Math.abs(n) <= 1 ? n * 100 : n;
  return `${pct.toFixed(2)}%`;
};

const popClass = (raw: string | undefined) => {
  const n = toNum(raw);
  const pct = Math.abs(n) <= 1 ? n * 100 : n;
  if (!Number.isFinite(pct)) return "text-muted-foreground";
  if (pct >= 80) return "text-emerald-400 font-semibold";
  if (pct >= 60) return "text-emerald-300";
  if (pct >= 40) return "text-amber-300";
  return "text-rose-400";
};

const OptionsAnalysis = () => {
  const [data, setData] = useState<SheetResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke<SheetResp>("get-options-analysis");
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setData(data ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const { summary, headers, rows, atmStrike } = useMemo(() => {
    const all = data?.rows ?? [];
    if (all.length < 4) {
      return { summary: [] as { label: string; value: string }[], headers: [] as string[], rows: [] as string[][], atmStrike: null as number | null };
    }

    const summary: { label: string; value: string }[] = [];
    for (let i = 1; i < Math.min(all.length, 8); i++) {
      const label = (all[i]?.[0] ?? "").trim();
      const value = (all[i]?.[1] ?? "").trim();
      if (label && value) summary.push({ label, value });
    }

    const headerRow = all[1] ?? [];
    const headers = headerRow.slice(3).map((h) => (h ?? "").trim());

    const body: string[][] = [];
    for (let i = 3; i < all.length; i++) {
      const r = all[i] ?? [];
      const slice = r.slice(3, 3 + headers.length);
      const strikeIdxLocal = headers.findIndex((h) => h.toLowerCase() === "strike");
      const strikeVal = strikeIdxLocal >= 0 ? slice[strikeIdxLocal] : "";
      if (strikeVal && toNum(strikeVal) > 0) body.push(slice);
    }

    const atmRaw = summary.find((s) => s.label.toLowerCase().includes("atm"))?.value;
    const atmStrike = atmRaw ? toNum(atmRaw) : null;

    return { summary, headers, rows: body, atmStrike: Number.isFinite(atmStrike ?? NaN) ? atmStrike : null };
  }, [data]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => r.some((c) => (c ?? "").toString().toLowerCase().includes(q)));
  }, [rows, query]);

  const strikeIdx = headers.findIndex((h) => h.toLowerCase() === "strike");
  const ceCount = strikeIdx >= 0 ? strikeIdx : 0;
  const peCount = strikeIdx >= 0 ? headers.length - strikeIdx - 1 : 0;

  const updated = data?.updatedAt ? new Date(data.updatedAt).toLocaleString("en-IN") : null;

  const isAtmRow = (row: string[]) => {
    if (!atmStrike || strikeIdx < 0) return false;
    const strikeVal = toNum(row[strikeIdx]);
    return Number.isFinite(strikeVal) && strikeVal === atmStrike;
  };

  const cellBg = (ci: number) => {
    if (ci === strikeIdx) return "bg-sky-500/[0.06]";
    if (ci < strikeIdx) return "bg-emerald-500/[0.07]";
    return "bg-rose-500/[0.07]";
  };

  const headerBg = (ci: number) => {
    if (ci === strikeIdx) return "bg-sky-500/15";
    if (ci < strikeIdx) return "bg-emerald-500/15";
    return "bg-rose-500/15";
  };

  const renderCell = (val: string, header: string, isStrike: boolean) => {
    const h = header.toLowerCase();
    if (isStrike) {
      return <span className="font-bold text-foreground">{fmtNum(toNum(val), 0)}</span>;
    }
    if (h.startsWith("pop")) {
      return <span className={popClass(val)}>{fmtPct(val)}</span>;
    }
    if (h.startsWith("pmp")) {
      return <span className="text-primary/90 font-medium">{fmtPct(val)}</span>;
    }
    if (h.includes("oi")) {
      const n = toNum(val);
      return <span className="text-muted-foreground">{Number.isFinite(n) ? fmtNum(n, 0) : val}</span>;
    }
    if (h.includes("ltp") || h.includes("be")) {
      const n = toNum(val);
      return <span className="tabular-nums">{Number.isFinite(n) ? fmtNum(n, 2) : val}</span>;
    }
    return <span>{val || "—"}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Proption Fintech</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/options-analysis" className="text-foreground">Options Analysis</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          </nav>
          <BookCallDialog>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              Book a Call
            </Button>
          </BookCallDialog>
        </div>
      </header>

      {/* Live market ticker */}
      <div className="pt-16">
        <LiveTicker />
      </div>

      <main className="container pt-6 pb-16">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Nifty <span className="text-gradient">Options Analysis</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm md:text-base">
              Live strike-wise LTP, PMP (Probability of Max Profit), POP (Probability of Profit) and Open Interest for Nifty 50 options — straight from our quant engine.
            </p>
            {updated && <p className="text-xs text-muted-foreground mt-2">Last updated: {updated}</p>}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search strike..."
                className="pl-9 w-44"
              />
            </div>
            <Button variant="outline" size="icon" onClick={load} disabled={loading} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        {summary.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {summary.slice(0, 4).map((s) => (
              <Card key={s.label} className="p-4 border-border/60 bg-card/60 backdrop-blur">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                  <Activity className="h-3.5 w-3.5" /> {s.label.replace(/_/g, " ")}
                </div>
                <div className="mt-1.5 text-xl md:text-2xl font-bold text-gradient">
                  {s.value}
                </div>
              </Card>
            ))}
          </div>
        )}

        <Card className="overflow-hidden border-border/60">
          {loading && !data && (
            <div className="p-12 text-center text-muted-foreground">Loading calculations…</div>
          )}
          {error && (
            <div className="p-8 text-center">
              <Badge variant="destructive" className="mb-3">Couldn't load data</Badge>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">{error}</p>
            </div>
          )}
          {!loading && !error && headers.length > 0 && (
            <div className="overflow-auto max-h-[calc(100vh-220px)] relative">
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-20">
                  {/* Group header */}
                  <tr>
                    {ceCount > 0 && (
                      <th colSpan={ceCount} className="px-4 py-2.5 text-center text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-500/25 backdrop-blur border-b-2 border-emerald-500/40">
                        Call (CE)
                      </th>
                    )}
                    <th className="px-4 py-2.5 text-center text-xs uppercase tracking-widest text-sky-300 font-bold bg-sky-500/25 backdrop-blur border-b-2 border-sky-500/40">
                      Strike
                    </th>
                    {peCount > 0 && (
                      <th colSpan={peCount} className="px-4 py-2.5 text-center text-xs uppercase tracking-widest text-rose-300 font-bold bg-rose-500/25 backdrop-blur border-b-2 border-rose-500/40">
                        Put (PE)
                      </th>
                    )}
                  </tr>
                  {/* Column header */}
                  <tr>
                    {headers.map((h, i) => (
                      <th
                        key={i}
                        className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap backdrop-blur border-b border-border ${
                          i === strikeIdx
                            ? "text-sky-300 text-center bg-sky-500/20"
                            : i < strikeIdx
                              ? "text-emerald-300 text-right bg-emerald-500/20"
                              : "text-rose-300 text-right bg-rose-500/20"
                        }`}
                      >
                        {h || `Col ${i + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((row, ri) => {
                    const isAtm = isAtmRow(row);
                    return (
                      <tr
                        key={ri}
                        className={`border-b border-border/40 transition-colors ${
                          isAtm ? "bg-primary/10" : "hover:bg-muted/30"
                        }`}
                      >
                        {headers.map((h, ci) => (
                          <td
                            key={ci}
                            className={`px-3 py-2.5 whitespace-nowrap font-mono tabular-nums ${
                              isAtm ? "bg-primary/[0.03]" : cellBg(ci)
                            } ${
                              ci === strikeIdx ? "text-center" : "text-right"
                            } ${isAtm && ci === strikeIdx ? "font-bold text-primary" : ""}`}
                          >
                            {ci === strikeIdx && isAtm ? (
                              <span className="inline-flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                {renderCell(row[ci] ?? "", h, ci === strikeIdx)}
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-primary/40 text-primary ml-1">
                                  ATM
                                </Badge>
                              </span>
                            ) : (
                              renderCell(row[ci] ?? "", h, ci === strikeIdx)
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr><td colSpan={headers.length} className="px-4 py-8 text-center text-muted-foreground">No rows match your search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-3 gap-3 mt-6 text-xs text-muted-foreground">
          <Card className="p-4 border-border/60">
            <div className="font-semibold text-foreground mb-1">POP</div>
            Probability of Profit at expiry — derived from spot, IV and time-to-expiry.
          </Card>
          <Card className="p-4 border-border/60">
            <div className="font-semibold text-foreground mb-1">PMP</div>
            Probability of Max Profit — the likelihood of the option reaching its maximum theoretical payoff.
          </Card>
          <Card className="p-4 border-border/60">
            <div className="font-semibold text-foreground mb-1">BE</div>
            Break-Even level the underlying must reach for the option buyer to recover the premium.
          </Card>
        </div>

        <p className="text-xs text-muted-foreground mt-6 max-w-3xl">
          Disclaimer: The data shown is for educational and informational purposes only and does not constitute investment advice. Options trading involves substantial risk of loss.
        </p>
      </main>
    </div>
  );
};

export default OptionsAnalysis;
