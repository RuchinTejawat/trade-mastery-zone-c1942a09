import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowRight, ShieldCheck, TrendingUp, BookOpen, BarChart3, Award,
  CheckCircle2, LineChart as LineIcon, Users, Target, Sparkles, PlayCircle,
  Bot, Calculator, ShieldAlert, Sun, Wallet, UserCheck, AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-finance.jpg";

type ChartPoint = { m: string; pms: number; nifty: number | null };
type PerfData = {
  capital: number;
  chart: ChartPoint[];
  stats: Record<string, string>;
  summary: {
    pmsReturnPct: number;
    niftyReturnPct: number | null;
    outperformancePct: number | null;
    netPnl: number | null;
  };
  updatedAt: string;
};

// Fallback data shown while loading or if fetch fails
const fallback: PerfData = {
  capital: 3500000,
  chart: [
    { m: "May '25", pms: 4.54, nifty: 0 },
    { m: "May '26", pms: 29.21, nifty: -2.59 },
  ],
  stats: {
    "Net PnL": "1022503.8", "% returns": "29.21%", "Sharpe Ratio": "1.72",
    "Win Rate": "50.00%", "Average RR": "1.34", "Max DD": "-190040.0",
    "Average Profit": "34043.7",
  },
  summary: { pmsReturnPct: 29.21, niftyReturnPct: -2.59, outperformancePct: 31.8, netPnl: 1022503.8 },
  updatedAt: new Date().toISOString(),
};

const fmtINR = (n: number) => {
  if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
};

const services = [
  { icon: BarChart3, title: "Statistical Quant System", desc: "Data-driven, rules-based trading system built on statistical edges, rigorous backtests and disciplined risk management.", tag: "Flagship" },
];

const curriculum = [
  {
    module: "Module 1",
    title: "Basics of Options",
    topics: [
      "Call vs Put Options",
      "Strike Price, Premium, Expiry",
      "Option Buyer vs Seller: Rights & Obligations",
      "Intrinsic Value & Time Value",
      "Moneyness: ITM, ATM, OTM",
    ],
  },
  {
    module: "Module 2",
    title: "Analysis of Options",
    topics: [
      "Option Chain Analysis",
      "Concept of Open Interest",
      "Concept of PCR, Max Pain",
      "Option Greeks (Delta, Theta, Vega, Gamma, Rho)",
      "India VIX and IV",
      "IV Percentile & IV Rank",
    ],
  },
  {
    module: "Module 3",
    title: "Statistical Parameters",
    topics: [
      "Normal Distribution",
      "Z-Score and how it's calculated",
      "Standard Deviation",
      "Calculating Probability of Winning",
      "Volatility",
      "Expected Value",
      "Edge Factor",
      "Law of Large Numbers in Options",
      "Win Rate vs Risk-Reward vs Drawdown",
    ],
  },
  {
    module: "Module 4",
    title: "Option Strategies (Directional)",
    topics: ["System 1", "System 2"],
  },
  {
    module: "Module 5",
    title: "Option Strategies (Non-Directional)",
    topics: ["System 1", "System 2"],
  },
  {
    module: "Module 6",
    title: "Risk Management & Position Sizing",
    topics: [
      "Daily Risk Assessment",
      "Portfolio Management",
      "Drawdown Control",
      "Hedging",
      "Stop Loss & Trail SL Mechanics",
    ],
  },
];

const courseHighlights = [
  "Live + recorded sessions by SEBI-registered analysts",
  "Real, verified trade examples from our flagship strategy",
  "Statistical & probability-driven approach (not chart guessing)",
  "Hands-on with option chain, Greeks, IV and position sizing",
  "Lifetime access to recordings & curriculum updates",
  "Community access for doubt resolution",
];

