import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentSong, SetCurrentSongIndex, SetCurrentTime, SetIsPlaying } from '../redux/userSlice';
import { set } from 'mongoose';

function Player() {

    const [volume, setVolume] = useState(0.5);
    const [shuffleOn, setShuffleOn] = useState(false);

    // const [currentTime, setCurrentTime] = useState(0);
    const dispatch = useDispatch();
    // const [isPlaying, setIsPlaying] = useState(false);
    // console.log(typeof (setIsPlaying));
    const audioRef = React.createRef();
    const { currentSong, currentSongIndex, allSongs ,isPlaying , currentTime } = useSelector((state) => state.user);
    const onPlay = () => {
        audioRef.current.play();
        dispatch(SetIsPlaying(true));
    };
    const onPause = () => {
        audioRef.current.pause();
        dispatch(SetIsPlaying(false));

    };
    const onPrev = () => {
        if (currentSongIndex !== 0  && !shuffleOn) {
        dispatch(SetCurrentSongIndex(currentSongIndex - 1));
        dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
        }
        else{
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            dispatch(SetCurrentSongIndex(randomIndex));
            dispatch(SetCurrentSong(allSongs[randomIndex]));
        }
    }
    const onNext = () => {

        if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
        dispatch(SetCurrentSongIndex(currentSongIndex + 1));
        dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
        }
        else{
            const randomIndex = Math.floor(Math.random() * allSongs.length);
            dispatch(SetCurrentSongIndex(randomIndex));
            dispatch(SetCurrentSong(allSongs[randomIndex]));
        }
    }

    useEffect(() => {

        if (isPlaying) {
            audioRef.current.pause()
            audioRef.current.load()
            audioRef.current.play()
        }

    }, [currentSong]);

    useEffect(() => {
        if (!currentSong && allSongs.length > 0) {
            dispatch(SetCurrentSong(allSongs[0]));

        }
    }, [allSongs]);

    useEffect(() => {
if(currentTime)
{
    audioRef.current.currentTime = currentTime;
}
    }, []);

    return (
        <div className=' absolute bottom-0 left-0 right-0 p-5 bg-white'>
            <div className='flex justify-between items-center shadow-xl p-5 bg-gradient-to-r from-rose-300 from-20% via-green-300 via-30% to-emerald-500 to-80% rounded'>
                <div className='flex items-center gap-2 w-96'>
                    <img className='h-20 w-32' 
        src="https://res.cloudinary.com/dgfo07ptb/image/upload/v1687270889/eco_music/3425171_kac9za.png" 
        alt='' />
                    <div>
                        <h1 className='text-fuchsia-700 text-1xl font-bold'>{currentSong?.title}</h1>
                        <h1 className='text-fuchsia-500'>
                            {currentSong?.artist},{currentSong?.album},{currentSong?.year}</h1>
                    </div>
                </div>
                <div className='w-96 flex flex-col items-center'>
                    <audio src={currentSong?.src} /*controls*/ ref={audioRef} onTimeUpdate={(e) => {
                        dispatch(SetCurrentTime(e.target.currentTime));
                    }}></audio>
                    <div className='flex gap-10 items-center'>
                        <i className="ri-skip-back-fill text-4xl" onClick={onPrev}></i>
                        {isPlaying ? (
                        <i className="ri-pause-circle-fill text-4xl" 
                        onClick={onPause}></i>) : (<i className="ri-play-circle-fill text-4xl"
                         onClick={onPlay}></i>)}
                        <i className="ri-skip-forward-fill text-4xl" onClick={onNext}></i>

                    </div>
                    <div className='flex gap-3 items-center w-full'>
                    <i className={`ri-shuffle-fill text-xl ${shuffleOn && "text-orange-500 font-semibold"}`}  
                    onClick={()=>{
                        setShuffleOn(!shuffleOn);
                    }}></i>
                        <h1>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</h1>
                        <input type='range' className='p-0 w-full' min={0} max={Number(currentSong?.duration) * 60}
                            value={currentTime}
                            onChange={(e) => {
                                audioRef.current.currentTime = e.target.value;
                                dispatch(SetCurrentTime(e.target.value));
                            }} />
                        <h1>{currentSong?.duration}</h1>

                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <i className="ri-volume-mute-fill text-2xl" onClick={()=>{
                        audioRef.current.volume = 0;
                        setVolume(0);
                    }}></i>
                    <input type='range' className='p-0' min={0} max= {1} step={0.1} value={volume} onChange={ (e) => {
                        audioRef.current.volume = e.target.value;
                        setVolume(e.target.value);
                    }}
                    
                    />
                    <i className="ri-volume-up-fill text-2xl"onClick={()=>{
                        audioRef.current.volume = 1;
                        setVolume(1);
                    }}></i>

                </div>

            </div>
        </div>
    )
}

export default Player