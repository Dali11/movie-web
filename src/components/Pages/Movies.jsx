import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Pages from '../Pagination'
import SingleContent from '../SingleContent'

function Movies() {

  const [trends, setTrends] = useState([])
  const [page, setpage] = useState(1)
  const [numberOfPages, setnumberOfPages] = useState()
  const [error, seterror] = useState(false)

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a0856e0bcc44c755d6e347cdca4cdd92&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
    const alldata = data.results
    // console.log(alldata)
    setTrends(alldata)
    setnumberOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
     //eslint-disable-next-line
     .catch(error => {
      seterror(error.message)
    })
  }, [page])
  return (
    <div className='pb-32'>
      <h1 className='flex justify-center text-xl font-bold uppercase pb-6'>movies</h1>
      <div className='grid grid-cols-2  tablet:grid-cols-4 gap-4 grid-flow-row'>
      {
          error &&
          <div className='absolute laptop:right-72 laptop:mr-72 mt-16 tablet:ml-32 laptop:pl-0 pl-16'>
            <h1 className='text-sm'>
              NetworkError while try to fetch movie data. <br></br>Please check your <span className='font-black'>internet connection</span>
            </h1>
          </div>
        }
        {
          trends.map((trend) => {
            return (
              <div key={trend.id}>
                <SingleContent
                  id={trend.id}
                  title={trend.title || trend.name}
                  poster={trend.poster_path}
                  date={trend.release_date || trend.first_air_date}
                  average={trend.vote_average}
                  media_type="movie"
                />

                {/* pagination */}

              </div>
            )
          })
        }
      </div>
      
      {error ? " " : <Pages setpage={setpage} numberOfPages={numberOfPages}/>}
    </div>
  )
}

export default Movies