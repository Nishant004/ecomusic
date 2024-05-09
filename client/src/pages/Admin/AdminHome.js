import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [selectedSongForEdit, setSelectedSongForEdit] = React.useState(null);
  const { allSongs , user } = useSelector(state => state.user)
  const navigate = useNavigate();


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
      <div className='flex  justify-between'>
        <h1 className='bg-gradient-to-r from-purple-700 to-pink-400 text-3xl font-bold text-transparent bg-clip-text cursor-pointer'>All Songs</h1>
        <button type="button" class=" h-8 px-4 m-0  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..." onClick={() => {
          navigate('/admin/add-edit-song');
        }}>
          Add Song
        </button>
      </div>
      <table className='w-full mt-5'>
        <thead className='w-full'>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>

        </thead>
        <tbody>
          {allSongs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.year}</td>
              <td>{song.duration}</td>
              <td>
                <i className="ri-edit-2-fill text-2xl text-gray-500" onClick={() => {
                  navigate('/admin/add-edit-song/?id=' + song._id);
                }}></i>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default AdminHome