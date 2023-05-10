import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import '../Styled/TrailerMovies.css'


function Trailer({movieTitle}) {
    const [video, setVideo] = useState ("")
    const [videoURL, setVideoURL] = useState ("https://www.youtube.com/watch?v=eZ2Rt2DVGdU")

    function handleSearch () {
        setVideo (movieTitle)
        movieTrailer(video).then((res) =>{
        setVideoURL(res);
        });
    }
    // useEffect (()=>{
    //     handleSearch()
    // },[videoURL])
  return (
    <Fragment>
        <div className='Container'> </div>
        <div className='player'>
            <ReactPlayer url={videoURL} controls={true}/>
        </div>
    </Fragment>
  )
}

export default Trailer