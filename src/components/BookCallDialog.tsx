import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf26KBuZ7U2unayvgUbskeqUrcwE-EI3A3d_1aPw0foG_XQrQ/viewform?embedded=true";

export function BookCallDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Book a Call</DialogTitle>
          <DialogDescription>
            Share a few details and our team will reach out shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh] bg-background">
          <iframe
            src={FORM_EMBED_URL}
            title="Book a Call"
            className="w-full h-full border-0"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
