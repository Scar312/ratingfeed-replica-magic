import { Heart, Tag } from "lucide-react";

interface HeaderProps {
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

const Header = ({ favoritesCount, showFavoritesOnly, onToggleFavorites }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-5 px-6 md:px-12 lg:px-24 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Tag className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Ratingfeed</h1>
          <p className="text-xs text-muted-foreground">Save More, Spend Less</p>
        </div>
      </div>
      
      <button 
        onClick={onToggleFavorites}
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          showFavoritesOnly 
            ? "bg-red-50 border border-red-200" 
            : "border border-border hover:bg-muted"
        }`}
        aria-label="View favorites"
      >
        <Heart className={`w-5 h-5 transition-colors ${
          showFavoritesOnly ? "text-red-500 fill-red-500" : "text-muted-foreground"
        }`} />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {favoritesCount > 9 ? '9+' : favoritesCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
