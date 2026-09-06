export default function PersonCard ({email,name}) {
    return(
        <div className="bg-yellow-200 m-5 rounded-2xl flex p-2 justify-between">
            <img src="/user.svg"/>
            <span className="m-2">
                <h3 className="font-medium size-4 w-full mb-1">{name}</h3>
                <p className="14px">{email}</p>
            </span>
            <div className="flex justify-center gap-2 ">
                <button>
                    <img src="Vector.svg" className="p-2 rounded-full bg-white/60 hover:bg-blue-100 active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md"/>
                </button>
                <button>
                    <img src="trash.svg" className="p-2 rounded-full bg-white/60 hover:bg-red-100 active:scale-90 transition-all duration-200 shadow-sm hover:shadow-md"/>
                </button>
            </div>
        </div>
    )
}