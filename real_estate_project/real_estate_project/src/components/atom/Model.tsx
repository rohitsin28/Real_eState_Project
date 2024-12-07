import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface City {
  name: string;
  image: string;
}

interface ModalProps {
  onClose: () => void;
  cities: City[];
}

export default function Model({ onClose, cities }: ModalProps) {

  const router  = useRouter(); 

  const handleCityClick = (cityName: string) => {
    router.push(`/city/${cityName}`, {scroll: false})
    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white px-10 py-8 rounded-2xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 hover:text-black">
          <X size={24} />
        </button>
        <h1 className="text-xl font-bold mb-6">Select a City</h1>
        <div className="grid grid-cols-5 gap-4">
          {cities.map((city) => (
            <div key={city.name} className="flex flex-col items-center gap-2 p-2 cursor-pointer" onClick={() => handleCityClick(city.name)}>
              <img src={city.image} alt={city.name} className="w-16 h-16 rounded-full object-cover" />
              <p className="text-sm font-medium text-center">{city.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
