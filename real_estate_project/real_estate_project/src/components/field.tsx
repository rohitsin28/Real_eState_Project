export default function Field() {
  return (
    <div className="min-h-screen w-full bg-slate-800 rounded-t-[100px] mt-10 relative text-black pt-40">
      <div className="flex max-w-[1500px] mx-auto h-[350px] rounded-2xl bg-white overflow-hidden">
        <div className="grid grid-cols-4 gap-5 w-full m-2">
          <div className="col-span-1 overflow-hidden items-center justify-center flex h-full w-full rounded-3xl">
            <img
              src="https://imgs.search.brave.com/b862pxKVeh2ockvEeTT2ywqly3mIuT4hz5YpI7EV5XM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kZWVw/YWkub3JnL3N0YXRp/Yy9pbWFnZXMvZG9s/cGhpbjIuc3Zn"
              alt="Animated Image"
              className="object-bottom"
            />
          </div>
          <div className="bg-yellow-600 col-span-2 overflow-hidden">
            <div className="grid grid-rows-[auto,1fr] gap-5 p-5">
              {/* Full-width content at the top */}
              <div className="row-span-1">
                <div className="text-white">It takes full width</div>
              </div>

              {/* Left and Right sections (equal width and same height) */}
              <div className="grid grid-cols-2 gap-5 h-full">
                <div className="bg-blue-600 text-white p-5 rounded-xl h-full">
                  <h1 className="text-center">Left</h1>
                </div>
                <div className="bg-green-600 text-white p-5 rounded-xl h-full">
                  <h1 className="text-center">Right</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-400 col-span-1 flex flex-col gap-10 h-full items-center justify-center rounded-3xl">
            <button className="bg-red-500 text-white font-semibold border-0 px-4 py-2 rounded-3xl">
              Contact Builder
            </button>
            <button className="bg-red-500 text-white font-semibold border-0 px-4 py-2 rounded-3xl">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
