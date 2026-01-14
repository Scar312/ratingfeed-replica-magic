import { Heart, Users, Clock } from "lucide-react";
import { Button } from "./ui/button";

export interface Offer {
  id: string;
  name: string;
  description: string;
  discount: string;
  discountType: "percent" | "text";
  used: number;
  remaining: number;
  logo: string;
  link: string;
}

interface OfferCardProps {
  offer: Offer;
  onGetCode: (offer: Offer) => void;
}

const OfferCard = ({ offer, onGetCode }: OfferCardProps) => {
  return (
    <div className="relative border border-border rounded-xl p-6 bg-card hover:shadow-md transition-shadow">
      <button className="absolute top-4 left-4 text-muted-foreground hover:text-primary transition-colors">
        <Heart className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-4 mt-4">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-xs font-bold text-foreground">{offer.logo}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground">{offer.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{offer.description}</p>
          
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              {offer.used} used
            </span>
            <span className="flex items-center gap-1 text-warning">
              <Clock className="w-4 h-4" />
              {offer.remaining} left
            </span>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          <span className="text-3xl font-bold text-warning">{offer.discount}</span>
          {offer.discountType === "percent" && (
            <span className="block text-sm text-warning">OFF</span>
          )}
        </div>
      </div>
      
      <Button 
        onClick={() => onGetCode(offer)}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
      >
        GET CODE <span className="font-normal ml-2 opacity-80">Click to Reveal</span>
      </Button>
    </div>
  );
};

export default OfferCard;
