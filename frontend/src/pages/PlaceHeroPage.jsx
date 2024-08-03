import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import Booking from "./Booking";

export default function PlaceHeroPage() {
    const {id} = useParams();
    const [place, setPlace] = useState({});
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => 
        {
            if(!id) return;
            axios.get(`/places/${id}`).then(response => 
                {
                    setPlace(response.data);
                }
            )
        }
    , [id]);

    if (!place) return <h1>Loading...</h1>

    if (showAllPhotos) {
        return (
            <div className="abosolute bg-white min-h-screen ">
                <div>
                    <h2 className="text-3xl mt-4 mr-36">Photos of {place.title}</h2>
                    <button className="fixed flex items-center bg-black opacity-55 mt-5 justify-evenly lg:left-20 shadow shadow-black" onClick={() => setShowAllPhotos(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Close
                    </button>
                </div>
                <div className="p-8 grid gap-4">
                    {place?.photos?.length > 0 && place.photos.map((photo,i) => 
                        (
                            <div key={i}>
                                <img src={`http://localhost:3500/uploads/${photo}`} alt='uploaded' className="w-full rounded-2xl"/>
                            </div>
                        )
                    )
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto ">
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8 max-w-[2500px]">
            <h1 className="text-3xl">{place.title}</h1>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <a className="my-2 block font-semibold underline"target="_blank" href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
            </div>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden cursor-pointer">
                    <div>
                        {place.photos?.[0] && 
                            (
                                <img className="aspect-square object-cover"src={`http://localhost:3500/uploads/${place.photos[0]}`} alt='uploaded'/>
                            )
                        }
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && 
                            (
                                <img className="aspect-square object-cover" src={`http://localhost:3500/uploads/${place.photos[1]}`} alt='uploaded'/>
                            )
                        }
                        <div className=" overflow-hidden">
                            {place.photos?.[2] && 
                                (
                                    <img className="aspect-square object-cover relative top-2" src={`http://localhost:3500/uploads/${place.photos[3]}`} alt='uploaded'/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button className="absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shaddow shadow-md shaddow-gray-500 text-black  flex gap-1 items-center" onClick={() => setShowAllPhotos(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>

                    Show more photos
                </button>
            </div>
            
            <div className="grid grid-cols-2 mt-5">
                <div>
                    <div className="my-4 pr-2">
                        <h2 className="font-semibold text-2xl text-justify">Description</h2>
                        {place.description}
                    </div>
                    <div>
                        Check-in: 0{place.checkIn}:00 AM<br />
                        Check-out: {place.checkOut}:00 PM<br />
                        Max number of guests: {place.maxGuests}<br />
                    </div>
                </div>    
                <Booking 
                    place={place}
                 />
            </div>
            <div>
                <h2 className="font-semibold text-2xl text-justify">Amenities</h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {place.perks?.map((amenity,ind) => 
                        (
                            <div className="flex gap-2 items-center" key={ind}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14 9 17l-3-3M9 7v10M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
                                </svg>
                                <span className="text-xl">{amenity}</span>
                            </div>
                        )
                    )
                    }
                </div>
            </div>
            
        </div>
        <div>
            <h1 className="font-semibold text-2xl text-justify mt-2">Extra Information</h1>
            <p className="text-sm text-justify mt-3 text-gray-500">{place.extraInfo}</p>
        </div>
        </div>
    )
}