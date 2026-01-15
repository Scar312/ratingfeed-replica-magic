import { useState, useCallback, useEffect } from "react";

interface RecaptchaProps {
  onVerify: () => void;
}

const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [randomCode, setRandomCode] = useState("");

  // Generate random code on mount
  useEffect(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomCode(code);
    
    // Hide code and show captcha after brief delay
    const timer = setTimeout(() => {
      setShowCode(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCheck = useCallback(() => {
    if (isChecking) return;
    
    setIsChecking(true);
    
    // Simulate verification delay then proceed
    setTimeout(() => {
      onVerify();
    }, 1200);
  }, [isChecking, onVerify]);

  // Show random code first
  if (showCode) {
    return (
      <div className="bg-[#f9f9f9] dark:bg-[#1a1a1a] border border-[#d3d3d3] dark:border-[#444] rounded-[3px] shadow-sm p-4 min-w-[300px]">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Your code:</p>
          <div className="font-mono text-2xl font-bold tracking-widest text-foreground bg-muted/50 rounded px-4 py-3 border border-border">
            {randomCode}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] dark:bg-[#1a1a1a] border border-[#d3d3d3] dark:border-[#444] rounded-[3px] shadow-sm inline-flex items-stretch min-h-[74px] animate-in fade-in duration-300">
      {/* Left side - Checkbox area */}
      <div className="flex items-center px-3 sm:px-4 py-2">
        <button
          onClick={handleCheck}
          disabled={isChecking}
          className="flex items-center gap-3 cursor-pointer disabled:cursor-default group"
        >
          <div 
            className={`w-[24px] h-[24px] border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
              isChecking 
                ? "border-[#c1c1c1] dark:border-[#555]" 
                : "border-[#c1c1c1] dark:border-[#555] group-hover:border-[#4285f4] bg-white dark:bg-[#2a2a2a]"
            }`}
          >
            {isChecking && (
              <div className="w-4 h-4 relative">
                <svg className="animate-spin" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="#4285f4" 
                    strokeWidth="3" 
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="none"
                    stroke="#4285f4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    d="M12 2a10 10 0 0 1 10 10"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="text-[13px] text-[#202124] dark:text-[#e8eaed] select-none font-normal">
            I'm not a robot
          </span>
        </button>
      </div>
      
      {/* Divider */}
      <div className="w-px bg-[#d3d3d3] dark:bg-[#444] my-2" />
      
      {/* Right side - reCAPTCHA branding */}
      <div className="flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 min-w-[60px]">
        <svg width="28" height="28" viewBox="0 0 64 64">
          {/* Blue arrow part */}
          <path fill="#4285f4" d="M32 12L52 32L32 52L32 40L40 32L32 24L32 12Z"/>
          {/* Gray arrow part */}
          <path fill="#9aa0a6" d="M32 12L12 32L32 52L32 40L24 32L32 24L32 12Z"/>
        </svg>
        <span className="text-[9px] text-[#555] dark:text-[#9aa0a6] font-medium tracking-tight">reCAPTCHA</span>
        <div className="flex items-center gap-1 text-[7px] text-[#70757a] dark:text-[#666]">
          <a href="#" className="hover:underline">Privacy</a>
          <span>-</span>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Recaptcha;