import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function DefaultLayout({ children }) {
    const  navigate  = useNavigate();
    const { user } = useSelector((state) => state.user)
    return (
        <div className='main'>
            <div className='header flex justify-between p-5 shadow items-center bg-gradient-to-r from-green-300 to-emerald-500'>

{/* bg-gradient-to-r from-purple-500 to-pink-500 text-3xl font-bold text-transparent bg-clip-text cursor-pointer */}


                <h1 className='ml-7 bg-gradient-to-r from-purple-700 to-pink-400 text-3xl font-bold text-transparent bg-clip-text cursor-pointer'
                onClick={()=>{
                    navigate('/');
                }}>  ECO_MUSIC</h1>
                <div className='flex items-center gap-2'>
                    <h1 className='text-xl '>{user?.name.toUpperCase()}</h1>
                    <i className="ri-logout-circle-r-line text-xl cursor-pointer" onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}></i>
                </div>
            </div>
            <div className='content m-10 '>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;