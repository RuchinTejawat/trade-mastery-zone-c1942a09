import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const COURSE = {
  name: "Statistical Options Trading Program",
  tagline: "Basics to Advanced · 6 Modules · 2 Weeks",
  price: 20000,
};

const Checkout = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    method: "upi",
  });

  const gst = Math.round(COURSE.price * 0.18);
  const total = COURSE.price + gst;

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      toast({ title: "Missing details", description: "Please fill in name, email and phone." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const orderId = "PRO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setSubmitting(false);
      navigate("/order-confirmation", {
        state: {
          orderId,
          course: COURSE,
          buyer: form,
          amount: total,
          gst,
          method: form.method,
          date: new Date().toISOString(),
        },
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Secure checkout
          </div>
        </div>
      </header>

      <main className="container pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your enrollment for the {COURSE.name}.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <Card className="p-6 md:p-8 bg-gradient-card border-border/60">
              <h2 className="text-lg font-semibold mb-4">Your details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="pan">PAN (for invoice)</Label>
                  <Input id="pan" value={form.pan} onChange={(e) => update("pan", e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} className="mt-1.5" />
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-gradient-card border-border/60">
              <h2 className="text-lg font-semibold mb-4">Payment method</h2>
              <RadioGroup value={form.method} onValueChange={(v) => update("method", v)} className="space-y-3">
                {[
                  { id: "upi", label: "UPI", sub: "Pay via any UPI app" },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Rupay" },
                  { id: "netbanking", label: "Net Banking", sub: "All major Indian banks" },
                ].map((m) => (
                  <label key={m.id} htmlFor={m.id} className="flex items-center gap-4 rounded-lg border border-border/60 p-4 cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value={m.id} id={m.id} />
                    <div className="flex-1">
                      <div className="font-medium">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.sub}</div>
                    </div>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </label>
                ))}
              </RadioGroup>
            </Card>

            <div className="hidden lg:block">
              <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 text-base">
                {submitting ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
              </Button>
            </div>
          </form>

          <aside className="lg:col-span-2">
            <Card className="p-6 md:p-8 bg-gradient-card border-border/60 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              <div className="rounded-lg border border-border/60 p-4 bg-background/40">
                <div className="font-semibold">{COURSE.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{COURSE.tagline}</div>
              </div>

              <div className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Program fee</span><span className="font-mono">₹{COURSE.price.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span className="font-mono">₹{gst.toLocaleString("en-IN")}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span className="font-mono text-gradient">₹{total.toLocaleString("en-IN")}</span></div>
              </div>

              <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Secure payment. You'll receive an invoice and access details on your email immediately after payment.</span>
              </div>

              <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                {["Lifetime access to recordings", "Live + recorded sessions", "Community access"].map((p) => (
                  <div key={p} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {p}</div>
                ))}
              </div>

              <Button type="submit" form="" onClick={handleSubmit} disabled={submitting} className="w-full mt-6 bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 text-base lg:hidden">
                {submitting ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
              </Button>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