const Index = () => {
  const [data, setData] = useState<PerfData>(fallback);

  useEffect(() => {
    let cancelled = false;
    supabase.functions.invoke("get-performance").then(({ data: d, error }) => {
      if (cancelled || error || !d) return;
      setData(d as PerfData);
    });
    return () => { cancelled = true; };
  }, []);

  const performance = data.chart;
  const pmsRet = data.summary.pmsReturnPct;
  const niftyRet = data.summary.niftyReturnPct;
  const outperf = data.summary.outperformancePct;
  const netPnl = data.summary.netPnl ?? 0;
  const sharpe = data.stats["Sharpe Ratio"] || "—";
  const winRate = data.stats["Win Rate"] || "—";
  const avgRR = data.stats["Average RR"] || "—";
  const avgProfit = data.stats["Average Profit"] ? fmtINR(parseFloat(data.stats["Average Profit"])) : "—";
  const maxDD = data.stats["Max DD"] ? `${((parseFloat(data.stats["Max DD"]) / data.capital) * 100).toFixed(2)}%` : "—";

  const stats = [
    { label: "1Y Net Return", value: `${pmsRet.toFixed(2)}%`, sub: "verified on Zerodha" },
    { label: "Net PnL", value: fmtINR(netPnl), sub: `on ${fmtINR(data.capital)} capital` },
    { label: "Sharpe Ratio", value: sharpe, sub: "risk-adjusted" },
    { label: "Win Rate", value: winRate, sub: `avg RR ${avgRR}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Vrddhi<span className="text-primary">.</span>Capital</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="#services" className="hover:text-foreground transition-colors">PMS</a>
            <a href="#courses" className="hover:text-foreground transition-colors">Academy</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
          </nav>
          <Button variant="default" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            Book a Call <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <Badge variant="outline" className="mb-6 border-primary/40 text-primary bg-primary/10 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> SEBI Registered RA · INH000017879
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Compound your <span className="text-gradient">capital.</span><br/>
              Master the <span className="text-gradient-gold">markets.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              India's research-first fintech delivering institutional-grade PMS strategies and a world-class stock market academy — built by SEBI-registered analysts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-12 px-6">
                Explore PMS <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 border-border/60 hover:bg-secondary">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                [`${pmsRet.toFixed(2)}%`, "1Y Return"],
                [fmtINR(netPnl), "Net PnL"],
                [sharpe, "Sharpe"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold font-mono text-gradient">{v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-full" />
            <img src={heroImg} alt="Live trading performance dashboard" width={1536} height={1024}
              className="relative rounded-2xl shadow-elegant border border-border/60" />
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-elegant hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/15 grid place-items-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Verified Net Return</div>
                  <div className="font-mono font-semibold text-success">+{pmsRet.toFixed(2)}% in 1Y</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
          {stats.map(s => (
            <div key={s.label} className="px-6 py-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-3xl md:text-4xl font-bold font-mono text-gradient">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance chart */}
      <section id="performance" className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary bg-primary/5">
              <LineIcon className="h-3.5 w-3.5 mr-1.5" /> Verified Performance
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">12 months of <span className="text-gradient">verified alpha.</span></h2>
            <p className="mt-4 text-muted-foreground">Cumulative net returns of our flagship Quant PMS, independently verified on Zerodha. Capital base ₹35,00,000. Past performance is not indicative of future results.</p>
          </div>
          <Card className="bg-gradient-card border-border/60 p-6 md:p-8 shadow-elegant">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
                  <span className="text-muted-foreground">Vrddhi Quant PMS</span>
                  <span className="font-mono font-semibold text-primary">{pmsRet >= 0 ? "+" : ""}{pmsRet.toFixed(2)}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Nifty 50</span>
                  <span className="font-mono font-semibold text-accent">
                    {niftyRet != null ? `${niftyRet >= 0 ? "+" : ""}${niftyRet.toFixed(2)}%` : "—"}
                  </span>
                </div>
                {outperf != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Alpha</span>
                    <span className="font-mono font-semibold text-success">+{outperf.toFixed(2)}%</span>
                  </div>
                )}
              </div>
              <a href="https://console.zerodha.com/verified/c4b578ef" target="_blank" rel="noopener noreferrer">
                <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/25 cursor-pointer">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Zerodha Verified P&L
                </Badge>
              </a>
            </div>
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performance} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="pmsG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="nifG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v)=>`${v}%`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(v: number, name: string) => [`${v}%`, name === "pms" ? "PMS" : "Nifty 50"]}
                  />
                  <Area type="monotone" dataKey="nifty" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#nifG)" connectNulls />
                  <Area type="monotone" dataKey="pms" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#pmsG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Verified key metrics */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              ["Net PnL", fmtINR(netPnl)],
              ["% Return", `${pmsRet.toFixed(2)}%`],
              ["Sharpe", sharpe],
              ["Win Rate", winRate],
              ["Avg RR", avgRR],
              ["Max DD", maxDD],
              ["Avg Profit", avgProfit],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border/60 bg-card/40 p-4">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 font-mono font-semibold text-foreground">{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Live data · auto-synced from verified Zerodha P&L · Last updated{" "}
            {new Date(data.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-card/20 border-y border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary bg-primary/5">PMS Strategies</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">A single, focused <span className="text-gradient">quant strategy.</span></h2>
          </div>
          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
            {services.map((s) => (
              <Card key={s.title} className="group relative bg-gradient-card border-border/60 p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="border-border/60 text-xs">{s.tag}</Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-6 flex items-center text-primary text-sm font-medium hover:underline">
                      Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/60">
                    <DialogHeader>
                      <DialogTitle className="text-3xl">
                        Flagship Intraday Index Options Strategy
                      </DialogTitle>
                      <DialogDescription>
                        A professionally designed, fully-automated quantitative options-selling system
                        built on probabilities, statistics & disciplined risk management.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Philosophy */}
                    <div className="mt-2 rounded-xl border border-border/60 bg-background/40 p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        At <span className="text-foreground font-medium">Vrddhi Capital</span>, we believe successful trading
                        is not built on predictions, emotions, or guesswork — it is built on
                        <span className="text-primary"> probabilities, statistics, disciplined risk management,
                        and systematic execution.</span> Our flagship strategy trades weekly expiry options on
                        <span className="text-foreground font-medium"> NIFTY 50</span> and
                        <span className="text-foreground font-medium"> BSE SENSEX</span> using a quantitative framework.
                      </p>
                    </div>

                    {/* Live verified metrics */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                        Live Verified Performance
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { label: "1Y Return", value: `${pmsRet.toFixed(2)}%` },
                          { label: "Net PnL", value: fmtINR(netPnl) },
                          { label: "Capital Base", value: fmtINR(data.capital) },
                          { label: "Sharpe Ratio", value: sharpe },
                          { label: "Win Rate", value: winRate },
                          { label: "Avg RR", value: avgRR },
                          { label: "Avg Profit", value: avgProfit },
                          { label: "Max Drawdown", value: maxDD },
                          { label: "vs Nifty 50", value: outperf != null ? `+${outperf.toFixed(2)}%` : "—" },
                        ].map((m) => (
                          <div key={m.label} className="rounded-lg border border-border/60 bg-background/40 p-4">
                            <div className="text-xs text-muted-foreground">{m.label}</div>
                            <div className="text-lg font-bold font-mono text-gradient mt-1">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Equity curve mini chart */}
                    <div className="rounded-xl border border-border/60 bg-background/40 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                          Cumulative Equity Curve
                        </h4>
                        <span className="text-xs text-muted-foreground">PMS vs Nifty 50</span>
                      </div>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performance} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                            <defs>
                              <linearGradient id="dlgPms" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v)=>`${v}%`} />
                            <Tooltip
                              contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
                              formatter={(v: number, name: string) => [`${v}%`, name === "pms" ? "PMS" : "Nifty 50"]}
                            />
                            <Area type="monotone" dataKey="nifty" stroke="hsl(var(--accent))" strokeWidth={1.5} fill="none" connectNulls />
                            <Area type="monotone" dataKey="pms" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#dlgPms)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Fully Automated */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Bot className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Fully Automated Execution</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        All trades execute directly in the client's demat & trading account — zero manual
                        intervention. Once activated, the system handles the entire trade lifecycle:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          "Trade identification", "Entry execution", "Risk management",
                          "Stop-loss management", "Position adjustments", "Exit execution",
                        ].map(t => (
                          <div key={t} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                            <span className="text-muted-foreground">{t}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid sm:grid-cols-2 gap-2">
                        {[
                          "No emotional decision-making",
                          "No discretionary trading",
                          "No need to monitor charts",
                          "Consistent rule-based execution",
                        ].map(t => (
                          <div key={t} className="flex items-center gap-2 text-sm rounded-lg bg-primary/5 border border-primary/20 px-3 py-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quant Edge */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Quantitative & Statistical Edge</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Unlike traditional option-selling that relies on views or indicators, our strategy
                        uses advanced statistical concepts to identify high-probability opportunities:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "Normal Distribution Models",
                          "Z-Score Calculations",
                          "PMP — Probability of Maximum Profit",
                          "Volatility-based calculations",
                          "Probability-driven risk assessment",
                        ].map(t => (
                          <div key={t} className="flex items-center gap-2 text-sm rounded-lg border border-border/60 bg-background/40 px-3 py-2">
                            <Target className="h-4 w-4 text-primary shrink-0" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        The objective is not to predict every move — it is to build a long-term statistical
                        edge through disciplined execution and controlled risk.
                      </p>
                    </div>

                    {/* Risk Framework */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Defined Risk Framework</h4>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground">Daily Risk Limit</div>
                          <div className="text-3xl font-bold font-mono text-success mt-1">~1%</div>
                          <div className="text-xs text-muted-foreground mt-1">of trading capital per day</div>
                        </div>
                        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                          <div className="text-xs uppercase tracking-widest text-muted-foreground">VAR (Value at Risk)</div>
                          <div className="text-3xl font-bold font-mono text-primary mt-1">&lt; 15%</div>
                          <div className="text-xs text-muted-foreground mt-1">controlled exposure even in volatile markets</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                        The goal is not aggressive leverage — it is sustainable, structured capital deployment.
                      </p>
                    </div>

                    {/* Pure Intraday */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sun className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Pure Intraday — No Overnight Risk</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        All positions are squared off the same trading day, eliminating:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Overnight gap risk",
                          "Global event risk",
                          "Overnight volatility shocks",
                          "After-hours news impact",
                        ].map(t => (
                          <div key={t} className="flex items-center gap-2 text-sm rounded-lg bg-destructive/5 border border-destructive/20 px-3 py-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0" />
                            <span className="text-muted-foreground">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capital Requirement */}
                    <div className="rounded-xl border border-border/60 bg-gradient-card p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Wallet className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Capital Requirement</h4>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Minimum Recommended</span>
                        <span className="text-3xl font-bold font-mono text-gradient">₹10 Lakhs</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 mb-2">Margin can be arranged through:</p>
                      <div className="flex flex-wrap gap-2">
                        {["Cash", "Liquid Funds", "Approved Stock Collateral", "ETFs & Eligible Instruments"].map(t => (
                          <Badge key={t} variant="outline" className="border-primary/30 bg-primary/5">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Suitable For */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Suitable For</h4>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "Professionals seeking systematic trading exposure",
                          "Investors who want non-discretionary execution",
                          "Traders preferring defined-risk strategies",
                          "Anyone wanting automated options trading",
                          "Participants seeking probability-based systems",
                        ].map(t => (
                          <div key={t} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">Important:</span> Options trading involves
                        market risk and past performance does not guarantee future returns. The strategy is built
                        on statistical principles and disciplined risk management, but losses can occur during
                        adverse market conditions. Please understand the framework and associated risks before
                        deployment.
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
                      <p className="text-xs text-muted-foreground">
                        Live data · auto-synced · Last updated{" "}
                        {new Date(data.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                      <a href="https://console.zerodha.com/verified/c4b578ef" target="_blank" rel="noopener noreferrer">
                        <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/25 cursor-pointer">
                          <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> View Detailed Strategy Performance
                        </Badge>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-24">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <Badge variant="outline" className="mb-4 border-accent/40 text-accent bg-accent/5">
              <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Vrddhi Academy
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Learn the markets from <span className="text-gradient-gold">SEBI-registered analysts.</span></h2>
          </div>

          <Card className="relative overflow-hidden bg-gradient-card border-border/60 p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/5 pointer-events-none" />
            <div className="relative grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <Badge className="bg-secondary/80 text-foreground border-0 mb-4">Flagship · Beginner to Advanced</Badge>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Statistical Options Trading Program</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A structured, statistics-first program built for serious traders who want to move beyond guesswork. Learn the exact framework — probability, volatility, Greeks, position sizing and disciplined risk management — that powers our verified flagship strategy.
                </p>
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <div className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-primary" /><span><span className="font-semibold text-foreground">2 weeks</span> · Live + Recorded</span></div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /><span>Cohort + community</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /><span>SEBI RA INH000017879</span></div>
                </div>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/40 p-6 flex flex-col gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Program Fee</div>
                  <div className="text-4xl font-bold font-mono text-gradient mt-1">₹20,000</div>
                  <div className="text-xs text-muted-foreground">+ GST · one-time</div>
                </div>
                <div className="text-sm text-muted-foreground space-y-1.5">
                  <div className="flex justify-between"><span>Duration</span><span className="text-foreground font-medium">2 weeks</span></div>
                  <div className="flex justify-between"><span>Modules</span><span className="text-foreground font-medium">6</span></div>
                  <div className="flex justify-between"><span>Level</span><span className="text-foreground font-medium">Basics → Advanced</span></div>
                  <div className="flex justify-between"><span>Mode</span><span className="text-foreground font-medium">Online · Live</span></div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">View Curriculum <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Statistical Options Trading Program</DialogTitle>
                      <DialogDescription>Basics to Advanced · 6 Modules · 2 Weeks · ₹20,000</DialogDescription>
                    </DialogHeader>

                    <div className="grid sm:grid-cols-3 gap-3 mt-2">
                      <div className="rounded-lg border border-border/60 p-3">
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="text-lg font-semibold">2 Weeks</div>
                      </div>
                      <div className="rounded-lg border border-border/60 p-3">
                        <div className="text-xs text-muted-foreground">Fees</div>
                        <div className="text-lg font-semibold">₹20,000 <span className="text-xs text-muted-foreground">+ GST</span></div>
                      </div>
                      <div className="rounded-lg border border-border/60 p-3">
                        <div className="text-xs text-muted-foreground">Format</div>
                        <div className="text-lg font-semibold">Live + Recorded</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">What you'll get</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {courseHighlights.map((h) => (
                          <div key={h} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Curriculum</h4>
                      <div className="space-y-3">
                        {curriculum.map((m) => (
                          <div key={m.module} className="rounded-lg border border-border/60 p-4 bg-card/30">
                            <div className="flex items-baseline gap-3 mb-2">
                              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5">{m.module}</Badge>
                              <h5 className="font-semibold">{m.title}</h5>
                            </div>
                            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              {m.topics.map((t, i) => (
                                <li key={t} className="flex gap-2">
                                  <span className="font-mono text-primary/70">{i + 1}.</span>
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground flex gap-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Options trading involves market risk. The program teaches a statistical framework — past performance and educational examples do not guarantee future returns.</span>
                    </div>

                    <Button asChild className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
                      <a href="https://forms.gle/f83wDqZDcqLfhf6v9" target="_blank" rel="noopener noreferrer">Enroll Now — ₹20,000</a>
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust / About */}
      <section id="about" className="py-24 bg-card/20 border-y border-border/60">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary bg-primary/5">
              <Award className="h-3.5 w-3.5 mr-1.5" /> Regulated & Trusted
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Compliance-first. <span className="text-gradient">Research-led.</span></h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Vrddhi Capital is a SEBI-registered Research Analyst (Reg. No. <span className="font-mono text-foreground">INH000017879</span>). Every strategy we publish is backed by quantitative research, peer review, and a strict compliance framework.
            </p>
            <ul className="space-y-3">
              {[
                "SEBI Registered Research Analyst — INH000017879",
                "Independent custody via SEBI-registered brokers",
                "Quarterly audited performance reports",
                "End-to-end encrypted client portal",
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, k: "340+", v: "Active Investors" },
              { icon: Sparkles, k: "5+ yrs", v: "Combined Research" },
              { icon: ShieldCheck, k: "100%", v: "SEBI Compliant" },
              { icon: TrendingUp, k: "78%", v: "Win Rate" },
            ].map(b => (
              <Card key={b.v} className="bg-gradient-card border-border/60 p-6">
                <b.icon className="h-6 w-6 text-primary mb-4" />
                <div className="text-3xl font-bold font-mono text-gradient">{b.k}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.v}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <Card className="relative overflow-hidden bg-gradient-card border-border/60 p-12 md:p-16 text-center shadow-elegant">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[600px] bg-primary/20 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                Ready to invest with <span className="text-gradient">research-backed</span> conviction?
              </h2>
              <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
                Schedule a 30-minute consultation with our portfolio managers. No obligations.
              </p>
              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-12 px-8">
                  <a href="https://forms.gle/chUXyDfLjCkWWvTH8" target="_blank" rel="noopener noreferrer">
                    Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 border-border/60">
                  Download Factsheet
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12">
        <div className="container grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight text-lg">Vrddhi<span className="text-primary">.</span>Capital</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              SEBI Registered Research Analyst · INH000017879. Investments in securities markets are subject to market risks. Read all related documents carefully before investing.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>About</li><li>Performance</li><li>Disclosures</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Terms</li><li>Privacy</li><li>SEBI Disclosure</li><li>Grievance Redressal</li>
            </ul>
          </div>
        </div>
        <div className="container mt-10 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>© 2026 Vrddhi Capital. All rights reserved.</span>
          <span className="font-mono">INH000017879</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
