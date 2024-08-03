import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Booking({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const Navigate = useNavigate();
    const today = new Date();
    const errorCheckIn = "Check-In date should be one day after today";
    const errorCheckOut = "Check-Out date should be after Check-In date";
    let numberOfDays = 0
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() 
    {
        const data = { checkIn, checkOut, guests, name, mobile, place:place._id, price: numberOfDays*1456}
        const response = await axios.post('/booking',data);
        const bookingId = response.data._id;
        Navigate(`/account/bookings/${bookingId}`);
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-2xl">Price: <span className="font-semibold">$ {numberOfDays > 0 ? (<span>{numberOfDays*1456}</span>):(<span>0</span>)}</span></h2>
            {/* <h2 className="text-2xl">Number of Days: <span className="font-semibold">{numberOfDays}</span></h2> */}
            <p className="text-sm text-red-600">{new Date(checkIn) < today ? errorCheckIn : ""}</p>
            <p className="text-sm text-red-600">{new Date(checkOut) < new Date(checkIn) ? errorCheckOut : ""}</p>
            <div className="mt-2 flex gap-2">
                <div className="flex-grow">
                    <label className="block">Check-In</label>
                    <input  type="date" 
                            value={checkIn} 
                            onChange={(e)=> setCheckIn(e.target.value)}
                            className="w-full"/>
                </div>
                <div className="flex-grow">
                    <label className="block">Check-Out</label>
                    <input  type="date" 
                            value={checkOut} 
                            onChange={(e)=> setCheckOut(e.target.value)}
                            className="w-full"/>
                </div>
            </div>
            <div className="flex">
                <label className="text-lg content-center text-nowrap mr-4 ml-2">Number of Guests</label>
                <input  type="number" 
                value={guests}
                onChange={(e)=> setGuests(e.target.value)} 
                className="w-full" 
                placeholder="10"/>
            </div>
            {numberOfDays>0 && (
                <>
                <input  type="text" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="w-full mt-2"/>
                <input type="tel" 
                        placeholder="Enter your mobile number" 
                        value={mobile}
                        onChange={(e)=> setMobile(e.target.value)}
                        className="w-full mt-2"/>
                </>
            )
            }
            <div className="flex gap-3 mt-3">
                <button     className='primary mt-2'
                            onClick={bookThisPlace}
                >
                    Book Now    
                </button>
                <button className='bg-green-500 max-w-sm mt-2 hover:bg-gray-400 '>Add to Whishlist</button>
            </div>
        </div>
    )
}

// {numberOfDays>0 && (
//     <span>{numberOfDays}</span>
// )}
