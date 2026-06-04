import { Link, Navigate, useLocation } from "react-router-dom";
import { CheckCircle2, Download, Mail, Calendar, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderState {
  orderId: string;
  course: { name: string; tagline: string; price: number };
  buyer: { fullName: string; email: string; phone: string; pan?: string };
  amount: number;
  gst: number;
  method: string;
  date: string;
}

const methodLabel: Record<string, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
};

const OrderConfirmation = () => {
  const location = useLocation();
  const state = location.state as OrderState | null;

  if (!state) return <Navigate to="/" replace />;

  const { orderId, course, buyer, amount, gst, method, date } = state;
  const formattedDate = new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Payment successful</h1>
            <p className="text-muted-foreground mt-2">
              Thank you, {buyer.fullName.split(" ")[0]}. Your enrollment is confirmed.
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-gradient-card border-border/60">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</div>
                <div className="font-mono font-semibold text-lg">{orderId}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Date</div>
                <div className="text-sm">{formattedDate}</div>
              </div>
            </div>

            <Separator className="my-5" />

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Course</div>
              <div className="rounded-lg border border-border/60 p-4 bg-background/40">
                <div className="font-semibold">{course.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{course.tagline}</div>
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Billed to</div>
                <div className="mt-1 font-medium">{buyer.fullName}</div>
                <div className="text-muted-foreground">{buyer.email}</div>
                <div className="text-muted-foreground">{buyer.phone}</div>
                {buyer.pan && <div className="text-muted-foreground">PAN: {buyer.pan}</div>}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Payment</div>
                <div className="mt-1 font-medium">{methodLabel[method] ?? method}</div>
                <div className="text-muted-foreground">Status: Paid</div>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Program fee</span><span className="font-mono">₹{course.price.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span className="font-mono">₹{gst.toLocaleString("en-IN")}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold"><span>Total paid</span><span className="font-mono text-gradient">₹{amount.toLocaleString("en-IN")}</span></div>
            </div>
          </Card>

          <Card className="mt-6 p-6 md:p-8 bg-gradient-card border-border/60">
            <h2 className="font-semibold mb-4">What's next</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>A confirmation and invoice have been sent to <span className="text-foreground font-medium">{buyer.email}</span>.</span></li>
              <li className="flex gap-3"><Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Cohort start date and session schedule will be shared 48 hours before kickoff.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>Community access invite will be emailed within 24 hours.</span></li>
            </ul>
          </Card>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button onClick={() => window.print()} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" /> Download receipt
            </Button>
            <Button asChild className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Back to home <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
