import axios  from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { SetSelectedPlaylist, SetSelectedPlaylistForEdit, SetUser } from '../redux/userSlice';
import Player from '../components/Player';

function CreateEditPlaylist() {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    const [selectedSongs, setSelectedSongs] = React.useState([]);
    const { allSongs , selectedPlaylistForEdit } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const selectUnselectSong = (song) => {


        if (selectedSongs.find((s) => s._id === song._id)) {
            setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
        } else {
            setSelectedSongs([...selectedSongs, song]);
        }
    };
    const onAdd = async () => {
        if (name.trim().length === 0 || selectedSongs.length === 0) {
            toast.error('Please fill all fields');

        }
        else {
            try {
                dispatch(ShowLoading());
                const response = await axios.post('/api/songs/add-playlist', {
                    name,
                    songs: selectedSongs,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    dispatch(HideLoading());
                if (response.data.success) {
                    toast.success('Playlist created successfully');
                    dispatch(SetUser(response.data.data));
                    setName('');
                    setSelectedSongs([]);
                    navigate('/');
                }
                else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                dispatch(HideLoading());
                toast.error('Something went wrong');
            }
        }
    };



    const onEdit = async () => {
        if (name.trim().length === 0 || selectedSongs.length === 0) {
            toast.error('Please fill all fields');

        }
        else {
            try {
                dispatch(ShowLoading());
                const response = await axios.post('/api/songs/update-playlist', {
                    name,
                    songs: selectedSongs,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    dispatch(HideLoading());
                if (response.data.success) {
                    toast.success('Playlist updated successfully');
                    dispatch(SetUser(response.data.data));
                    dispatch(SetSelectedPlaylistForEdit(null));
                    dispatch(SetSelectedPlaylist({
                        name : 'All Songs',
                        songs : allSongs
                    }))
                    setName('');
                    setSelectedSongs([]);
                    navigate('/');
                }
                else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                dispatch(HideLoading());
                toast.error('Something went wrong');
            }
        }
    };



useEffect(() => {

if(selectedPlaylistForEdit){
    setName(selectedPlaylistForEdit.name);
    setSelectedSongs(selectedPlaylistForEdit.songs);
}
    
}, []);

    return (
        <div>
            <div className='flex items-center gap-5'>
                <i className="ri-arrow-left-circle-fill text-3xl" onClick={()=>{
                    navigate('/');
                }}></i>
                <h1 className='bg-gradient-to-r from-purple-700 to-pink-400 text-3xl font-bold text-transparent bg-clip-text cursor-pointer'>Create Playlist</h1>
            </div>
            <div className='flex justify-between gap-3 mt-5'>
                <input className='w-96' type='text' placeholder='name' value={name}disabled={selectedPlaylistForEdit} 
                onChange={(e) => {
                    setName(e.target.value);
                }} />
                <button type="button" class=" h-8 px-4 m-0  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..." onClick={()=>{
                    if(selectedPlaylistForEdit){
                        onEdit();
                    }
                    else{
                        onAdd();
                    }
                }}>SAVE</button>
            </div>
            <h1 className='my-5 text-2xl'>Selected Songs - {selectedSongs.length}</h1>
            <div className='grid grid-cols-3 gap-3 '>
                {allSongs.map((song, index) => {
                    const isSelected = selectedSongs.find((s) => s._id === song._id);
                    return (
                        <div className={`p-2 flex items-center shadow justify-between border cursor-pointer border-gray-300 rounded ${isSelected && 'border-b-emerald-500 border-4'}`}
                            onClick={() => selectUnselectSong(song)

                            }>
                            <div>
                                <h1>{song.title}</h1>
                                <h1>{song.artist}- {song.album} - {song.year}</h1>
                            </div>

                        </div>
                    )
                })}


            </div>
<Player/>
        </div>
    )
}

export default CreateEditPlaylist