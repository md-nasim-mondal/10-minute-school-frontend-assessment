import { SearchIcon } from "@/assets/icons";

export default function SearchBar() {
  return (
    <div className="relative flex w-full items-center gap-2 rounded-[23px] border px-3 py-2">
      <SearchIcon />
      <input
        type="search"
        placeholder="স্কিলস কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
        className="w-full placeholder:text-sm placeholder:text-[#7C818A] focus:outline-none"
      />
    </div>
  );
}
