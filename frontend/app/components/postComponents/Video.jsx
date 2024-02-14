'use client'

import React from 'react'

import dynamic from 'next/dynamic'
const ReactHlsPlayer = dynamic(() => import('react-hls-player'), {
  ssr: false,
})
const Video = React.memo(({ url }) => {
  return (
    <div>
        <ReactHlsPlayer
            src={url}
            autoPlay={false} //TODO: make true when visible otherwise it ll autoplay when not visible
            controls={true}
            width="100%"
            height="auto"
            // muted={true}
        />
    </div>
  )
})

export default Video