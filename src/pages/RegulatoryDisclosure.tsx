import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const RegulatoryDisclosure = () => {
  const url = "https://trade-mastery-zone.lovable.app/regulatory-disclosure";
  const title = "Regulatory Disclosure — Proption Fintech & SEBI RA CA Prachi Mehta";
  const description =
    "Proption Fintech is NOT SEBI-registered. Research on this platform is independently authored by CA Prachi Mehta, SEBI Registered Research Analyst (INH000017879).";

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
          "@type": "WebPage",
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

      <main className="container max-w-3xl py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-6">
          <ShieldCheck className="h-3.5 w-3.5" /> Regulatory Disclosure
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Regulatory Disclosure
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          This page sets out the regulatory relationship between Proption Fintech and the
          SEBI Registered Research Analyst whose research is published on this platform.
          Please read this carefully before using any content, research, or educational
          material made available here.
        </p>

        <section className="space-y-6 text-[15px] leading-relaxed">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Key Disclosure</h2>
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Proption Fintech is NOT a SEBI-registered entity.</span>{" "}
              It operates as a quant-led research and education firm and does not provide
              investment advisory or portfolio management services in its own capacity.
            </p>
            <p className="text-muted-foreground mt-3">
              All research published on this platform is independently authored and backed
              by <span className="text-foreground font-medium">CA Prachi Mehta</span>, a
              SEBI Registered Research Analyst (Registration No.{" "}
              <span className="font-mono text-foreground">INH000017879</span>).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About Proption Fintech</h2>
            <p className="text-muted-foreground">
              Proption Fintech is a quant-led research and market education firm. We build
              data-driven market insights, educational content, and quantitative strategy
              frameworks. We do not solicit funds, manage client portfolios, or provide
              personalised investment advice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About the SEBI Registered Research Analyst</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="text-foreground font-medium">Name:</span> CA Prachi Mehta</li>
              <li><span className="text-foreground font-medium">Capacity:</span> SEBI Registered Research Analyst (RA)</li>
              <li><span className="text-foreground font-medium">Registration No.:</span> <span className="font-mono">INH000017879</span></li>
            </ul>
            <p className="text-muted-foreground mt-3">
              All research reports, recommendations, and analyst opinions surfaced on
              Proption Fintech are issued under the independent authority and
              responsibility of CA Prachi Mehta in her capacity as a SEBI Registered
              Research Analyst.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Investor Grievance</h2>
            <p className="text-muted-foreground">
              For any grievance, please write to{" "}
              <a href="mailto:proptionfintech@gmail.com" className="text-primary hover:underline">
                proptionfintech@gmail.com
              </a>
              . For research-related grievances pertaining to the SEBI Registered
              Research Analyst, you may also escalate to SEBI via the SCORES portal at{" "}
              <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                scores.sebi.gov.in
              </a>{" "}
              or use the Online Dispute Resolution (ODR) portal at{" "}
              <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                smartodr.in
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Standard Disclaimer</h2>
            <p className="text-muted-foreground">
              Registration granted by SEBI, membership of BASL, and certification from
              NISM in no way guarantee performance or provide any assurance of returns to
              investors. Investments in securities markets are subject to market risks.
              Read all related documents carefully before investing. Past performance is
              not indicative of future results.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          © 2026 Proption Fintech. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default RegulatoryDisclosure;
