import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export default function SearchBar({ setbuttonIsClicked, filterContacts}) {
  return (
    <div className="mt-3 flex w-full justify-between gap-2">
      <div className="focus-within:border-gray-dark focus-within:ring-gray/20 flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-white p-1.5 transition-all duration-200 focus-within:ring-2">
        <CiSearch className="text-3xl text-white opacity-70" />
        <input
          onChange={filterContacts}
          type="text"
          className="w-full bg-transparent text-white outline-none"
        />
      </div>
      <button
        onClick={() => setbuttonIsClicked(true)}
        className="flex items-center justify-center h-12  bg-white active:bg-gray-dark w-12 shrink-0 rounded-full p-0 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-90"
      >
        <FaPlus className="text-2xl"/>
      </button>
    </div>
  );
}
