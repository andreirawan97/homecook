import { Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { ChangeEvent, useState } from "react";

import "./Button.css";

type Props = {
  onSearchRecipe?: (searchQuery: string) => void;
};

export default function Searchbar(props: Props) {
  const { onSearchRecipe } = props;

  const [searchQuery, setSearchQuery] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = () => {
    onSearchRecipe && searchQuery && onSearchRecipe(searchQuery);
  };

  return (
    <div className="flex flex-none flex-row">
      <div className="flex flex-1 flex-row rounded-2xl border border-gray-300 p-3 max-w-xl">
        <SearchIcon className="h-6 w-6 mr-3 text-gray-500" />

        <input
          value={searchQuery}
          onChange={onChange}
          className="w-full bg-transparent"
          placeholder="Search recipes..."
          onSubmit={onSearch}
        />
      </div>

      <Transition
        className="flex"
        show={!!searchQuery}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <button onClick={onSearch} className="btn">
          Search
        </button>
      </Transition>
    </div>
  );
}
