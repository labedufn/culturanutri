"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export default function SearchInput({ onSearch, placeholder }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return <Input icon={<Search />} placeholder={placeholder} value={searchQuery} onChange={handleInputChange} />;
}
