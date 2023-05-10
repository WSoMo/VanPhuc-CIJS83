import React, { Fragment, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from './NavBar'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import '../Styled/Video.css'


function Trending() {
  const {toggle} = useContext(Container)
  const Api = "https://api.themoviedb.org/3"
  const TrendsShown = "/trending/all/week"
  const Images = 'https://image.tmdb.org/t/p/w500'
  
  const [trendArray,setTrendArray] = useState ([])
  const [trendTitle, setTrendTitle] = useState ('')
  const [trailer, setTrailer] = useState(true)
  
  const Trends = async() => {
    const data = await axios.get (`${Api}${TrendsShown}`,{
      params: {
        api_key: '400334e7d27839e434c90b8a59bd3cea'
      }
    })
    const results = (data.data.results)
    setTrendArray(results)
  }

  useEffect(() =>{
    setTimeout (() =>{
      Trends()
    },100)
  },[])

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }
  console.log (trendArray)
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
      <div className='movies-container'>
      {trendArray.map((trend) =>{
        return (
          <Fragment key={trend.id} >
            <div id ={trailer ?'container' : 'NoContainer'}>
              <AiFillPlayCircle color='green' fontSize={40} id={trailer ?'playIcon' : 'hide'} onClick={() => TrendTitle(trend)}/>
              <img src={trend.poster_path ?`${Images}${trend.poster_path}` : '' }alt=''onClick={() => TrendTitle(trend)} />
              <h3 id='smaller-Text'className={toggle ? "mainBgColor" : 'secondaryBgColor'}>{trend.name}</h3>

            </div>
          </Fragment>
        )
        })}
        <AiOutlineClose id={trailer ? 'Nothing' :'Exit1'} className={toggle ? 'DarkTheme': 'LightThemeClose'} fontSize={55} color='Red' cursor={'pointer'} onClick={() => TrendTitle(true)} />
        </div>
        </div>
    </Fragment>
  )
}

export default Trending