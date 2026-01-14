import { Heart, Users, Clock } from "lucide-react";
import { Button } from "./ui/button";
import type { Offer } from "@/data/offers";

interface OfferCardProps {
  offer: Offer;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onGetCode: (offer: Offer) => void;
}

const OfferCard = ({ offer, isFavorite, onToggleFavorite, onGetCode }: OfferCardProps) => {
  return (
    <div className="relative bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(offer.id);
        }}
        className={`absolute top-4 left-4 p-1.5 rounded-full transition-all duration-200 ${
          isFavorite 
            ? "text-red-500 bg-red-50 hover:bg-red-100" 
            : "text-muted-foreground hover:text-red-400 hover:bg-muted"
        }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </button>
      
      <div className="flex items-start gap-4 mt-6">
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-border/50 p-2">
          <img 
            src={offer.logo} 
            alt={`${offer.name} logo`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<span class="text-xs font-semibold text-foreground">${offer.name.slice(0, 2).toUpperCase()}</span>`;
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground">{offer.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
            {offer.description}
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              {offer.used.toLocaleString()} used
            </span>
            <span className="flex items-center gap-1.5 text-xs text-warning font-medium">
              <Clock className="w-3.5 h-3.5" />
              {offer.remaining} left
            </span>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          <span className="text-2xl font-bold text-primary">{offer.discount}</span>
          {offer.discountType === "percent" && (
            <span className="block text-xs font-medium text-primary/80">OFF</span>
          )}
        </div>
      </div>
      
      <Button 
        onClick={() => onGetCode(offer)}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-sm font-semibold rounded-xl"
      >
        GET CODE
        <span className="font-normal ml-2 opacity-80">Click to Reveal</span>
      </Button>
    </div>
  );
};

export default OfferCard;
