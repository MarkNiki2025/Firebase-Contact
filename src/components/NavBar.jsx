import SearchBar from "./SearchBar";

export default function NavBar({ setbuttonIsClicked }) {
  return (
    <header className="m-5 flex flex-col gap-3">
      <div className="flex h-full items-center justify-center rounded-lg bg-white p-5 font-bold">
        <h1>FireBase Contact App</h1>
      </div>
      <SearchBar setbuttonIsClicked={setbuttonIsClicked} />
    </header>
  );
}
