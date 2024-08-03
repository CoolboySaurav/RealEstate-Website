import { useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../pages/AddressLink";
import BookingDates from "../pages/BookingDates";
import PlaceGallery from "../pages/PlaceGallery";



export default function SingleBooking() {
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
        axios.get('/booking').then(response => {
            const foundBooking = response.data.find(({_id}) => _id === id);
            if (foundBooking) {
                setBooking(foundBooking);
            }
        }).catch(error => {
            setError(error);
            console.log(error);
        });
        }
    }, [id]);

    if (error) {
        return <div>There was an error: {error.message}</div>
    }

    if (!booking) {
        return '';
    }
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
                <h2 className="text-2xl mb-4">Your booking information:</h2>
                <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
                <div>Total price</div>
                <div className="text-3xl">${booking.price}</div>
            </div>
            </div>
                <PlaceGallery place={booking.place} />
         </div>
    )
}