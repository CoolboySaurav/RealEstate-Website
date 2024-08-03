import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const {user, loading} = useContext(UserContext);
    const Navigate = useNavigate(); 
    
    useEffect(() => {
      
        if (!loading && !user) 
        {
          Navigate('/login');
        }
    }, [user,loading,Navigate]);

    useEffect(() => 
        {
            axios.get('/places').then(response => 
                {
                    setPlaces([...response.data]);   
                }
            )
        }, []
    )
    if (loading) 
        {
          return <div>Loading...</div>;
        }
  
    return (
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6">
            {places.length>0 && places.map(place =>
                (
                    <Link to={'/place/'+ place._id} key={place._id}>
                        <div className="bg-gray-500 rounded-2xl flex">
                            {place.photos?.[0] && 
                                (
                                    <img src={`http://localhost:3500/uploads/${place.photos?.[0]}`} alt='uploaded' className="object-cover rounded-2xl aspect-square"/>
                                )
                            }
                        </div>
                        <h2 className="text-sm truncate mt-1 leading-1">{place.title}</h2>
                        <h3 className="font-bold truncate">{place.address}</h3>
                    </Link>
                )
            )
            } 
        </div>   
    )
}