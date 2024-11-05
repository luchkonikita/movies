"use client";

import React, { SyntheticEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
  value?: string;
}

const SearchBar = ({ value }: Props) => {
  const rounter = useRouter();

  const handleChange = useDebouncedCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const term = (e.target as HTMLInputElement).value;
      const params = new URLSearchParams();

      if (term) {
        params.append("term", term);
      }

      rounter.push(`/?${params.toString()}`);
    },
    500
  );

  return (
    <form action="" className="w-full">
      <div className="relative">
        <MagnifyingGlassIcon className="size-5 text-gray-500 absolute top-1/2 left-2 -translate-y-1/2" />

        <input
          name="term"
          type="text"
          className="bg-black border border-gray-500 rounded-sm pl-8 pr-3 py-2 w-full text-sm"
          placeholder="Star Wars"
          aria-label="Search Term"
          defaultValue={value}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
