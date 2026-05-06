// Fetches verified PnL from Google Sheets and Nifty 50 monthly closes from Yahoo Finance
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEET_ID = "1OrcDZJ4AsKNsLB3U-lO8cVK-7Eb_tIe66iWVn_SsLNk";
const SHEET_NAME = "Verified PNL Statistics";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parseDate(s: string): Date | null {
  // "06- May-2025"
  const cleaned = s.replace(/\s+/g, "");
  const m = cleaned.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
  if (!m) return null;
  const day = parseInt(m[1]);
  const monIdx = MONTHS.indexOf(m[2]);
  if (monIdx < 0) return null;
  return new Date(Date.UTC(parseInt(m[3]), monIdx, day));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SHEETS_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!SHEETS_KEY) throw new Error("GOOGLE_SHEETS_API_KEY not configured");

    // Fetch sheet
    const sheetUrl = `${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}`;
    const sRes = await fetch(sheetUrl, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": SHEETS_KEY,
      },
    });
    if (!sRes.ok) throw new Error(`Sheet fetch failed [${sRes.status}]: ${await sRes.text()}`);
    const sheetData = await sRes.json();
    const rows: string[][] = sheetData.values || [];

    // Capital
    let capital = 3500000;
    if (rows[0]?.[10]?.toLowerCase().includes("capital") && rows[0][11]) {
      capital = parseFloat(rows[0][11]) || capital;
    }

    // Build daily series + per-month aggregation
    // Use cumulative PnL (column F = index 5) at month-end for monthly % return
    const monthlyEnd: { date: Date; cum: number; key: string; label: string }[] = [];
    let lastCum = 0;
    let firstDate: Date | null = null;
    let lastDate: Date | null = null;

    const byMonth = new Map<string, { date: Date; lastCum: number; label: string }>();

    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || !r[0]) continue;
      const d = parseDate(r[0]);
      if (!d) continue;
      const cumStr = r[5];
      let cum = lastCum;
      if (cumStr !== undefined && cumStr !== "") {
        const v = parseFloat(cumStr);
        if (!isNaN(v)) cum = v;
      }
      lastCum = cum;
      if (!firstDate) firstDate = d;
      lastDate = d;
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const label =
        `${MONTHS[d.getUTCMonth()]}` +
        (d.getUTCMonth() === 0 || byMonth.size === 0 ? ` '${String(d.getUTCFullYear()).slice(-2)}` : "");
      byMonth.set(key, { date: d, lastCum: cum, label });
    }

    const monthKeys = [...byMonth.keys()].sort();
    const monthlySeries = monthKeys.map((k) => byMonth.get(k)!);

    // Stats from sidebar columns K-L (index 10-11)
    const stats: Record<string, string> = {};
    const dayWise: Record<string, string> = {};
    let inDayWise = false;
    for (const r of rows.slice(1)) {
      const k = (r[10] || "").trim();
      const v = (r[11] || "").trim();
      if (!k) continue;
      if (k === "Day Wise Performance") { inDayWise = true; continue; }
      if (inDayWise && ["Mon","Tue","Wed","Thu","Fri"].includes(k)) {
        dayWise[k] = v;
      } else {
        stats[k] = v;
      }
    }

    // Fetch Nifty 50 monthly data from Yahoo Finance
    let niftyByMonth: Map<string, number> = new Map();
    let niftyError: string | null = null;
    try {
      if (firstDate && lastDate) {
        const p1 = Math.floor(firstDate.getTime() / 1000) - 86400 * 7;
        const p2 = Math.floor(lastDate.getTime() / 1000) + 86400;
        const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?period1=${p1}&period2=${p2}&interval=1d`;
        const yRes = await fetch(yUrl, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });
        if (yRes.ok) {
          const y = await yRes.json();
          const result = y?.chart?.result?.[0];
          const ts: number[] = result?.timestamp || [];
          const closes: (number | null)[] = result?.indicators?.quote?.[0]?.close || [];
          // For each month, take the last available close in that month
          const monthCloses = new Map<string, number>();
          for (let i = 0; i < ts.length; i++) {
            const c = closes[i];
            if (c == null) continue;
            const d = new Date(ts[i] * 1000);
            const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
            monthCloses.set(key, c);
          }
          niftyByMonth = monthCloses;
        } else {
          niftyError = `yahoo ${yRes.status}`;
        }
      }
    } catch (e) {
      niftyError = e instanceof Error ? e.message : String(e);
    }

    // Build chart series: cumulative % return for PMS and Nifty (vs first month baseline)
    const baselinePms = 0; // start at 0
    let niftyBase: number | null = null;
    for (const k of monthKeys) {
      const v = niftyByMonth.get(k);
      if (v != null) { niftyBase = v; break; }
    }

    const chart = monthlySeries.map((m, i) => {
      const k = monthKeys[i];
      const pmsPct = (m.lastCum / capital) * 100;
      const nVal = niftyByMonth.get(k);
      const niftyPct = nVal != null && niftyBase ? ((nVal - niftyBase) / niftyBase) * 100 : null;
      return {
        m: m.label,
        pms: parseFloat(pmsPct.toFixed(2)),
        nifty: niftyPct != null ? parseFloat(niftyPct.toFixed(2)) : null,
      };
    });

    const lastPmsPct = chart.length ? chart[chart.length - 1].pms : 0;
    const lastNiftyPct = [...chart].reverse().find((c) => c.nifty != null)?.nifty ?? null;

    const body = {
      capital,
      chart,
      stats,
      dayWise,
      summary: {
        pmsReturnPct: lastPmsPct,
        niftyReturnPct: lastNiftyPct,
        outperformancePct: lastNiftyPct != null ? parseFloat((lastPmsPct - lastNiftyPct).toFixed(2)) : null,
        netPnl: stats["Net PnL"] ? parseFloat(stats["Net PnL"]) : null,
      },
      niftyError,
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(body), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
    });
  } catch (e) {
    console.error("get-performance error", e);
    const msg = e instanceof Error ? e.message : "unknown";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
