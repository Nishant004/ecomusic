import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
function Login() {
const dispatch = useDispatch();
const navigate = useNavigate();
  
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    
    const login = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/users/login', user);
            dispatch(HideLoading()); 
            if (response.data.success) {
             toast.success(response.data.message);
                localStorage.setItem('token', response.data.data);
                navigate('/');
                
            } else {
                toast.error(response.data.message);
                alert(response.data.message);
            }
        }
        catch (error) {
            toast.error('Something went wrong');   
            dispatch(HideLoading());
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-5 w-96 p-5 '>
                <h1 className='text-3xl font-bold text-primary'>Welcome to Back </h1>
                <hr />
                <input type='text' placeholder='Email'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input type='password' placeholder='Password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button type="button" class=" h-10 px-5 m-0  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ... " onClick={login}>Login</button>
                <Link to='/register'className='text-gray-600 underline'>Not yet Register ? Click Here To Sign-up</Link>
            </div>
            <div>
                <img 
                className='h-[500px]  object-cover'
  src="https://c4.wallpaperflare.com/wallpaper/198/276/1024/music-hd-widescreen-for-desktop-wallpaper-preview.jpg"  alt=''/>
            </div>
        </div >
    )
}

export default Login