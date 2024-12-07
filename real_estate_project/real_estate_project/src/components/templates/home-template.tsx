"use client"
import { ArrowDown, ChevronRight } from 'lucide-react';
import React, { ReactNode, useState } from 'react'
import Card from '../card.tsx/Card';
import Model from '../atom/Model';
import CITY_DATA from '../../data/city';
import { usePathname } from 'next/navigation';

const HomeTemplate = ({children}: {children : ReactNode}) => {

    const path = usePathname();

    const cityName = path?.slice(1);
    const isCitySelected = cityName.length > 0;
    const [showModel, setShowModel] = useState<boolean>(false);

    return (
        <div className="min-h-screen relative w-full">
            <img
                src="https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=2000"
                alt="Cityscape"
                className="w-full h-[650px] object-cover"
            />
           {isCitySelected && <p className="absolute top-4 left-5 md:left-20 text-white text-xs md:text-sm flex items-center gap-1">
                Home <ChevronRight size={11} /> New Project in {cityName}
            </p>}
            
            <div className="absolute inset-0 flex flex-col items-center mt-10 text-center text-white gap-5">
                <p className="text-4xl md:text-[50px]">Hello Rohit</p>
                <h2 className="text-2xl md:text-5xl font-light">
                    Encyclopedia For All New Projects
                </h2>
                <div className="text-xl md:text-3xl flex items-center gap-3">
                    in <span className="underline cursor-pointer">{isCitySelected ? cityName : "Please Select A City"}</span>
                    <button onClick={() => setShowModel(true)}>
                        <ArrowDown size={25} />
                    </button>
                </div>
                <Card />
                {children}
            </div>

            {showModel && (
                <Model
                    onClose={() => setShowModel(false)}
                    cities={CITY_DATA}
                />
            )}
        </div>
    )
}

export default HomeTemplate