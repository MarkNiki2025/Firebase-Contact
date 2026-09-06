import SearchBar from "./SearchBar";

export default function NavBar () {
    return (
        <header className="m-5 flex flex-col gap-3 ">
        <div className="flex justify-center items-center font-bold bg-white h-full rounded-lg  p-5">
                <img src="/firebase.svg" />
                <h1>FireBase Contact App</h1>
        </div>
            <SearchBar />
        </header>
    )
}