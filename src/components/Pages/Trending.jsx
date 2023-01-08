import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Pages from '../Pagination'
import SingleContent from '../SingleContent'

function Trending() {

  const [trends, setTrends] = useState([])
  const [page, setpage] = useState(1)
  const [error, seterror] = useState(false)

  const fetchTrends = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a0856e0bcc44c755d6e347cdca4cdd92&page=${page}`)
    const alldata = data.results
    // console.log(alldata)
    setTrends(alldata)
  }

  useEffect(() => {
    fetchTrends()
      //eslint-disable-next-line
      .catch(error => {
        seterror(error.message)
      })
  }, [page])
  return (
    <div className='pb-32'>
      <h1 className='flex justify-center text-xl font-bold uppercase pb-6'>trending</h1>
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
                  media_type={trend.media_type}
                />

                {/* pagination */}

              </div>
            )
          })
        }
      </div>
      {error ? " " : <Pages setpage={setpage} />}
    </div>
  )
}

export default Trending