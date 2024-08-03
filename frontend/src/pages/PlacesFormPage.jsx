import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav";
import Perks from "./Perks";
import Photos from "./Photos";


export default function PlacesFormPage() 
{
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [photosLink, setPhotosLink] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]); // [filename, filename, ...
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(0);

    const Navigate = useNavigate();
    
    useEffect(() =>
        {
            if (!id) return;
            axios.get(`/places/${id}`).then(response => 
                {
                    const {data} = response;
                    setTitle(data.title);
                    setAddress(data.address);
                    setDescription(data.description);
                    setPerks(data.perks);
                    setPhotos(data.photos);
                    setAddedPhotos(data.photos);
                    setExtraInfo(data.extraInfo);
                    setCheckIn(data.checkIn);
                    setCheckOut(data.checkOut);
                    setMaxGuests(data.maxGuests);

                }
            )
        }, [id]);

        function inputHeader(text) 
        {
            return (
                <h2 className='text-2xl mt-4'>{text}</h2>
            )
        }
    
        function inputDescription(text) 
        {
            return (
                <p className='text-gray-500 text-sm'>{text}</p>
            )
        }
    
        function preInput( header, description) 
        {
            return (
                <>
                    {inputHeader(header)}
                    {inputDescription(description)}
                </>
            )
        }

        async function addPhotoByLink(ev) 
        {
            ev.preventDefault();
            const {data:filename} = await axios.post('/upload-by-link', {link: photosLink});
            setAddedPhotos([...addedPhotos, filename]);
            setPhotosLink('');
    
        }
    
        function uploadPhoto(ev) 
        {
            const file = ev.target.files;
            const data = new FormData();
            for (let i = 0; i < file.length; i++) {
                data.append('photo', file[i]);
            }
            axios.post('/upload', data,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                const{data: filenames} = response;
                setAddedPhotos(prev =>{
                    return [...prev, ...filenames];}
                );
            });
        };
    

        function addNewPlace(ev) 
        {
            ev.preventDefault();
            if (id) 
                {
                    axios.put('places/', 
                    {
                        id, title, address, description, perks, addedPhotos, extraInfo, checkIn, checkOut, maxGuests
                    }).then(() => {
                        Navigate('/account/places');
                    });
                } else 
                {
                    axios.post('/places', 
                        {
                            title, address, description, perks, addedPhotos , extraInfo, checkIn, checkOut, maxGuests
                        }).then(() => {
                        setTitle('');
                        setAddress('');
                        setDescription('');
                        setPerks([]);
                        setPhotos([]);
                        setPhotosLink('');
                        setAddedPhotos([]);
                        setExtraInfo('');
                        setCheckIn('');
                        setCheckOut('');
                        setMaxGuests(0);
                        Navigate('/account/places');
                    });
                }
        }

        return (
            <div>
                <AccountNav />
                <form
                    onSubmit={addNewPlace} 
                >
                    {preInput('Title', 'Title for your place. Should be short and catchy')}
                    <input 
                        type="text" 
                        placeholder='Title for your property'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    {preInput('Address', 'Address of your place')}
                    <input 
                        type="text" 
                        placeholder='address' 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    
                    {preInput('Description', 'Describe your place')}
                    <textarea 
                        className='w-full h-32' 
                        placeholder='Description of your place'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        />
                    {preInput('Perks', 'List the perks of your place')}
                    < Perks 
                        selected={perks}
                        onChange={setPerks}
                        />
                    {preInput('Photos', 'Upload photos of your place')}
                    <Photos 
                        photosLink={photosLink}
                        setPhotosLink={setPhotosLink}
                        addPhotoByLink={addPhotoByLink}
                        addedPhotos={addedPhotos}
                        uploadPhoto={uploadPhoto}
                        onChange={setAddedPhotos}
                    />
                    {preInput('Extra Info', 'Add any extra information about your place')}
                    <textarea 
                        className='w-full h-32' 
                        placeholder='Extra information about your place'
                        value={extraInfo}
                        onChange={(e) => setExtraInfo(e.target.value)} 
                        />
                    {preInput('Check-In&Check-Out Times, Max Guest Capacity', 'Add check-in and check-out times and maximum guest capacity')}
                    <div>
                        <div className='flex gap-2'>
                            <input 
                                type="text" 
                                placeholder='Check-in time:07:00' 
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                />
                            <input 
                                type="text" 
                                placeholder='Check-out time:19:00' 
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                />
                            <input 
                                type="number" 
                                placeholder='Max guest capacity:10'
                                value={maxGuests}
                                onChange={(e) => setMaxGuests(e.target.value)}
                                />
                        </div>
                    </div>
                    <button className='primary my-4'>
                        Save
                    </button>
                </form>


            </div>
        );       
}


