import { useState, useEffect } from "react";
import { X, Users, Clock, Star, ExternalLink } from "lucide-react";
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
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden bg-card border-border rounded-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "reveal" && (
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-border/50 p-2">
                <img 
                  src={offer.logo} 
                  alt={offer.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">{offer.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{offer.description}</p>
                <p className="text-sm text-primary mt-1.5 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">✓</span>
                  Verified 3 hours ago
                </p>
              </div>
            </div>

            <div className="flex justify-around py-4 border-y border-border mb-6 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Users className="w-4 h-4" />
                  Used today
                </div>
                <span className="text-2xl font-bold text-foreground">{usedToday}</span>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  Remaining
                </div>
                <span className="text-2xl font-bold text-warning">{remaining}</span>
              </div>
            </div>

            <Button
              onClick={handleRevealClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-semibold rounded-xl"
            >
              Reveal Coupon Code
            </Button>

            <div className="mt-6 p-4 bg-muted/50 rounded-xl">
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
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-border/50 p-2">
                <img 
                  src={offer.logo} 
                  alt={offer.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">{offer.name}</h3>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
                <p className="text-sm text-primary mt-1.5 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">✓</span>
                  Verified 3 hours ago
                </p>
              </div>
            </div>

            <div className="flex justify-around py-4 border-y border-border mb-6 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Users className="w-4 h-4" />
                  Used today
                </div>
                <span className="text-2xl font-bold text-foreground">{usedToday}</span>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  Remaining
                </div>
                <span className="text-2xl font-bold text-warning">{remaining}</span>
              </div>
            </div>

            <div className="flex justify-center mb-6">
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
            <div className="bg-primary text-primary-foreground p-4">
              <h3 className="font-semibold text-base">Complete 2 tasks to verify you're human</h3>
              <p className="text-sm opacity-90 mt-0.5">Quick verification to prevent bots</p>
            </div>

            <div className="divide-y divide-border">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskClick(task.link)}
                  className="w-full flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors text-left group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-border/50 p-2 group-hover:border-primary/30 transition-colors">
                    <img 
                      src={task.logo} 
                      alt={task.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{task.name}</h4>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(task.rating) 
                              ? "fill-yellow-400 text-yellow-400" 
                              : i < task.rating 
                                ? "fill-yellow-400/50 text-yellow-400" 
                                : "text-muted-foreground/30"
                          }`} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{task.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                Complete at least 2 tasks above to unlock your coupon code
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CouponModal;
