import { ArrowUpDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export type SortOption = "popular" | "newest" | "discount" | "ending";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  popular: "Most Popular",
  newest: "Newest",
  discount: "Highest Discount",
  ending: "Ending Soon",
};

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="px-6 md:px-12 lg:px-24 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="w-4 h-4" />
            {sortLabels[value]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 bg-popover">
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onChange(option)}
              className="gap-2"
            >
              {value === option && <Check className="w-4 h-4" />}
              {value !== option && <span className="w-4" />}
              {sortLabels[option]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;
