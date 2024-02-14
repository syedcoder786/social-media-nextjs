'use client'

import React from 'react'
import ImageLoader from 'react-loading-image'
import { Audio } from  'react-loader-spinner'

const Image = React.memo(({ url }) => {
  return (
    <div>
        <ImageLoader
            // style={{height: "320px", width: "100%"}}
            className='w-full h-96'
            src={url}
            // src="https://social-media-nextjs.s3-ap-northeast-1.amazonaws.com/images/bc2fe6ef-81f4-a9d3-7d03-bfbab6d5b166ac_bf2.jpg"
            // src="https://www.simplilearn.com/ice9/free_resources_article_thumb/ethicalhacking.jpg"
            alt=""
            loading={() => <div style={{height:"300px", paddingLeft:"10%", paddingTop:"10%"}}><Audio
                heigth="500"
                width="500"
                color='grey'
                ariaLabel='loading'
            /></div>}
            error={() => <h3><center>Error Reload Page</center></h3>}
        />
    </div>
  )
})

export default Image