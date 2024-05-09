import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentSong, SetCurrentSongIndex, SetSelectedPlaylist } from '../redux/userSlice';
import { set } from 'mongoose';

function SongsList() {
  const { currentSong, selectedPlaylist, allSongs } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = React.useState('');
const [songsToPlay , setSongsToPlay] = React.useState([]);


useEffect(() => {

if(selectedPlaylist){
  if(selectedPlaylist && selectedPlaylist.name ==='All Songs' && searchKey !== '')
  {
    const tempSongs = selectedPlaylist.songs.filter(songs => 
      songs.title.toLowerCase().includes(searchKey.toLowerCase()) 
    || songs.artist.toLowerCase().includes(searchKey.toLowerCase()) 
    || songs.album.toLowerCase().includes(searchKey.toLowerCase()) 
    || songs.year.toLowerCase().includes(searchKey.toLowerCase()));
  
    setSongsToPlay(tempSongs);
  }
  else
  {
  setSongsToPlay(selectedPlaylist?.songs);
  }
}
},[selectedPlaylist , searchKey ]);



  return (
    <div className='flex flex-col gap-3'>
      <div className='pl-3 pr-6'>
        <input type="text" placeholder='Song , Artist , Album' className='rounded w-full mx-3'
          onFocus={() => dispatch(SetSelectedPlaylist({
            name: 'All Songs',
            songs: allSongs,
          }))}
          value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
      </div>


      <div className='overflow-y-scroll h-[52vh] p-3'>
        {songsToPlay?.map((song, index) => {
          const isPlaying = currentSong?._id === song._id;
          return (
            <div className={`p-2 text-rose-600 flex items-censter justify-between cursor-pointer 
            ${isPlaying && 'shadow border-1 border-gray-300 rounded text-secondary font-bold '}`} onClick={() => {
              dispatch(SetCurrentSong(song));
              dispatch(SetCurrentSongIndex(index));
            }}>
              <div>
                <h1>{song.title}</h1>
                <h1>{song.artist} {song.album}  {song.year}</h1>
              </div>
              <div>

                <h1>{song.duration}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default SongsList