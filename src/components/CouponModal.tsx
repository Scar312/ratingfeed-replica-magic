import { useState, useEffect } from "react";
import { X, Users, Clock, CheckCircle2, RefreshCw, Headphones, Info, Star, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Offer } from "@/data/offers";
import { tasks } from "@/data/offers";
import recaptchaLogo from "@/assets/recaptcha-logo.png";

interface CouponModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "reveal" | "loading" | "captcha" | "captchaLoading" | "tasks";

const CouponModal = ({ offer, isOpen, onClose }: CouponModalProps) => {
  const [step, setStep] = useState<Step>("reveal");
  const [usedToday, setUsedToday] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [clickedTasks, setClickedTasks] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen && offer) {
      setUsedToday(Math.floor(Math.random() * (350 - 100 + 1)) + 100);
      setRemaining(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
      setStep("reveal");
      setClickedTasks(new Set());
    }
  }, [isOpen, offer]);

  const handleRevealClick = () => {
    setUsedToday(prev => prev + 1);
    setRemaining(prev => Math.max(0, prev - 1));
    setStep("loading");
    setTimeout(() => {
      setStep("captcha");
    }, 1500);
  };

  const handleCaptchaClick = () => {
    setStep("captchaLoading");
    setTimeout(() => {
      setStep("tasks");
    }, 1000);
  };

  const handleTaskClick = (link: string, index: number) => {
    setClickedTasks(prev => new Set(prev).add(index));
    window.open(link, "_blank");
  };

  const handleVerify = () => {
    if (clickedTasks.size >= 2) {
      window.open("https://glctrk.org/aff_c?offer_id=3329&aff_id=16139", "_blank");
    }
  };

  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );

  if (!offer) return null;

  return (
    <>
      {/* Main modal (reveal, loading, captcha steps) */}
      <Dialog open={isOpen && step !== "tasks"} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent 
          hideCloseButton 
          className="max-w-[420px] w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden bg-card border-border rounded-2xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all z-20 bg-background/80 backdrop-blur-sm"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-5 sm:p-6">
            {/* Brand Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-muted rounded-xl flex items-center justify-center border border-border/50 shrink-0 overflow-hidden">
                <img 
                  src={offer.logo} 
                  alt={offer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <h3 className="font-semibold text-base sm:text-lg text-foreground">{offer.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{offer.description}</p>
                <p className="text-sm text-primary mt-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified 3 hours ago
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-around py-4 border-y border-border mb-5 bg-muted/30 rounded-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Users className="w-4 h-4" />
                  Used today
                </div>
                <span className="text-xl sm:text-2xl font-bold text-foreground">{usedToday}</span>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  Remaining
                </div>
                <span className="text-xl sm:text-2xl font-bold text-warning">{remaining}</span>
              </div>
            </div>

            {/* Action area */}
            {step === "reveal" && (
              <Button
                onClick={handleRevealClick}
                className="w-full glass-button text-primary-foreground h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl"
              >
                Reveal Coupon Code
              </Button>
            )}

            {step === "loading" && (
              <div className="w-full flex flex-col items-center justify-center py-6 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground font-medium">Loading your coupon...</p>
              </div>
            )}

            {(step === "captcha" || step === "captchaLoading") && (
              <div className="w-full bg-secondary border border-border rounded-md p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {step === "captchaLoading" ? (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 min-w-[24px] min-h-[24px] shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    ) : (
                      <div
                        onClick={handleCaptchaClick}
                        className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-muted-foreground/40 rounded flex items-center justify-center bg-card cursor-pointer hover:border-muted-foreground transition-colors"
                      />
                    )}
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">I'm not a robot</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src={recaptchaLogo} alt="reCAPTCHA" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground font-medium">reCAPTCHA</span>
                    <div className="text-[7px] sm:text-[8px] text-muted-foreground/70">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
                      {" - "}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How to use */}
            <div className="mt-5 p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold text-sm mb-3 text-foreground">How to use this coupon:</h4>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-medium">1.</span> Copy the coupon code above</li>
                <li className="flex gap-2"><span className="text-primary font-medium">2.</span> Visit {offer.name} website</li>
                <li className="flex gap-2"><span className="text-primary font-medium">3.</span> Add items to your cart</li>
                <li className="flex gap-2"><span className="text-primary font-medium">4.</span> Paste the code at checkout</li>
                <li className="flex gap-2"><span className="text-primary font-medium">5.</span> Enjoy your savings!</li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task Modal */}
      <Dialog open={isOpen && step === "tasks"} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-sm mx-auto p-0 gap-0 overflow-hidden [&>button]:hidden">
          <div className="bg-primary m-2 sm:m-3 mb-0 p-3 sm:p-4">
            <h2 className="text-primary-foreground text-sm sm:text-base font-semibold leading-tight">
              Complete two tasks to verify you're not a bot
            </h2>
          </div>

          <div className="p-2 sm:p-3 space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${clickedTasks.has(index) ? 'border-primary bg-primary/10' : 'border-border'}`}
                onClick={() => handleTaskClick(task.link, index)}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-card">
                  <img src={task.logo} alt={task.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-xs sm:text-sm">{task.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">{task.description}</p>
                  {renderStars(task.stars)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 border-t border-border">
            <div className="flex gap-2 sm:gap-3">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
            <Button
              onClick={handleVerify}
              disabled={clickedTasks.size < 2}
              className={`px-4 sm:px-6 text-xs sm:text-sm ${clickedTasks.size >= 2 ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
            >
              Verify ({clickedTasks.size}/2)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CouponModal;
