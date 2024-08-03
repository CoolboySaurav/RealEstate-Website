import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Register() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                password
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
            alert('User registered');
        } catch(err){
            console.log(err);
            alert('Registeration Failed, Please try again');
        }
        
    }
    
    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }, []);
    
    useEffect(() => {
        setPasswordMatch(password === confirmPassword);

        const isFormFilled = name && email && password && confirmPassword;

        setIsFormValid(isFormFilled && !passwordMatch);
    }, [name, email, password, confirmPassword]);


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className=" mb-64">
                <div className='text-center mb-30'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYYrbknvjK1UdxAa8knqOgQkJDGseeQuEuxQ&s" alt=""  className='inline-block'/>
                </div>
                <h1 className="text-4xl text-center mb-4">Register</h1>
                {confirmPassword && !passwordMatch && <div className="text-red-500 text-center">Passwords do not match</div>}
                <form  className="max-w-md mx-auto " onSubmit={registerUser}>
                    <input 
                        type="text" 
                        required 
                        placeholder={'Your Name'} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} />
                    <input 
                        type="email" 
                        required 
                        placeholder={'Your Email'} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                    <input 
                        type="password" 
                        required 
                        placeholder={'Password'} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
                    <input 
                        type="password" 
                        required 
                        placeholder={'Confirm Password'} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button 
                        className="primary"
                        disabled={!isFormValid}>Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link to={'/login'} className='underline text-black hover:text-blue-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}