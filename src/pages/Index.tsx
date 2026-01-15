import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import OfferCard from "@/components/OfferCard";
import CouponModal from "@/components/CouponModal";
import Footer from "@/components/Footer";
import { offers, type Offer } from "@/data/offers";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const filteredOffers = useMemo(() => {
    let result = [...offers];

    // Filter by favorites if enabled
    if (showFavoritesOnly) {
      result = result.filter((offer) => favorites.includes(offer.id));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (offer) =>
          offer.name.toLowerCase().includes(query) ||
          offer.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortOption) {
      case "popular":
        result.sort((a, b) => b.used - a.used);
        break;
      case "newest":
        break;
      case "discount":
        result.sort((a, b) => {
          const aNum = parseInt(a.discount.replace(/[^0-9]/g, "")) || 0;
          const bNum = parseInt(b.discount.replace(/[^0-9]/g, "")) || 0;
          return bNum - aNum;
        });
        break;
      case "ending":
        result.sort((a, b) => a.remaining - b.remaining);
        break;
    }

    return result;
  }, [searchQuery, sortOption, showFavoritesOnly, favorites]);

  const handleGetCode = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        favoritesCount={favorites.length} 
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            {showFavoritesOnly ? "Your Favorite Deals" : "Today's Top Deals"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {showFavoritesOnly 
              ? `${favorites.length} saved offer${favorites.length !== 1 ? 's' : ''}`
              : "Verified coupons and exclusive discounts from top brands"
            }
          </p>
        </div>
      </div>
      
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <SortDropdown value={sortOption} onChange={setSortOption} />
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            showFavoritesOnly
              ? "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
          Favorites
          {favorites.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs ${
              showFavoritesOnly ? "bg-red-200 dark:bg-red-900" : "bg-background"
            }`}>
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-24 pb-8 sm:pb-12">
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            {showFavoritesOnly ? (
              <>
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground text-base sm:text-lg mb-2">No favorites yet</p>
                <p className="text-muted-foreground/70 text-xs sm:text-sm">
                  Click the heart icon on any offer to save it here
                </p>
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="mt-4 text-primary hover:underline text-xs sm:text-sm font-medium"
                >
                  Browse all offers
                </button>
              </>
            ) : (
              <p className="text-muted-foreground text-base sm:text-lg">
                No offers found matching "{searchQuery}"
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredOffers.map((offer) => (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                isFavorite={isFavorite(offer.id)}
                onToggleFavorite={toggleFavorite}
                onGetCode={handleGetCode} 
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <CouponModal
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
