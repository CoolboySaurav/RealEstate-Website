import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountNav from './AccountNav';

export default function PlaceID() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);
    const {loading} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setDescription(data.description);
            setPerks(data.perks);
            setPhotos(data.photos);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        }).catch(error => {
            console.error('Error fetching place data:', error);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    return (
        <>
        <AccountNav />
        {loading ? (<div className="text-center">Loading...</div>):
        (<div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-semibold mb-4">Place Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{address}</p>
                <p className="text-gray-700 mb-4 text-justify">{description}</p>
                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo, index) => (
                            <img key={index} src={`http://localhost:3500/uploads/${photo}`} alt={`Photo ${index + 1}`} className="rounded-lg" />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">Perks</h3>
                    <ul className="list-disc list-inside">
                        {perks.map((perk, index) => (
                            <li key={index} className="text-gray-600 ">{perk}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">Extra Information</h3>
                    <p className="text-gray-600 text-justify">{extraInfo}</p>
                </div>
                <div className="flex justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-medium mb-2">Check In</h3>
                        <p className="text-gray-600">{checkIn}:00 AM</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Check Out</h3>
                        <p className="text-gray-600">{checkOut}:00 AM</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-2">Max Guests</h3>
                        <p className="text-gray-600">{maxGuests} adults</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    className="primary mt-2 inline-flex justify-center"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <button
                    className="primary  mt-2 inline-flex justify-center"
                    onClick={() => navigate(`/account/places/edit/${id}/`)}
                >
                    Edit
                </button>
            </div>
        </div>)}
        </>
        
    )
}
