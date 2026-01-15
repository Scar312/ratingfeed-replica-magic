import { useState, useCallback } from "react";
import { Check } from "lucide-react";

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
    }, 1500);
  }, [isVerified, isChecking, onVerify]);

  return (
    <div className="bg-[#f9f9f9] dark:bg-[#222] border border-[#d3d3d3] dark:border-[#444] rounded-[3px] shadow-[0_0_4px_1px_rgba(0,0,0,0.08)] inline-flex items-stretch min-h-[78px]">
      {/* Left side - Checkbox area */}
      <div className="flex items-center px-4 py-2">
        <button
          onClick={handleCheck}
          disabled={isVerified || isChecking}
          className="flex items-center gap-3 cursor-pointer disabled:cursor-default group"
        >
          <div 
            className={`w-[28px] h-[28px] border-2 rounded-sm flex items-center justify-center transition-all duration-200 ${
              isVerified 
                ? "bg-[#00a652] border-[#00a652]" 
                : isChecking 
                  ? "border-[#c1c1c1] dark:border-[#666]" 
                  : "border-[#c1c1c1] dark:border-[#666] group-hover:border-[#a0a0a0] dark:group-hover:border-[#888] bg-white dark:bg-[#333]"
            }`}
          >
            {isVerified && (
              <Check className="w-5 h-5 text-white animate-in zoom-in duration-150" strokeWidth={3} />
            )}
            {isChecking && (
              <div className="w-5 h-5 relative">
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
          <span className="text-[14px] text-[#555] dark:text-[#ccc] select-none font-normal">
            I'm not a robot
          </span>
        </button>
      </div>
      
      {/* Divider */}
      <div className="w-px bg-[#d3d3d3] dark:bg-[#444] my-2" />
      
      {/* Right side - reCAPTCHA branding */}
      <div className="flex flex-col items-center justify-center px-3 py-2 min-w-[70px]">
        <svg width="32" height="32" viewBox="0 0 64 64">
          <path fill="#1c3aa9" d="M32 2L2 32l30 30 30-30L32 2zm0 45L19 34l13-13 13 13-13 13z"/>
          <path fill="#4285f4" d="M32 15L19 28l13 13 13-13-13-13zm0 19l-6-6 6-6 6 6-6 6z"/>
          <path fill="#ababab" d="M32 28l-6 6 6 6 6-6-6-6z"/>
        </svg>
        <span className="text-[10px] text-[#555] dark:text-[#aaa] font-medium mt-0.5">reCAPTCHA</span>
        <div className="flex items-center gap-1 text-[8px] text-[#888] dark:text-[#666]">
          <a href="#" className="hover:underline">Privacy</a>
          <span>-</span>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Recaptcha;
