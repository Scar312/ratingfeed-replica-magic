import { useState, useEffect } from "react";
import { X, Users, Clock, Check, RefreshCw, Headphones, Info, Star } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import type { Offer } from "./OfferCard";

interface Task {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
  stars: number;
}

const tasks: Task[] = [
  {
    id: "shein",
    name: "SHEIN",
    description: "Shop the latest fashion trends. Complete signup to unlock exclusive deals.",
    logo: "SHEIN",
    link: "https://glctrk.org/aff_c?offer_id=1304&aff_id=16139",
    stars: 4,
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    description: "Discover trending products on TikTok Shop. Browse for 30 seconds to unlock.",
    logo: "TikTok",
    link: "https://glctrk.org/aff_c?offer_id=1259&aff_id=16139",
    stars: 4,
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Signup and complete 3 tasks to qualify for a $500 Amazon Gift Card.",
    logo: "amazon",
    link: "https://glctrk.org/aff_c?offer_id=1153&aff_id=16139",
    stars: 4,
  },
];

interface CouponModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "reveal" | "captcha" | "tasks";

const CouponModal = ({ offer, isOpen, onClose }: CouponModalProps) => {
  const [step, setStep] = useState<Step>("reveal");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [usedToday, setUsedToday] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (isOpen && offer) {
      // Randomize stats when modal opens
      setUsedToday(Math.floor(Math.random() * (350 - 100 + 1)) + 100);
      setRemaining(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
      setStep("reveal");
      setCaptchaChecked(false);
    }
  }, [isOpen, offer]);

  const handleRevealClick = () => {
    setStep("captcha");
  };

  const handleCaptchaCheck = () => {
    setCaptchaChecked(true);
    setTimeout(() => {
      setStep("tasks");
    }, 500);
  };

  const handleTaskClick = (task: Task) => {
    window.open(task.link, "_blank");
  };

  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden bg-popover">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "reveal" && (
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold">{offer.logo}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{offer.name}</h3>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
                <p className="text-sm text-primary mt-1">✓ Verified 3 hours ago</p>
              </div>
            </div>

            <div className="flex justify-around py-4 border-t border-b border-border mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                  <Users className="w-4 h-4" />
                  Used today:
                </div>
                <span className="text-2xl font-bold">{usedToday}</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Remaining:
                </div>
                <span className="text-2xl font-bold text-warning">{remaining}</span>
              </div>
            </div>

            <Button
              onClick={handleRevealClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold border-2 border-dashed border-primary/50"
            >
              Reveal Coupon Code
            </Button>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed border-border">
              <h4 className="font-semibold mb-3">How to use this coupon:</h4>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li>1. Copy the coupon code above</li>
                <li>2. Visit {offer.name} website</li>
                <li>3. Add items to your cart</li>
                <li>4. Paste the code at checkout</li>
                <li>5. Enjoy your savings!</li>
              </ol>
            </div>
          </div>
        )}

        {step === "captcha" && (
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold">{offer.logo}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{offer.name}</h3>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
                <p className="text-sm text-primary mt-1">✓ Verified 3 hours ago</p>
              </div>
            </div>

            <div className="flex justify-around py-4 border-t border-b border-border mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                  <Users className="w-4 h-4" />
                  Used today:
                </div>
                <span className="text-2xl font-bold">{usedToday}</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Remaining:
                </div>
                <span className="text-2xl font-bold text-warning">{remaining}</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={captchaChecked}
                    onCheckedChange={() => handleCaptchaCheck()}
                    className="w-6 h-6"
                  />
                  <span className="text-sm">I'm not a robot</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">CAPTCHA</div>
                  <div className="text-[10px] text-muted-foreground">Privacy - Terms</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-border">
              <h4 className="font-semibold mb-3">How to use this coupon:</h4>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li>1. Copy the coupon code above</li>
                <li>2. Visit {offer.name} website</li>
                <li>3. Add items to your cart</li>
                <li>4. Paste the code at checkout</li>
                <li>5. Enjoy your savings!</li>
              </ol>
            </div>
          </div>
        )}

        {step === "tasks" && (
          <div>
            <div className="bg-[hsl(217,71%,45%)] text-white p-4">
              <h3 className="font-semibold">Complete two tasks to verify you're not a bot</h3>
            </div>

            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className="w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold">{task.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold">{task.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: task.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="text-muted-foreground hover:text-foreground">
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Headphones className="w-5 h-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Info className="w-5 h-5" />
                </button>
              </div>
              <Button className="bg-[hsl(217,71%,45%)] hover:bg-[hsl(217,71%,40%)] text-white">
                Verify
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CouponModal;
