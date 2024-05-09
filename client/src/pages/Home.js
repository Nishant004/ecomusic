
import SongsList from '../components/SongsList';
import Player from '../components/Player';
import Playlists from '../components/Playlists';


function Home() {
 

  return (
    <>
      <div className='flex  gap-5' >
        <div className='w-1/2 '><SongsList /></div>
        <div className='w-1/2'>
          <Playlists />
        </div>

      </div>
      <Player />
    </>

  );
}

export default Home;