import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import OfferCard, { Offer } from "@/components/OfferCard";
import CouponModal from "@/components/CouponModal";
import Footer from "@/components/Footer";

const offers: Offer[] = [
  {
    id: "amazon",
    name: "Amazon",
    description: "Mega Deals: Up To 90% Off Everything",
    discount: "90%",
    discountType: "percent",
    used: 456,
    remaining: 5,
    logo: "amazon",
    link: "https://glctrk.org/aff_c?offer_id=1153&aff_id=16139",
  },
  {
    id: "shein",
    name: "SHEIN",
    description: "Fashion Frenzy: Up To 85% Off Trendy Styles & New Arrivals",
    discount: "85%",
    discountType: "percent",
    used: 287,
    remaining: 17,
    logo: "SHEIN",
    link: "https://glctrk.org/aff_c?offer_id=1304&aff_id=16139",
  },
  {
    id: "tiktok",
    name: "TikTok Shop",
    description: "Viral Finds: Exclusive Discounts On Trending Products — Up To 80% Off",
    discount: "80%",
    discountType: "percent",
    used: 210,
    remaining: 18,
    logo: "TikTok",
    link: "https://glctrk.org/aff_c?offer_id=1259&aff_id=16139",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOffers = useMemo(() => {
    let result = [...offers];

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
        // Keep original order for newest
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
  }, [searchQuery, sortOption]);

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
      <Header />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <SortDropdown value={sortOption} onChange={setSortOption} />

      <main className="flex-1 px-6 md:px-12 lg:px-24">
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No offers found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} onGetCode={handleGetCode} />
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
