import { Heart, Tag } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-24">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Tag className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Ratingfeed</h1>
          <p className="text-sm text-primary">Save More, Spend Less</p>
        </div>
      </div>
      <button className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
        <Heart className="w-5 h-5 text-muted-foreground" />
      </button>
    </header>
  );
};

export default Header;
