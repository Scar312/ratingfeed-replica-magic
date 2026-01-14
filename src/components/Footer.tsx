import { Tag } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground mt-12">
      <div className="px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Ratingfeed</span>
            </div>
            <p className="text-footer-foreground/70 max-w-md mb-6">
              Your trusted source for verified coupon codes and exclusive deals from top brands worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-footer-foreground/10 rounded-full flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-footer-foreground/10 rounded-full flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-footer-foreground/10 rounded-full flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  All Coupons
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Top Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Cashback Offers
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-footer-foreground/70 hover:text-footer-foreground transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-footer-foreground/10">
        <div className="px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-footer-foreground/60 text-sm">
            © {currentYear} Ratingfeed. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-footer-foreground/60 hover:text-footer-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-footer-foreground/30">|</span>
            <a href="#" className="text-footer-foreground/60 hover:text-footer-foreground transition-colors">
              Terms of Service
            </a>
            <span className="text-footer-foreground/30">|</span>
            <a href="#" className="text-footer-foreground/60 hover:text-footer-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
