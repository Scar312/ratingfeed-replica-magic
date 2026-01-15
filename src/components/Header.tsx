import { Heart, Sparkles } from "lucide-react";

interface HeaderProps {
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

const Header = ({ favoritesCount, showFavoritesOnly, onToggleFavorites }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 md:px-12 lg:px-24 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Ratingfeed</h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Save More, Spend Less</p>
        </div>
      </div>
      
      <button 
        onClick={onToggleFavorites}
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
          showFavoritesOnly 
            ? "bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900" 
            : "border border-border hover:bg-muted"
        }`}
        aria-label="View favorites"
      >
        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
          showFavoritesOnly ? "text-red-500 fill-red-500" : "text-muted-foreground"
        }`} />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs font-medium rounded-full flex items-center justify-center">
            {favoritesCount > 9 ? '9+' : favoritesCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
