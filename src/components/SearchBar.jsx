export default function SearchBar() {
    return (
        <div className='flex w-full justify-between gap-2 mt-3'>
            <div className="border border-white rounded-xl flex items-center justify-center p-1.5 flex-1 min-w-0 gap-2 transition-all duration-200 focus-within:border-gray-dark focus-within:ring-2 focus-within:ring-gray/20">
                <img src='/lupa.svg' alt="Search" className="h-5 m-1 opacity-70" />
                <input
                    type="text"
                    className="w-full outline-none bg-transparent text-white"
                />
            </div>
            <button className="w-12 h-12 rounded-full bg-white text-4xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-90 active:bg-gray-dark">
                +
            </button>
        </div>
    )
}