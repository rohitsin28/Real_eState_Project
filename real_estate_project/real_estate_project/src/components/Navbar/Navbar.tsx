import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="bg-red-600 px-5 sm:px-20 py-2 flex justify-between items-center text-white">
        <Link href="/" className="font-bold text-2xl hover:cursor-pointer">
          Real State
        </Link>
        <div className="flex gap-6 items-center">
          <p className="hover:cursor-pointer">Login</p>
          <p className="bg-white text-black py-1 px-2 rounded-2xl font-semibold hover:cursor-pointer">
            Post Property
            <span className="text-sm px-1 bg-yellow-400 rounded-3xl mx-2">
              Free
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
