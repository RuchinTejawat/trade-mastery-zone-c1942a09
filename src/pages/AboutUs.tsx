import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Users, CheckCircle2, TrendingUp, Award, Briefcase, Code } from "lucide-react";
import { Card } from "@/components/ui/card";

const team = [
  {
    name: "Kishore Kumar",
    exp: "15+ years",
    title: "Senior Software Engineer | Trading Systems & Infrastructure",
    highlights: ["Ex — Wipro / Honeywell", "Deep experience with broker APIs", "Designed distributed algo execution", "Strong DevOps exposure"],
    icon: Code,
  },
  {
    name: "CA Prachi Mehta",
    exp: "8+ years",
    title: "Chartered Accountant | SEBI Registered Research Analyst",
    highlights: ["SEBI RA — INH000017879", "Ex. Hedge Fund Admin (Citco, Morgan Stanley)", "Expertise in Cash Market Portfolios", "Designing Swing & Long-Term Investing Systems"],
    icon: Award,
  },
  {
    name: "Ruchin Tejawat",
    exp: "12+ years",
    title: "Real-Time Trading Strategist | Quant Research",
    highlights: ["Alumnus — IIT Kanpur", "Research Associate — IIM Udaipur", "Statistical Designing of Options Trading Systems", "Managing Different Risk Profiles"],
    icon: TrendingUp,
  },
  {
    name: "Aviroop",
    exp: "2 years",
    title: "Developer | Front End & Backend",
    highlights: ["MongoDB, Express, Redis, Node.js", "Experience in AI/ML Projects"],
    icon: Briefcase,
  },
  {
    name: "SoumyaDeep",
    exp: "2 years",
    title: "Developer | Front End & Backend",
    highlights: ["MongoDB, Express, Redis, Node.js"],
    icon: Briefcase,
  },
  {
    name: "Anurag",
    exp: "4–5 years",
    title: "Developer | Front End & Backend",
    highlights: ["MongoDB, Express, Redis, Node.js"],
    icon: Briefcase,
  },
];

const AboutUs = () => {
  const url = "https://trade-mastery-zone.lovable.app/about";
  const title = "About Us — Proption Fintech";
  const description =
    "Meet the team behind Proption Fintech. A diverse team of engineers, analysts, and researchers building quantitative systems for the Indian markets.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: title,
          description,
          url,
          publisher: { "@type": "Organization", name: "Proption Fintech" },
        })}</script>
      </Helmet>

      <header className="border-b border-border/60">
        <div className="container py-6 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <span className="text-sm font-semibold">Proption Fintech</span>
        </div>
      </header>

      <main className="container max-w-6xl py-16">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-6">
            <Users className="h-3.5 w-3.5" /> About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the <span className="text-gradient">Team</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A diverse team of engineers, analysts, and researchers building quantitative systems for the Indian markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="bg-gradient-card border-border/60 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center">
                  <member.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.exp} of experience</p>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground/90 mb-3">{member.title}</p>
              <ul className="space-y-2 mt-auto">
                {member.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/60 mt-auto">
        <div className="container py-8 text-xs text-muted-foreground text-center">
          © 2026 Proption Fintech. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
