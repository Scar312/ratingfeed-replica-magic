import { Sparkles, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">MasterSaver</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-sm">
              Discover verified coupon codes and exclusive deals from top brands. Save money on every purchase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm">Explore</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {["All Deals", "Top Stores", "Categories", "New Coupons"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm">Company</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {["About", "Contact", "FAQ", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {currentYear} MasterSaver. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Theme toggle switch */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border hover:border-primary/30 transition-all"
              aria-label="Toggle theme"
            >
              <Sun className={`w-4 h-4 transition-colors ${!isDark ? "text-amber-500" : "text-muted-foreground"}`} />
              <div className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? "bg-primary" : "bg-muted-foreground/30"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isDark ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              <Moon className={`w-4 h-4 transition-colors ${isDark ? "text-blue-400" : "text-muted-foreground"}`} />
            </button>
            
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;