
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {AiFillPlayCircle} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'
import { Container } from './NavBar'
import '../Styled/Video.css'
import axios from 'axios'
import Trailer from './Trailer'


function TvShows() {
  const {toggle, inputValue} = useContext(Container)
  const input = inputValue
  const [showData, setShowdata] = useState ([])
  const [trailer, setTrailer] = useState(true)
  const Shown = input ? 'search' : 'discover'
  const [title, setTitle] = useState('')
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`
  const Images = 'https://image.tmdb.org/t/p/w500'

  const TvShows = async () => {
    const data = await axios.get (Api, {
      params: {
        api_key: '400334e7d27839e434c90b8a59bd3cea',
        query: input
      }
    })
    const results =(data.data.results)
    setShowdata(results)
  }
  useEffect(() => {
    setTimeout(() =>{
      TvShows ()
    },100)
    
  },[input])
  console.log(showData)
  const TvShowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)

  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
      <div className='movies-container'>
      {showData.map((shows) =>{
        return (
          <Fragment key={shows.id} >
            <div id ={trailer ?'container' : 'NoContainer'}>
              <AiFillPlayCircle color='green' fontSize={40} id={trailer ?'playIcon' : 'hide'} onClick={() => TvShowTitle(shows)}/>
              <img src={shows.poster_path ?`${Images}${shows.poster_path}` : '' }alt=''onClick={() => TvShowTitle(shows)} />
              <h3 id= 'smaller-Text'className={toggle ? "mainBgColor" : 'secondaryBgColor'}>{shows.name}</h3>
              

            </div>
          </Fragment>
        )
        })}
        {/* {trailer ? console.log : <Trailer TvShowTitle={title}/>} */}
        <AiOutlineClose id={trailer ? 'Nothing' :'Exit1'} className={toggle ? 'DarkTheme': 'LightThemeClose'} fontSize={55} color='Red' cursor={'pointer'} onClick={() => setTrailer(true)} />
        </div>
        </div>
    </Fragment>
  )
}

export default TvShows