import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "제목이나 내용으로 검색..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value === "") {
            onSearch("");
          }
        }}
        className="pl-10 transition-smooth focus:shadow-md"
      />
    </form>
  );
};