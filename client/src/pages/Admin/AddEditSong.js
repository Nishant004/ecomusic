import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SetAllSongs } from '../../redux/userSlice';

function AddEditSong() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('id');
    const { allSongs , user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fileTypes = ["MP3"];
    const navigate = useNavigate();
    const [song, setSong] = React.useState({
        title: '',
        artist: '',
        album: '',
        year: '',
        duration: '',
        file: '',
    });

    const handleChange = (file) => {
        setSong({ ...song, file: file });
        console.log(file);
    };

    const onAdd = async () => {
        try {
            dispatch(ShowLoading());
            const formData = new FormData();
            Object.keys(song).forEach((key) => {
                formData.append(key, song[key]);
            });

            const response = await axios.post('/api/admin/add-song',
                formData,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success('Song Add successfully');
                dispatch(SetAllSongs(response.data.data));
                navigate('/admin');
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error('Something went wrong');
        }
    }



    const onEdit = async () => {
        try {
            dispatch(ShowLoading());
            const formData = new FormData();
            Object.keys(song).forEach((key) => {
                formData.append(key, song[key]);
            });
            formData.append('_id', songId);


            const response = await axios.post('/api/admin/edit-song',
                formData,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success('Song updated successfully');
                dispatch(SetAllSongs(response.data.data));
                navigate('/admin');
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error('Something went wrong');
        }
    }


    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        if (songId && songId !== '') {
            const existingSong = allSongs.find((s) => s._id === songId);
            setSong(existingSong);
        }

    }, [allSongs])


    useEffect(() => {
        if(user)
        {
          if((user?.isAdmin && !user.isAdmin) || !user?.isAdmin)
        {
        navigate('/');
        }
        }
        
          }, [user])


    return (
        <div>
            <div className='flex items-center gap-5'>
                <i className="ri-arrow-left-circle-fill text-3xl" onClick={() => {
                    navigate('/admin');
                }}></i>
                <h1 className='text-3xl bg-gradient-to-r from-purple-700 to-pink-400 font-bold text-transparent bg-clip-text cursor-pointer'>Add Song</h1>
            </div>
            <div className='flex items-center gap-10'>

                <div className='flex flex-col gap-3 w-1/3 mt-5'>
                    <input type="text" placeholder='Title' value={song.title} onChange={(e) => {
                        setSong({ ...song, title: e.target.value });
                    }} />
                    <input type="text" placeholder='Artist' value={song.artist} onChange={(e) => {
                        setSong({ ...song, artist: e.target.value });
                    }
                    } />
                    <input type="text" placeholder='Album' value={song.album} onChange={(e) => {
                        setSong({ ...song, album: e.target.value });
                    }
                    } />
                    <input type="text" placeholder='Year' value={song.year} onChange={(e) => {
                        setSong({ ...song, year: e.target.value });
                    }
                    } />
                    <input type="text" placeholder='Duration' value={song.duration} onChange={(e) => {
                        setSong({ ...song, duration: e.target.value });
                    }
                    } />
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    {song.file && <h1 className='text-gray-500'>{song.file.name}</h1>}
                    <div className='flex justify-end'>
                        {songId && songId !== '' ? <button type="button" class=" h-10 py-full px-5 w-full  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
                            onClick={onEdit}>Edit</button> : <button type="button" class=" h-10 py-full px-5 w-full  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
                                onClick={onAdd}>Add</button>
                        }
                    </div>

                </div>
                <div>
                    <img className= 'h-[500px]' src='  
                    https://res.cloudinary.com/dgfo07ptb/image/upload/v1688335137/27782489_fv8or0.jpg
                    ' alt='' />
                </div>
            </div>
        </div>
    )
}

export default AddEditSong