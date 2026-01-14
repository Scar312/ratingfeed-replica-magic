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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 h-10 rounded-lg text-sm">
          <ArrowUpDown className="w-4 h-4" />
          {sortLabels[value]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-card border-border rounded-xl">
        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="gap-2 cursor-pointer"
          >
            {value === option && <Check className="w-4 h-4 text-primary" />}
            {value !== option && <span className="w-4" />}
            {sortLabels[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
