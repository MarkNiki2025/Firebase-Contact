export default function PersonCard({ email, name }) {
  return (
    <div className="m-5 flex justify-between rounded-2xl bg-yellow-200 p-2">
      <img src="/user.svg" />
      <span className="m-2">
        <h3 className="mb-1 size-4 w-full font-medium">{name}</h3>
        <p className="14px">{email}</p>
      </span>
      <div className="flex justify-center gap-2">
        <button>
          <img
            src="Vector.svg"
            className="rounded-full bg-white/60 p-2 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-90"
          />
        </button>
        <button>
          <img
            src="trash.svg"
            className="rounded-full bg-white/60 p-2 shadow-sm transition-all duration-200 hover:bg-red-100 hover:shadow-md active:scale-90"
          />
        </button>
      </div>
    </div>
  );
}
