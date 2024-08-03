import {Link, useParams} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import { UserContext } from "../Context/UserContext";

export default function Places() 
{
    const {loading} = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    useEffect(() => 
        {
            axios.get('/user-places').then(({data}) => 
                {
                    setPlaces(data);
                }
            ).catch(error => 
                {
                    console.error('Error fetching place data:', error);
                    setPlaces([]);
                }
            );
        }, []);

        return (
            <div>
              <AccountNav />
                    <div className="text-center">
                        <button className='primary max-w-sm mt-2 inline-flex justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Link to={'/account/places/new'} >Add new place</Link>
                        </button>
                    </div>
                    {loading && <div className="text-center">Loading...</div>}
                    <div className='mt-4'>
                        {places.length>0 && places.map(place => 
                            (
                                <Link key={place._id} to={`/account/places/${place._id}`}className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'> 
                                    <div className='flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-xl'>
                                        {place.photos.length && 
                                            (
                                                <img className="object-cover rounded-xl"src={`http://localhost:3500/uploads/${place.photos[0]}`} alt=""/> 
                                            )}
                                    </div>
                                    <div className='grow-0 shrink'>
                                        <h2 className='text-xl'>{place.title}</h2>
                                        <p className='text-sm mt-2'>{place.description}</p>
                                    </div>
                                </Link>
                            ))
                        }    
                    </div>
            </div>
          );
}