import { useState, useEffect } from "react";
import { X, Users, Clock, ExternalLink, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Recaptcha from "./Recaptcha";
import type { Offer } from "@/data/offers";
import { tasks } from "@/data/offers";

interface CouponModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "reveal" | "captcha" | "tasks";

const CouponModal = ({ offer, isOpen, onClose }: CouponModalProps) => {
  const [step, setStep] = useState<Step>("reveal");
  const [usedToday, setUsedToday] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (isOpen && offer) {
      setUsedToday(Math.floor(Math.random() * (350 - 100 + 1)) + 100);
      setRemaining(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
      setStep("reveal");
    }
  }, [isOpen, offer]);

  const handleRevealClick = () => {
    setStep("captcha");
  };

  const handleCaptchaVerify = () => {
    setTimeout(() => {
      setStep("tasks");
    }, 300);
  };

  const handleTaskClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        hideCloseButton 
        className="max-w-[420px] w-[calc(100%-2rem)] p-0 gap-0 overflow-hidden bg-card border-border rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Single close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all z-20 bg-background/80 backdrop-blur-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "reveal" && (
          <div className="p-5 sm:p-6">
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

            <Button
              onClick={handleRevealClick}
              className="w-full glass-button text-primary-foreground h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl"
            >
              Reveal Coupon Code
            </Button>

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
        )}

        {step === "captcha" && (
          <div className="p-5 sm:p-6">
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
                <p className="text-sm text-muted-foreground line-clamp-2">{offer.description}</p>
                <p className="text-sm text-primary mt-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified 3 hours ago
                </p>
              </div>
            </div>

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

            <div className="flex justify-center mb-5 overflow-x-auto">
              <Recaptcha onVerify={handleCaptchaVerify} />
            </div>

            <div className="p-4 bg-muted/50 rounded-xl">
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
        )}

        {step === "tasks" && (
          <div>
            {/* Blue header like captcha */}
            <div className="bg-[#4285f4] text-white p-4 sm:p-5">
              <h3 className="font-semibold text-base sm:text-lg">Complete 1 of these tasks to verify you're human</h3>
              <p className="text-sm opacity-90 mt-1">Quick verification to prevent bots</p>
            </div>

            <div className="divide-y divide-border">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskClick(task.link)}
                  className="w-full flex items-start gap-3 sm:gap-4 p-4 hover:bg-muted/50 transition-colors text-left group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-muted rounded-xl flex items-center justify-center shrink-0 border border-border/50 group-hover:border-[#4285f4]/30 transition-colors overflow-hidden">
                    <img 
                      src={task.logo} 
                      alt={task.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{task.name}</h4>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < Math.floor(task.rating) 
                                ? "text-[#fbbc04] fill-[#fbbc04]" 
                                : "text-muted-foreground/20 fill-muted-foreground/20"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">{task.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-[#4285f4]/5">
              <p className="text-xs text-muted-foreground text-center">
                Complete at least 1 task above to unlock your coupon code
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CouponModal;