import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEET_ID = "17fKAc-832tw00pVbZNccPzWEgv9MBbVYdvfmCKlQdB4";
const SHEET_NAME = "Calculations";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SHEETS_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (!SHEETS_KEY) throw new Error("GOOGLE_SHEETS_API_KEY not configured");

    const url = `${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": SHEETS_KEY,
      },
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Sheet fetch failed [${res.status}]: ${t}`);
    }
    const data = await res.json();
    const rows: string[][] = data.values || [];

    return new Response(
      JSON.stringify({ rows, updatedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=60" } },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("get-options-analysis error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
