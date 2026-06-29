import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BookCallDialog } from "@/components/BookCallDialog";

type SheetResp = { rows: string[][]; updatedAt: string; error?: string };

const isNumeric = (v: string) => v !== "" && !isNaN(Number(v.replace(/,/g, "").replace("%", "")));

const formatCell = (v: string, header: string) => {
  if (v == null || v === "") return "—";
  const h = header.toLowerCase();
  if (h.includes("%") || h.includes("pop") || h.includes("prob")) {
    if (isNumeric(v)) {
      const n = Number(v.replace("%", ""));
      const pct = Math.abs(n) <= 1 ? n * 100 : n;
      return `${pct.toFixed(2)}%`;
    }
  }
  if (isNumeric(v)) {
    const n = Number(v.replace(/,/g, ""));
    if (Number.isInteger(n) && Math.abs(n) >= 1000) return n.toLocaleString("en-IN");
    return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  }
  return v;
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

  const { headers, rows } = useMemo(() => {
    const all = data?.rows ?? [];
    if (!all.length) return { headers: [] as string[], rows: [] as string[][] };
    const headers = all[0];
    const body = all.slice(1).filter((r) => r.some((c) => (c ?? "").toString().trim() !== ""));
    return { headers, rows: body };
  }, [data]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => r.some((c) => (c ?? "").toString().toLowerCase().includes(q)));
  }, [rows, query]);

  const updated = data?.updatedAt ? new Date(data.updatedAt).toLocaleString("en-IN") : null;

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

      <main className="container pt-28 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Nifty <span className="text-gradient">Options Analysis</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Strike-wise LTP, PMP (Probabilistic Mid Price) and POP (Probability of Profit) for Nifty options.
              Auto-refreshed from our quant calculation engine.
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
                className="pl-9 w-48"
              />
            </div>
            <Button variant="outline" size="icon" onClick={load} disabled={loading} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-border/60">
          {loading && !data && (
            <div className="p-12 text-center text-muted-foreground">Loading calculations…</div>
          )}
          {error && (
            <div className="p-8 text-center">
              <Badge variant="destructive" className="mb-3">Couldn't load data</Badge>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">{error}</p>
              <p className="text-xs text-muted-foreground mt-3">
                If this is a permissions error, share the Google Sheet (view access) with the same service account used for the performance sheet.
              </p>
            </div>
          )}
          {!loading && !error && headers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="text-left font-semibold px-4 py-3 whitespace-nowrap text-foreground">
                        {h || `Col ${i + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, ri) => (
                    <tr key={ri} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      {headers.map((h, ci) => {
                        const raw = row[ci] ?? "";
                        const v = formatCell(raw, h);
                        const num = isNumeric(raw);
                        return (
                          <td
                            key={ci}
                            className={`px-4 py-3 whitespace-nowrap ${num ? "font-mono tabular-nums text-right" : ""} ${ci === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                          >
                            {v}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={headers.length} className="px-4 py-8 text-center text-muted-foreground">No rows match your search.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <p className="text-xs text-muted-foreground mt-6 max-w-3xl">
          Disclaimer: The data shown is for educational and informational purposes only and should not be construed as investment advice. Options trading involves substantial risk.
        </p>
      </main>
    </div>
  );
};

export default OptionsAnalysis;
