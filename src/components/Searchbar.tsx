import { SearchIcon } from "@heroicons/react/outline";

export default function Searchbar() {
  return (
    <div className="flex flex-1 flex-row rounded-2xl border border-gray-300 p-3 max-w-xl">
      <SearchIcon className="h-6 w-6 mr-3 text-gray-500" />

      <input
        className="w-full bg-transparent"
        placeholder="Search recipes..."
      />
    </div>
  );
}
