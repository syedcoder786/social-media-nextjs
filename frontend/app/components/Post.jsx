'use client'

import React, { useEffect, useState, useRef } from 'react'
// import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { likePost, commentPost, reset } from "../../store/post/postSlice";
import Image from './postComponents/Image';
import Video from './postComponents/Video';
import Moment from 'react-moment';
import { Popover } from 'flowbite';


// import ReactHlsPlayer from 'react-hls-player';

// let ReactHlsPlayer
// if (typeof window !== 'undefined') { 
//     ReactHlsPlayer =  import('react-hls-player');
// }



const Post = React.memo(({ post, index, user }) => {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState("");
    const commentRef = useRef();

    useEffect(() => {
        // const latest = post.likes.find(oneLike => oneLike.user._id === user)
        // console.log("latest")
        // console.log(latest)
        if(post.likes.find(oneLike => oneLike.user._id === user)){
            // console.log("value hai")
            setLike(true)
        }else{
            // console.log(user)
            // console.log("nhi hi")
            setLike(false)
        }
        // console.log(post)
    },[post])

    

    const dispatch = useDispatch()

    const onComment = (e) => {
        // e.preventDefault()
        // console.log(e.target.value)
        // setComment(e.target.value)
        if (e.key === 'Enter') {
            if(comment.trim().length > 0){
                setComment("")
                const newComment = {
                    id: post._id, 
                    index,
                    comment
                }
                dispatch(commentPost(newComment))
                console.log('do validate');
            }
        }
    }


    const showComments = post.comments.map(oneComment => (
        <>
            <div className='flex gap-2 p-2 px-3'>
                <img 
                    className='w-8 h-8 rounded-full'
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LLUgQAMloUXhgX7DWGbva9RahuXRzbEIsw&usqp=CAU"
                />
                <div>
                    <div className='bg-slate-600 p-3 py-1 rounded-2xl'>
                        <h1 className='text-sm font-semibold'>
                            <span className='hover:underline cursor-pointer'>
                                {oneComment.user.name}
                            </span>
                        </h1>
                        <p className='text-sm'>
                            {oneComment.comment}
                        </p>
                    </div>
                    <h3 className='text-xs pl-3 pt-1'>
                        {/* 1 d · ago */}
                        <Moment fromNow ago>{oneComment.time}</Moment>
                        <span> · ago</span>
                    </h3>
                </div>
                
            </div>
        </>
    ))


    const targetEl = useRef(null)
    const triggerEl = useRef(null)
    let popover
    useEffect(() => {
        /*
        * $targetEl: required
        * $triggerEl: required
        * options: optional
        */
        const options = {
            placement: 'bottom',
            triggerType: 'hover',
            offset: 1,
            onHide: () => {
                console.log('popover is shown');
            },
            onShow: () => {
                console.log('popover is hidden');
            },
            onToggle: () => {
                console.log('popover is toggled');
            }
          };
          
        popover = new Popover(targetEl.current, triggerEl.current, options);

        // popover.show()

    },[])

  return (
    <>
    <div data-popover id="popover-user-profile" ref={targetEl} role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
        <div class="p-3">
            <div class="flex items-center justify-between mb-2">
                <a href="#">
                    <img class="w-10 h-10 rounded-full" 
                    src="https://img.freepik.com/premium-photo/hacker-attack-faceless-hooded-anonymous-computer-hacker-hacker-man-with-laptop-attack-server-network-system-online-data-internet-security-hacking-concept-dark-green-background_256259-2361.jpg?w=2000" 
                    alt="Hacker"/>
                </a>
                <div>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                </div>
            </div>
            <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#">{post.user.name}</a>
            </p>
            <p class="mb-3 text-sm font-normal">
                <a href="#" class="hover:underline">@jeseleos</a>
            </p>
            <p class="mb-4 text-sm">Open-source contributor. Building <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
            <ul class="flex text-sm">
                <li class="mr-2">
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">799 </span>
                        <span>Following</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">3,758 </span>
                        <span>Followers</span>
                    </a>
                </li>
            </ul>
        </div>
        <div data-popper-arrow></div>
    </div>

    {/* <button data-popover-target="popover-user-profile" data-popover-placement="bottom"  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User profile</button> */}

    <div className=' w-10/12 m-auto rounded-lg bg-neutral-700'>
        {/* <button data-popover-target={"popover-bottom"+index} data-popover-placement="bottom" type="button" class="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bottom popover</button>
        <div data-popover id={"popover-bottom"+index} role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Popover bottom</h3>
            </div>
            <div class="px-3 py-2">
                <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
            <div data-popper-arrow></div>
        </div> */}
        <div className='top-post p-2'>
            <div className='flex items-center justify-between'>
                <div 
                    className='flex items-center gap-2'
                    
                    // data-popover-target="popover-user-profile" data-popover-placement="bottom"
                >
                    {/* <div
                        onMouseEnter={() => { 
                            popover.show() 
                        }}
                        onMouseLeave={() => { 
                            popover.hide() 
                        }}
                    > */}
                        <img 
                            className='w-12 h-12 rounded-full'
                            alt=""
                            src="https://t4.ftcdn.net/jpg/03/21/43/07/360_F_321430761_qQi0CU9tzI5w1k1vJgdA02LMtXtsXvJE.jpg"
                            // ref={triggerEl}
                        />
                    {/* </div> */}
                    
                    <div>
                        <h1 className='text-base font-semibold '><span ref={triggerEl} className='hover:underline hover:cursor-pointer'>{post.user.name}</span></h1>
                        <h3 className='text-xs'>
                            {/* 1 d · ago */}
                            <Moment fromNow ago>{post.createdAt}</Moment>
                            <span> · ago</span>
                        </h3>
                    </div>

                </div>
                <h1 className='text-base select-none px-3 py-2 rounded-full hover:bg-slate-600 cursor-pointer'>•••</h1>
            </div>
            <h1 className='top-text p-1 mt-1 text-sm'>
                {post.title}
            </h1>            
        </div>

        {/* <img
            className='w-full h-96'
            alt=""
            // src="https://www.simplilearn.com/ice9/free_resources_article_thumb/ethicalhacking.jpg"
            src={post.post_url.url}
        /> */}

                {post.post_url.category === "image" && 
                
                <Image url={post.post_url.url} />

                }

                {post.post_url.category === "video" &&
                    <Video url={post.post_url.url} />
                }

        <div className='down-post'>
            <div className='flex justify-between items-center px-3' style={(post.likes.length || post.comments.length)? {paddingTop: "10px", paddingBottom: "10px"} : {}}>
            {post.likes.length ? (
                <div className='flex items-center gap-1 h-5'>
                    <img 
                        className='w-5 h-5 rounded-full'
                        alt=""
                        src="https://www.freepnglogos.com/uploads/like-png/facebook-like-1.png"
                        
                    />
                    <h1 className='top-text text-sm pb-1'>{post.likes.length}</h1>
                </div> ) : ""}
                {post.comments.length ? (
                    <div 
                        style={{marginLeft: "auto"}}
                        className="h-5"
                    >
                        <h1 className='top-text text-sm'>{post.comments.length} comments</h1>
                    </div>
                ): ""}
            </div>

            {(post.likes.length || post.comments.length) ? 
            (<hr className='m-auto bg-gray-500 border-0 h-px' style={{width: "96%"}}/>)
            : ""}
            

            <div className='flex justify-center items-center px-3 py-1' >
                <div 
                    className='w-1/2 flex gap-2 items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-600'
                    onClick={() => { 
                        console.log("check")
                        dispatch(likePost({ 
                        id: post._id,
                        index
                     })) }}
                     style={{userSelect: "none"}}
                >
                    <img 
                        className='w-5'
                        alt=""
                        src={like?"https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/blue-like-button-icon.png":"https://pngimg.com/uploads/like/small/like_PNG85.png"}
                        // style={{backgroundColor: "blue"}}
                    />
                    <h1 className='text-base  text-zinc-400 font-bold' 
                        style={like?{color:"#3578E5", fontWeight: "600"}:{}}>Like</h1>
                </div>

                <div 
                    className='w-1/2 flex gap-2 items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-500'
                    style={{userSelect: "none"}}
                    onClick={() => {
                        console.log("testing")
                        commentRef.current.focus()
                    }}
                >
                    <img 
                        className='w-6'
                        alt=""
                        src="https://www.pngall.com/wp-content/uploads/8/Comment-Transparent.png"
                    />
                    <h1 className='text-base text-zinc-400 font-bold'>Comment</h1>
                </div>
            </div>
            <hr className='m-auto bg-gray-500 border-0 h-px' style={{width: "96%"}}/>

            <div className='comment'>

                

                {/* display comments */}

                {showComments}


                {/* write comment */}
                <div className='flex gap-2 p-2 px-3 items-center'>
                    <img 
                        className='w-8 h-8 rounded-full'
                        alt=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LLUgQAMloUXhgX7DWGbva9RahuXRzbEIsw&usqp=CAU"
                    />
                    <input 
                        className='rounded-full p-2 px-3 outline-none w-full h-9 text-sm text-black' 
                        placeholder='Write a comment...'
                        value = {comment}
                        onChange = {(e) => setComment(e.target.value)}
                        onKeyDown = {onComment}
                        ref = {commentRef}
                    />
                </div>

                {/* <div className='flex gap-2 p-2 px-3'>
                    <img 
                        className='w-8 h-8 rounded-full'
                        alt=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LLUgQAMloUXhgX7DWGbva9RahuXRzbEIsw&usqp=CAU"
                    />
                    <div>
                        <div className='bg-gray-600 p-3 py-1 rounded-2xl'>
                            <h1 className='text-sm font-semibold'>
                                <span className='hover:underline cursor-pointer'>
                                    Name
                                </span>
                            </h1>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsum vel eveniet nobis! Qui, impedit alias! Exercitationem unde in mollitia consequatur! Porro autem hic provident. Tempore omnis minus error sed!</p>
                        </div>
                        <h3 className='text-xs pl-3 pt-1'>1 d · ago</h3>
                    </div>
                    
                </div>


                <div className='flex gap-2 p-2 px-3'>
                    <img 
                        className='w-8 h-8 rounded-full'
                        alt=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4LLUgQAMloUXhgX7DWGbva9RahuXRzbEIsw&usqp=CAU"
                    />
                    <div>
                        <div className='bg-gray-600 p-3 py-1 rounded-2xl'>
                            <h1 className='text-sm font-semibold'>
                                <span className='hover:underline cursor-pointer'>
                                    Name
                                </span>
                            </h1>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsum vel eveniet nobis! Qui, impedit alias! Exercitationem unde in mollitia consequatur! Porro autem hic provident. Tempore omnis minus error sed!</p>
                        </div>
                        <h3 className='text-xs pl-3 pt-1'>1 d · ago</h3>
                    </div>
                    
                </div> */}

                
            </div>

        </div>

        {/* <br/> */}
    </div>
    </>
  )
})

export default Post