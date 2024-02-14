'use client'

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
// import { logout } from '../../store/auth/authSlice';
import { fetchPosts } from "../../store/post/postSlice";
// import { Dropdown, Avatar } from "flowbite-react";
import NavbarComponent from '../components/NavbarComponent';
import { useRouter } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Div1 from '../components/Div1';
import Div3 from '../components/Div3';
import { addLivePost } from '../../store/post/postSlice';
import 'flowbite'

import io from 'socket.io-client'

const dashboard = () => {

    const dispatch = useDispatch()
    const router = useRouter();
    const socket = useRef(null)

    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading, isError, isSuccess, message } = useSelector((state) => state.post);

    // const [postItems, setPostItems] = useState([]) 
    // let location = useLocation();

    const postItems = user?posts.map((onePost, index) => (
        <><Post post={onePost} index={index} user={user._id}/><br/></>
    )):null


    // const socket = io.connect('http://127.0.0.1:5000')

    useEffect(() => {
        console.log("fetching")
        if(user){
            //connect socket
            socket.current = io.connect("http://localhost:5000")
            //join room
            socket.current.emit('join', { name:user._id, room:"room1" }, (error) => {
                if(error) {
                    console.log(error)
                }
                // else{
                //     console.log("client con")
                // }
            })
            dispatch(fetchPosts())
            
            // // posts = [posts[0],...posts]
            // console.log("new one post")
            // console.log(posts[0])

            // setTimeout(() => {
            //     console.log(posts)
            //     setPostItems([(<><Post post={posts[0]} user={user._id}/><br/></>),...postItems])
            // }, 6000)

            
            
            socket.current.on("addPost", (payload) => {
                console.log("addpost is there")
                console.log(payload)
                dispatch(addLivePost(payload))
                // setPostItems([(<><Post post={payload} user={user._id}/><br/></>),...postItems])
            })
        }

        return () => {
            if(socket.current)
                socket.current.disconnect()
        }
        
    },[])

    useEffect(() => {
        if(!user){
            router.push("/auth")
        }

        // if(posts){
        //     // console.log("yes")
        //     const newPosts = user?posts.map((onePost, index) => (
        //         <><Post post={onePost} index={index} user={user._id}/><br/></>
        //     )):null
        //     setPostItems(newPosts)
        // }
    },[user])

    // const chatRef = useRef(null);

    // useEffect(() => {
    //     chatRef.current.scrollIntoView();
    // }, []);

    return (
        <div>
            <NavbarComponent/>

            <div className='flex justify-center m-auto'>
                <div className='left w-1/4 sticky top-16 h-full'>

                {/* <button data-popover-target="popover-bottom" data-popover-placement="bottom" type="button" class="text-white mb-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bottom popover</button>
                <div data-popover id="popover-bottom" role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                        <h3 class="font-semibold text-gray-900 dark:text-white">Popover bottom</h3>
                    </div>
                    <div class="px-3 py-2">
                        <p>And here's some amazing content. It's very engaging. Right?</p>
                    </div>
                    <div data-popper-arrow></div>
                </div> */}
                    {/* div 1 */}
                    <Div1/>
                </div>
    
                <div className='middle w-1/2'>
                    <br/>
                    <div className="w-10/12 m-auto">
                        <CreatePost/>
                    </div>
                    <br/>
    
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => dispatch(fetchPosts())}
                        hasMore={true}
                        loader={<center><h4 style={{color: "white"}}>Loading/End of Post...</h4></center>}
                    >
                        {postItems}
                    </InfiniteScroll>  
                    {/* {postItems} */}
                </div>
    
                <div 
                    className='right w-1/4 sticky top-14 overflow-x-hidden bg-zinc-800' // -z-10  h-full border-l-2 border-l-slate-500
                    // className='right w-1/4 border-2 sticky top-16'
                    style={{height:"93vh"}}
                    // ref = {chatRef}
                >
                    <Div3/>
                    {/* <input type="text" placeholder='hii'></input> */}
                </div>
            </div>             
            
        </div>
    )
}

export default dashboard