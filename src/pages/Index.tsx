import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, ShieldCheck, TrendingUp, BookOpen, BarChart3, Award,
  CheckCircle2, LineChart as LineIcon, Users, Target, Sparkles, PlayCircle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import heroImg from "@/assets/hero-finance.jpg";

// Verified PnL data (capital base ₹35,00,000) — sourced from Zerodha verified P&L
const performance = [
  { m: "May '25", pms: 4.54 },
  { m: "Jun", pms: 9.74 },
  { m: "Jul", pms: 10.69 },
  { m: "Aug", pms: 11.51 },
  { m: "Sep", pms: 10.77 },
  { m: "Oct", pms: 16.85 },
  { m: "Nov", pms: 19.47 },
  { m: "Dec", pms: 22.20 },
  { m: "Jan '26", pms: 18.59 },
  { m: "Feb", pms: 25.92 },
  { m: "Mar", pms: 27.19 },
  { m: "Apr", pms: 31.78 },
  { m: "May '26", pms: 29.21 },
];

const stats = [
  { label: "1Y Net Return", value: "29.21%", sub: "verified on Zerodha" },
  { label: "Net PnL", value: "₹10.22 L", sub: "on ₹35 L capital" },
  { label: "Sharpe Ratio", value: "1.72", sub: "risk-adjusted" },
  { label: "Win Rate", value: "50%", sub: "avg RR 1.34" },
];

const services = [
  { icon: BarChart3, title: "Quant PMS", desc: "Algorithm-driven portfolio of 18-22 large & mid caps, rebalanced monthly.", tag: "Flagship" },
  { icon: Target, title: "Multi-Cap Alpha", desc: "Concentrated bets across market caps with strict risk overlays and stop-loss discipline.", tag: "Aggressive" },
  { icon: ShieldCheck, title: "Wealth Preserver", desc: "Low-volatility strategy combining bluechips, ETFs and arbitrage for steady compounding.", tag: "Conservative" },
];

const courses = [
  { title: "Stock Market 101", level: "Beginner", price: "₹2,499", hours: "12h", lessons: 48, color: "from-emerald-500/20 to-emerald-500/5" },
  { title: "Technical Analysis Pro", level: "Intermediate", price: "₹6,999", hours: "28h", lessons: 96, color: "from-amber-500/20 to-amber-500/5" },
  { title: "Options & Derivatives", level: "Advanced", price: "₹9,999", hours: "34h", lessons: 110, color: "from-emerald-500/20 to-emerald-500/5" },
  { title: "Quant & Algo Trading", level: "Expert", price: "₹14,999", hours: "42h", lessons: 132, color: "from-amber-500/20 to-amber-500/5" },
];

const Index = () => {
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
              {[["29.21%","1Y Return"],["₹10.22L","Net PnL"],["1.72","Sharpe"]].map(([v,l])=>(
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
                  <div className="font-mono font-semibold text-success">+29.21% in 1Y</div>
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
            <h2 className="text-4xl md:text-5xl font-bold">12 months of <span className="text-gradient">consistent alpha.</span></h2>
            <p className="mt-4 text-muted-foreground">Net cumulative returns of our flagship Quant PMS vs Nifty 50 benchmark. Past performance is not indicative of future results.</p>
          </div>
          <Card className="bg-gradient-card border-border/60 p-6 md:p-8 shadow-elegant">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
                  <span className="text-muted-foreground">Vrddhi Quant PMS</span>
                  <span className="font-mono font-semibold text-primary">+42.3%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Nifty 50</span>
                  <span className="font-mono font-semibold text-accent">+17.4%</span>
                </div>
              </div>
              <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/15">Outperformed by 24.9%</Badge>
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
                    formatter={(v: number) => `${v}%`}
                  />
                  <Area type="monotone" dataKey="pms" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#pmsG)" />
                  <Area type="monotone" dataKey="nifty" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#nifG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-card/20 border-y border-border/60">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary bg-primary/5">PMS Strategies</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Portfolios engineered for <span className="text-gradient">every risk profile.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Card key={s.title} className="group relative bg-gradient-card border-border/60 p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="border-border/60 text-xs">{s.tag}</Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center text-primary text-sm font-medium">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4 border-accent/40 text-accent bg-accent/5">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Vrddhi Academy
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Learn the markets from <span className="text-gradient-gold">SEBI-registered analysts.</span></h2>
            </div>
            <Button variant="outline" className="border-border/60">View all courses <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <Card key={c.title} className={`group relative overflow-hidden bg-gradient-card border-border/60 p-6 hover:border-accent/40 transition-all hover:-translate-y-1`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <Badge className="bg-secondary/80 text-foreground border-0 mb-4">{c.level}</Badge>
                  <h3 className="text-xl font-semibold leading-tight mb-3">{c.title}</h3>
                  <div className="flex gap-4 text-xs text-muted-foreground mb-6 font-mono">
                    <span>{c.hours}</span><span>·</span><span>{c.lessons} lessons</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-2xl font-bold font-mono text-gradient">{c.price}</span>
                    <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                      Enroll <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
                <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow h-12 px-8">
                  Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
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
