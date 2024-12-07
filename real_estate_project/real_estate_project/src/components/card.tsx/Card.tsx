import CITY_DATA from "../../data/city";

export default function Card() {
  return (
    <div className="grid grid-cols-3 gap-5 shadow-lg w-[60%] pt-16 rounded-full">
      <div className="flex flex-col items-center p-5 rounded-lg shadow-md bg-slate-600 border-0">
        <img
          src={
            "https://imgs.search.brave.com/ah-41A0LDgHkYGnNEoEDN5DE07ufMbjeNPaAokX6NKE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/NjQwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw"
          }
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <div className="text-center text-xl">
          Expert Reviews & <br />
          <span className="font-semibold">Advice</span>
        </div>
      </div>
      <div className="flex flex-col items-center p-5 rounded-lg shadow-md bg-slate-600 border-0">
        <img
          src={
            "https://imgs.search.brave.com/ah-41A0LDgHkYGnNEoEDN5DE07ufMbjeNPaAokX6NKE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/NjQwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw"
          }
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <div className="text-center text-xl">
        <span className="font-semibold">Project Directory {" "}</span><br />
          For All New Projects
        </div>
      </div>
      <div className="flex flex-col items-center p-5 rounded-lg shadow-md bg-slate-600 border-0">
        <img
          src={
            "https://imgs.search.brave.com/ah-41A0LDgHkYGnNEoEDN5DE07ufMbjeNPaAokX6NKE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I2L0lt/YWdlX2NyZWF0ZWRf/d2l0aF9hX21vYmls/ZV9waG9uZS5wbmcv/NjQwcHgtSW1hZ2Vf/Y3JlYXRlZF93aXRo/X2FfbW9iaWxlX3Bo/b25lLnBuZw"
          }
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <div className="text-center text-xl">
        Updated Project Reports from {" "} <br />
          <span className="font-semibold">RERA</span>
        </div>
      </div>
    </div>
  );
}
