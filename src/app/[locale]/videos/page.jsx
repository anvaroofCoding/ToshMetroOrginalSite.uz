import YoutubeGrid from '@/pages/youtube/youtube'
import React from 'react'

export default function page() {
    return (
        <div className='py-10'>
            <div className="container py-6">
                <h1 className='text-[36px] text-blue-900 font-bold '>Qiziqarli lavhalar</h1>
            </div>
            <YoutubeGrid />
        </div>
    )
}
