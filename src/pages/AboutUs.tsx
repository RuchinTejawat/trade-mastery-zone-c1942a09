import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Users, CheckCircle2, TrendingUp, Award, Briefcase, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const team = [
  {
    name: "Kishore Kumar",
    exp: "15+ years",
    title: "Senior Software Engineer | Trading Systems & Infrastructure",
    bio: "Kishore brings over 15 years of deep hands-on experience in designing, building, and maintaining automated trading infrastructure. Having worked at global technology leaders like Wipro and Honeywell, he specializes in broker API integrations, distributed algorithmic execution engines, and robust DevOps practices that keep mission-critical trading systems running 24/7.",
    highlights: ["Ex — Wipro / Honeywell", "Deep experience with broker APIs", "Designed distributed algo execution", "Strong DevOps exposure"],
    icon: Code,
  },
  {
    name: "CA Prachi Mehta",
    exp: "8+ years",
    title: "Chartered Accountant | SEBI Registered Research Analyst",
    bio: "A Chartered Accountant and SEBI Registered Research Analyst (INH000017879), Prachi has spent over 8 years at the intersection of finance, compliance, and fund administration. Her prior roles at Citco and Morgan Stanley gave her an insider's view into hedge fund operations, cash-market portfolio construction, and the design of disciplined swing and long-term investing frameworks.",
    highlights: ["SEBI RA — INH000017879", "Ex. Hedge Fund Admin (Citco, Morgan Stanley)", "Expertise in Cash Market Portfolios", "Designing Swing & Long-Term Investing Systems"],
    icon: Award,
  },
  {
    name: "Ruchin Tejawat",
    exp: "12+ years",
    title: "Real-Time Trading Strategist | Quant Research",
    bio: "An IIT Kanpur alumnus and Research Associate at IIM Udaipur, Ruchin combines academic rigor with 12+ years of live-market experience. His expertise lies in the statistical design of options trading systems, dynamic risk profiling, and translating quantitative research into profitable, real-time execution strategies.",
    highlights: ["Alumnus — IIT Kanpur", "Research Associate — IIM Udaipur", "Statistical Designing of Options Trading Systems", "Managing Different Risk Profiles"],
    icon: TrendingUp,
  },
  {
    name: "Aviroop",
    exp: "2 years",
    title: "Developer | Front End & Backend",
    bio: "Aviroop is a full-stack developer with hands-on experience across the MERN stack (MongoDB, Express, Redis, Node.js). He is passionate about building clean, responsive user interfaces and scalable backend services, and has contributed to AI/ML projects that enhance trading analytics.",
    highlights: ["MongoDB, Express, Redis, Node.js", "Experience in AI/ML Projects"],
    icon: Briefcase,
  },
  {
    name: "SoumyaDeep",
    exp: "2 years",
    title: "Developer | Front End & Backend",
    bio: "SoumyaDeep is a versatile full-stack developer skilled in building end-to-end web applications using MongoDB, Express, Redis, and Node.js. He focuses on delivering performant, reliable systems that power the front-end experience and backend operations alike.",
    highlights: ["MongoDB, Express, Redis, Node.js"],
    icon: Briefcase,
  },
  {
    name: "Anurag",
    exp: "4–5 years",
    title: "Developer | Front End & Backend",
    bio: "With 4–5 years of engineering experience, Anurag is a full-stack developer proficient in the MERN ecosystem. He architects and maintains the server-side logic, database schemas, and API layers that keep Proption's platforms fast, secure, and scalable.",
    highlights: ["MongoDB, Express, Redis, Node.js"],
    icon: Briefcase,
  },
];

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
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

        <div className="flex flex-col gap-6">
          {team.map((member) => (
            <Card key={member.name} className="bg-gradient-card border-border/60 p-6 flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-4 md:w-72 shrink-0">
                <div className="h-12 w-12 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                  <member.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.exp} of experience</p>
                  <p className="text-sm font-medium text-foreground/90 mt-1">{member.title}</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <ul className="flex flex-col gap-2">
                  {member.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start mt-1"
                  onClick={() => setSelectedMember(member)}
                >
                  View profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          {selectedMember && (
            <DialogContent className="max-w-lg w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto p-5 sm:p-6">
              <DialogHeader className="text-left">
                <DialogTitle asChild>
                  <div className="flex items-start gap-3 pr-8">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <selectedMember.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base sm:text-lg font-bold leading-tight">{selectedMember.name}</div>
                      <div className="text-xs text-muted-foreground font-normal mt-0.5">{selectedMember.title}</div>
                    </div>
                  </div>
                </DialogTitle>
                <DialogDescription className="sr-only">{selectedMember.name} profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Highlights</h4>
                  <ul className="flex flex-col gap-2">
                    {selectedMember.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
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
