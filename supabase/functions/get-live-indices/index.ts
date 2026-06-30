// Live quotes for Nifty 50 and Sensex via Yahoo Finance chart endpoint
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Quote = {
  symbol: string;
  name: string;
  price: number | null;
  prevClose: number | null;
  change: number | null;
  changePct: number | null;
};

const SYMBOLS: { symbol: string; name: string }[] = [
  { symbol: "^NSEI", name: "NIFTY 50" },
  { symbol: "^BSESN", name: "SENSEX" },
  { symbol: "^NSEBANK", name: "BANK NIFTY" },
  { symbol: "^INDIAVIX", name: "INDIA VIX" },
];

async function fetchQuote(symbol: string, name: string): Promise<Quote> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "application/json",
      },
    });
    if (!r.ok) throw new Error(`status ${r.status}`);
    const j = await r.json();
    const result = j?.chart?.result?.[0];
    const meta = result?.meta;
    const price = meta?.regularMarketPrice ?? null;
    const prev = meta?.chartPreviousClose ?? meta?.previousClose ?? null;
    const change = price != null && prev != null ? price - prev : null;
    const changePct = change != null && prev ? (change / prev) * 100 : null;
    return { symbol, name, price, prevClose: prev, change, changePct };
  } catch (_e) {
    return { symbol, name, price: null, prevClose: null, change: null, changePct: null };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const quotes = await Promise.all(SYMBOLS.map((s) => fetchQuote(s.symbol, s.name)));
    return new Response(
      JSON.stringify({ quotes, updatedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
