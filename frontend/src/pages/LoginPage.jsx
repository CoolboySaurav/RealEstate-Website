import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const Navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    async function handleLogin(ev)
    {
        ev.preventDefault();
        try
        {
            const userInfo = await axios.post('/login',{email, password}, {
                withCredentials: true
            });
            setUser(userInfo.data);
            alert('Login Successful');
            Navigate('/');
        } catch(err)
        {
            console.log(err);
            if (err.response.status === 401){
                setErrorMessage('Invalid Password, Please check your password and try again');
            } else if (err.response.status === 404){
                setErrorMessage('User not found, Please register first');

            } else {
                setErrorMessage('An error occured, Please try again');
            }
        }
    }

    
    useEffect(() => {
        setEmail('');
        setPassword('');
    }
        , []);

    useEffect(() => {
        const isFormFilled = email && password;

        setIsFormValid(isFormFilled);
    }, [email, password]);


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className=" mb-64">
                <div className='text-center mb-30'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYYrbknvjK1UdxAa8knqOgQkJDGseeQuEuxQ&s" alt=""  className='inline-block'/>
                </div>
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form  className="max-w-md mx-auto "
                        onSubmit={handleLogin}
                >
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <input 
                        type="email" 
                        placeholder={'Your Email'} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input 
                        type="password" 
                        placeholder={'Password'} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                        />
                    <button 
                        className="primary"
                        disabled={!isFormValid}>Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link to={'/register'} className='underline text-black hover:text-blue-700'>Register now</Link>
                    </div>
                </form>
                {/* {redirect && <Navigate to={'/'} />} */}
            </div>
        </div>
    )
}