import { useState, useCallback } from "react";
import { Check, RefreshCw } from "lucide-react";

interface RecaptchaProps {
  onVerify: () => void;
}

const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleCheck = useCallback(() => {
    if (isVerified || isChecking) return;
    
    setIsChecking(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setIsChecking(false);
      setIsVerified(true);
      setTimeout(() => {
        onVerify();
      }, 400);
    }, 1200);
  }, [isVerified, isChecking, onVerify]);

  return (
    <div className="border border-[hsl(var(--captcha-border))] rounded-sm bg-[hsl(var(--captcha-bg))] shadow-sm">
      <div className="flex items-center justify-between p-3 gap-4">
        <button
          onClick={handleCheck}
          disabled={isVerified || isChecking}
          className="flex items-center gap-3 cursor-pointer disabled:cursor-default"
        >
          <div 
            className={`w-7 h-7 border-2 rounded-sm flex items-center justify-center transition-all duration-300 ${
              isVerified 
                ? "bg-primary border-primary" 
                : isChecking 
                  ? "border-muted-foreground/50" 
                  : "border-muted-foreground/40 hover:border-muted-foreground/60"
            }`}
          >
            {isVerified && (
              <Check className="w-4 h-4 text-primary-foreground animate-in zoom-in duration-200" />
            )}
            {isChecking && (
              <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />
            )}
          </div>
          <span className="text-sm text-foreground select-none">
            I'm not a robot
          </span>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-0.5 mb-0.5">
            <svg width="24" height="24" viewBox="0 0 64 64" className="text-[#4285F4]">
              <path fill="#1C3AA9" d="M32 0L0 32l32 32 32-32L32 0zm0 48l-16-16 16-16 16 16-16 16z"/>
              <path fill="#4285F4" d="M32 16l-16 16 16 16 16-16-16-16zm0 24l-8-8 8-8 8 8-8 8z"/>
              <path fill="#ABABAB" d="M32 24l-8 8 8 8 8-8-8-8z"/>
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium tracking-tight">reCAPTCHA</span>
          <span className="text-[8px] text-muted-foreground/70">Privacy - Terms</span>
        </div>
      </div>
    </div>
  );
};

export default Recaptcha;
