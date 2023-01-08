import React from 'react'
import { img_300, unavailable } from '../config/config'
import ContentModal from './ContentModal/ContentModal'

function SingleContent({
    id,
    title,
    poster,
    date,
    average,
    media_type
}) {
    return (
        <ContentModal id={id} media_type={media_type}>
            <img className='rounded-t-lg' src={poster ? `${img_300}/${poster}` : unavailable} alt="" />
            <h1 className='text-sm text-center font-bold'>{title}</h1>
            <h3 className='flex justify-between mt-3'>
                <span>
                    {
                        (media_type === 'movie') ? media_type : "tv series"
                    }
                </span>

                <span>
                    {date}
                </span>
            </h3>
            <span className={(average >= 6) ? 'absolute p-1 rounded-2xl bg-blue-700 top-0 right-0 text-xs' : 'absolute p-1 rounded-2xl bg-red-700 top-0 right-0 text-xs'}>{average}</span>
        </ContentModal>
    )
}

export default SingleContent