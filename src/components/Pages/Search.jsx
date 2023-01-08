import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Pages from '../Pagination';
import SingleContent from '../SingleContent';

function Search() {
  const [type, settype] = useState(0)
  const [page, setpage] = useState(1)
  const [searchText, setsearchText] = useState('')
  const [content, setcontent] = useState([])
  const [numberOfPages, setnumberOfPages] = useState()
  const [error, seterror] = useState(false)

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=a0856e0bcc44c755d6e347cdca4cdd92&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setcontent(data.results)
    setnumberOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchSearch()
    .catch(error => {
      console.log(error.message)
    })
    // eslint-disable-next-line
  }, [page, type])

  const handleSearch = (e) => {
    e.preventDefault()
    setpage(1)
  }
  return (
    <div className="search">
      <form onSubmit={handleSearch} className="flex justify-center mt-32">
        <input
          className='text-zinc-800 p-2 tablet:w-1/2 rounded-md shadow-xl border-slate-900'
          type="text"
          name="search"
          placeholder='search...'
          onChange={(e) => setsearchText(e.target.value)}
        />
        <button className=" bg-white ml-1 rounded-md p-2" onClick={fetchSearch}>
          <SearchIcon sx={{ color: "red", }} size="large" />
        </button>
      </form>
      <Tabs className='tablet:ml-56 mt-16' value={type} onChange={(e, newValue) => settype(newValue)} >
        <Tab style={{ width:  "50%" }} label="movies" />
        <Tab style={{ width:  "50%" }} label="tv series" />
      </Tabs>
      {
          error &&
          <div className='absolute laptop:right-72 laptop:mr-72 mt-16 tablet:ml-32 laptop:pl-0 pl-16'>
            <h1 className='text-sm'>
              NetworkError while try to fetch movie data. <br></br>Please check your <span className='font-black'>internet connection</span>
            </h1>
          </div>
        }
      <div className='grid grid-cols-2 mt-12 tablet:grid-cols-4 gap-4 grid-flow-row'>
        {
          content.map((item) => {
            return (
              <div key={item.id}>
                <SingleContent
                  id={item.id}
                  title={item.title || item.name}
                  poster={item.poster_path}
                  date={item.release_date || item.first_air_date}
                  average={item.vote_average}
                  media_type={type ? "tv" : "movie"}
                /> 
              </div>
            )
          })
        }
        {searchText && !content && (type ? <h1 className='text-white'>No series Found</h1> : <h1 className='text-white'>No movie found</h1>)}
      </div>

      {/* pagination */}
     {numberOfPages >1 && (<Pages setpage={setpage} numberOfPages={numberOfPages}/>)}
    </div>
  )
}

export default Search