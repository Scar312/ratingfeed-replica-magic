import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, Loader2 } from "lucide-react";
import heroImg from "@/assets/ubereats-hero.jpg";
import brandLogo from "@/assets/doordash.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const APPLY_URL = "https://linkthem.net/aff_c?offer_id=1999&aff_id=16139";

const faqs = [
  {
    q: "Do I need to provide bank details?",
    a: "No, you do not need to provide any bank details to claim your DoorDash reward.",
  },
  {
    q: "How long do the deals take?",
    a: "Most deals can be completed within 5-10 minutes. You'll receive confirmation via email within 24 hours.",
  },
  {
    q: "What kind of deals are included?",
    a: "Deals include free trials, app sign-ups, and quick surveys — all easy to complete.",
  },
];

const steps = [
  "Answer A Few Quick Questions",
  "Complete 4-5 Quick Tasks (Guided)",
  "We'll Review Your Submission And Email You Within 24hrs",
];

type LoadStep = "idle" | "loading" | "generating";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loadStep, setLoadStep] = useState<LoadStep>("idle");
  const [codeProgress, setCodeProgress] = useState("");

  const handleGetCoupon = () => {
    setLoadStep("loading");
    setCodeProgress("");
    setTimeout(() => {
      setLoadStep("generating");
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const target = 8;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setCodeProgress((prev) => prev + chars[Math.floor(Math.random() * chars.length)]);
        if (i >= target - 2) {
          clearInterval(interval);
          setTimeout(() => {
            window.location.href = APPLY_URL;
          }, 700);
        }
      }, 250);
    }, 1400);
  };

  useEffect(() => {
    document.title = "Claim Your DoorDash Reward";
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "DoorDash reward — answer a few quick questions and complete easy tasks to claim your reward. Available in US, UK, AU & CA."
    );
    setMeta("og:title", "Claim Your DoorDash Reward", true);
    setMeta("og:description", "Quick DoorDash reward — takes about 5–10 minutes.", true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <img
          src={heroImg}
          alt="DoorDash delivery food spread"
          className="w-full h-full object-cover"
          width={1280}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 bottom-20 flex items-center justify-center pointer-events-none">
          <img
            src={brandLogo}
            alt="DoorDash"
            className="h-32 sm:h-40 md:h-52 w-auto object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-5 -mt-8 sm:-mt-4 pb-8 text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
          Claim Your DoorDash Reward
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Available in US, UK, AU &amp; CA
        </p>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 flex-wrap">
          <CheckCircle className="text-green-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="font-bold text-foreground text-sm sm:text-lg">
            620+ Members Approved This Month
          </span>
        </div>

        <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-6" />

        <h2 className="uppercase tracking-widest font-extrabold text-foreground mt-8 text-sm">
          How To Qualify
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Takes ~5–10 minutes</p>

        <div className="flex flex-col gap-3 sm:gap-4 mt-5 sm:mt-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 bg-card rounded-xl px-4 sm:px-5 py-4 sm:py-5 text-left shadow-sm border border-border"
            >
              <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base sm:text-lg">
                {i + 1}
              </span>
              <span className="font-semibold text-foreground text-sm sm:text-base">
                {step}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleGetCoupon}
          disabled={loadStep !== "idle"}
          className="block w-full mt-8 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-xl uppercase tracking-wide text-center shadow-lg hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          Get Coupon
        </button>

        <h2 className="uppercase tracking-widest font-extrabold text-foreground mt-12 text-sm">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-4 flex items-center justify-between"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-foreground">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="pb-4 text-sm text-muted-foreground text-left">{faq.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pb-8 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <img
              src={brandLogo}
              alt="DoorDash"
              className="w-8 h-8"
              width={32}
              height={32}
              loading="lazy"
            />
            <span className="font-bold text-foreground">DoorDash</span>
          </div>
          <p className="text-muted-foreground text-sm">Powered by DoorDash</p>
        </div>
      </div>

      <Dialog open={loadStep !== "idle"} onOpenChange={() => {}}>
        <DialogContent hideCloseButton className="max-w-sm w-[calc(100%-2rem)] rounded-2xl">
          <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
            {loadStep === "loading" ? (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="font-semibold text-foreground">Preparing your reward...</p>
                <p className="text-sm text-muted-foreground">Please wait a moment</p>
              </>
            ) : (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="font-semibold text-foreground">Generating your coupon code...</p>
                <div className="font-mono text-2xl tracking-widest bg-muted rounded-lg px-4 py-3 min-w-[200px]">
                  {codeProgress}
                  <span className="animate-pulse">_</span>
                </div>
                <p className="text-xs text-muted-foreground">Redirecting to claim your code...</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
