// import React, { useState, useEffect, createContext } from "react";
// import axios from "axios";


// export const DataContext = createContext()

// export const DataProvider = (props) => {
//     const [trends, setTrends] = useState([])
//     const [page, setpage] = useState(1)

//     const fetchTrends = async () => {
//         const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a0856e0bcc44c755d6e347cdca4cdd92&page=${page}`)
//         const alldata = data.results
//         setTrends(alldata)
//     }

//     useEffect(() => {
//         fetchTrends()
//         //eslint-disable-next-line
//     }, [page])

//         return (
//             <DataContext.Provider value={trends, page}>
//                 {props.children}
//             </DataContext.Provider>
//         )
    
// }