import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config'
import { Button } from '@mui/material';
import { YouTube } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: '#39445a',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 28,
    p: 4,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [content, setcontent] = useState([])
    const [video, setvideo] = useState()



    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=a0856e0bcc44c755d6e347cdca4cdd92`)
        setcontent(data)
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a0856e0bcc44c755d6e347cdca4cdd92`)
        setvideo(data.results[0]?.key)
        console.log(data.results)
    }

    useEffect(() => {
        fetchData()
        fetchVideo()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <button className='bg-gray-600 rounded-lg relative' onClick={handleOpen}>{children}</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (<Box sx={style}>
                        {/* <div className="contentModal">
                            <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailableLandscape} alt="" />
                        </div> */}

                        <div className="contentModal">
                            <img className='' src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt="" />
                            <div className="content mt-2">
                                <span className="title capitalize font-bold">
                                    {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date||
                                            "-----"
                                        ).substring(0,4)}
                                    )
                                </span><br></br>
                                {content.tagline && (
                                    <i className='tagline text-sm pb-4'>{content.tagline}</i>
                                )}<br />
                            
                                <span className="descripton pb-4">
                                    {content.overview}
                                </span>

                                <div className="corousel">

                                </div>

                                <Button
                                    variant="contained"
                                    startIcon={<YouTube />}
                                    color= "secondary"
                                    target="__black"
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the trailer
                                </Button>
                            </div>
                        </div>
                    </Box>)}
                </Fade>
            </Modal>
        </div>
    );
}