"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchScrapingData } from "../../redux/slices/dataSlice";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

// Lazy load the react-leaflet components to handle SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface ICityData {
  cityName: string;
}

// Interface for coordinates
interface ICoordinates {
  latitude: number;
  longitude: number;
  name: string;
}

const ProjectList = ({ cityName }: ICityData) => {
  const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // Accessing state from Redux
  const { isLoading, data, isError } = useSelector(
    (state: RootState) => state.scrapingData
  );

  // Fetch data on component mount or when `cityName` changes
  useEffect(() => {
    dispatch(fetchScrapingData(cityName));
  }, [dispatch, cityName]);

  // Fetch coordinates for each project's location
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (data?.data?.length) {
        const coords = await Promise.all(
          data.data.map(async (item: any) => {
            try {
              const response = await fetch(
                `http://api.positionstack.com/v1/forward?access_key=1621a5a9949737f26b2a5002ca26fa75&query=${encodeURIComponent(
                  item.location
                )}`
              );
              const result = await response.json();
              return {
                name: item.name,
                latitude: result?.data?.[0]?.latitude || 0,
                longitude: result?.data?.[0]?.longitude || 0,
              };
            } catch (error) {
              console.error("Error fetching coordinates:", error);
              return { name: item.name, latitude: 0, longitude: 0 };
            }
          })
        );
        setCoordinates(coords);
      }
    };

    fetchCoordinates();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Error fetching data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 rounded-[100px]">
      {data?.data?.map((item: any, index: number) => (
        <div
          key={index}
          className="flex max-w-[1500px] mx-auto w-full mt-10"
        >
          <div className="grid grid-cols-5 gap-6 w-full bg-slate-600 rounded-lg p-6">
            {/* Left Sidebar */}
            <div className="col-span-2 bg-slate-800 text-white rounded-lg p-2 shadow-lg">
              <div className="relative">
                <img
                  src={
                    item.imageUrl &&
                    item.imageUrl.startsWith("data:image")
                      ? "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=2000"
                      : item.imageUrl
                  }
                  alt={item.name}
                  className="object-cover rounded-lg w-full h-[300px]"
                />
                <div className="absolute bottom-0 left-0 w-full text-start p-4 rounded-b-lg">
                  <h1 className="text-white text-lg font-bold">{item.name}</h1>
                  <h2 className="text-white text-lg">{item.location}</h2>
                  <h1 className="text-white text-lg font-bold">
                    {item.priceRange}
                  </h1>
                  <h1 className="text-white text-sm">{item.bhkDetails}</h1>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-2 bg-white text-gray-800 rounded-lg p-2 shadow-lg">
                <p>latitude:{item.coordinates.latitude},longitude:{item.coordinates.longitude}</p>
              <div className="mt-1">
                {coordinates.length > 0 ? (
                  <MapContainer
                    center={[
                      coordinates[0].latitude || item.coordinates.latitude,
                      coordinates[0].longitude || item.coordinates.longitude,
                    ]}
                    zoom={12}
                    className="h-[270px] rounded-lg"
                  >
                    {coordinates.map((coord, idx) => (
                      <Marker
                        key={idx}
                        position={[coord.latitude||item.coordinates.latitude, coord.longitude||item.coordinates.longitude]}
                      >
                        <Popup>{coord.name}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                ) : (
                  <p>No coordinates available.</p>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-1 bg-slate-800 text-white rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
              <h2 className="font-bold text-3lg">Builder Name</h2>
              <p className="text-sm mt-2 text-yellow-300">
                {item.builderName}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
