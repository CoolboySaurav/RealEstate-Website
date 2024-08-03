import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserContext = createContext();


export function UserContextProvider({children}){
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user && location.pathname != '/login') {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setLoading(false);
            }).catch(() => {
                setUser(null);
                setLoading(true);
                navigate('/login');
            }).finally(() => {
                setLoading(false);
            });
        } 
    }
    , []);

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}