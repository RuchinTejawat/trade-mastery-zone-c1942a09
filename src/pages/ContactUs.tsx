import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MapPin, Mail, Phone, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const url = "https://trade-mastery-zone.lovable.app/contact";
  const title = "Contact Us — Proption Fintech";
  const description =
    "Get in touch with Proption Fintech. Reach us at 803, Classic Tower, Navratan Complex, Udaipur, Rajasthan or email proptionfintech@gmail.com.";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side feedback; no backend endpoint configured
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

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
          "@type": "ContactPage",
          name: title,
          description,
          url,
          publisher: { "@type": "Organization", name: "Proption Fintech" },
          mainEntity: {
            "@type": "Organization",
            name: "Proption Fintech",
            address: {
              "@type": "PostalAddress",
              streetAddress: "803, Classic Tower, Navratan Complex",
              addressLocality: "Udaipur",
              addressRegion: "Rajasthan",
              addressCountry: "IN",
            },
            email: "proptionfintech@gmail.com",
            telephone: "+91-93214-74231",
          },
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

      <main className="container max-w-5xl py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-6">
            <MessageSquare className="h-3.5 w-3.5" /> Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a question about our research, academy, or services? Reach out — we are happy to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-border/60 p-4 bg-background">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      803, Classic Tower, Navratan Complex,<br />
                      Udaipur, Rajasthan
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border/60 p-4 bg-background">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:proptionfintech@gmail.com" className="text-muted-foreground text-sm mt-1 hover:text-primary block">
                      proptionfintech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border/60 p-4 bg-background">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+919321474231" className="text-muted-foreground text-sm mt-1 hover:text-primary block">
                      +91 93214 74231
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Response Time</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We typically respond to inquiries within 1–2 business days. For urgent research-related grievances, please also see the{" "}
                <Link to="/regulatory-disclosure" className="text-primary hover:underline">Regulatory Disclosure</Link>{" "}
                page.
              </p>
            </div>
          </section>

          {/* Inquiry Form */}
          <section className="rounded-xl border border-border/60 bg-background p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-1">Send an Inquiry</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Fill out the form below and we will get back to you shortly.
            </p>

            {submitted && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 text-sm">
                Thank you for reaching out. We will get back to you within 1–2 business days.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </section>
        </div>

        <div className="mt-16 pt-6 border-t border-border/60 text-xs text-muted-foreground text-center">
          © 2026 Proption Fintech. All rights reserved.
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
