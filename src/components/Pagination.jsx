import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Pages({ setpage, numberOfPages = 10 }) {

  const handleChange = (page) => {
    setpage(page)
    window.scroll(0, 0)

  }
  return (

    <div className='flex justify-center mt-8 bg-gray-500'>
      <Stack spacing={0} >
        <Pagination count={numberOfPages} size="small" color="primary" onChange={(e) => handleChange(e.target.textContent)} />
      </Stack>
    </div>

  );
}