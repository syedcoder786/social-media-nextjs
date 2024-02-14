import { RiSendPlaneFill} from 'react-icons/ri'

import { HiDotsCircleHorizontal} from 'react-icons/hi'
import { useEffect, useRef } from 'react';

const Div3 = () => {

    const chatRef = useRef(null);

    const scrollChatToBottom = () => {
        // chatRef.current.scrollIntoView();
    }
    useEffect(() => {
        scrollChatToBottom()
    }, []);

  return (
    <>
        <div className="heading backdrop-blur-lg absolute w-full">
            <h1 className='flex items-center p-4 pl-6 h-16 text-sm font-bold font-sans'>Global Chat</h1>
        </div>
        <div className="overflow-y-auto pt-16 overflow-x-hidden flex flex-col-reverse" 
            style={{height:"97%"}}
            // ref = {chatRef}
        >

            <div className=''>
                <div className="textbox flex ml-4 py-1 items-center w-full">
                    <input type="text" placeholder="Write your message..." className="text-black z-10 w-9/12 h-10 px-2 text-base rounded-tl-md rounded-bl-md focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                    <div className="send bg-white p-1 rounded-tr-md rounded-br-md"><RiSendPlaneFill size={32} class="bg-indigo-800 rounded-md p-1 cursor-pointer" color={"white"}/></div>
                </div>
            </div>

            
            <div className="typing mx-4 flex items-center my-2">
                <HiDotsCircleHorizontal size={30} color={"white"}/>
                <div className="msgtyping text-xs font-semibold ml-1">Martin is typing...</div>
            </div>
            
            <div>
                <div className="message flex items-center px-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Pg8cunPT7yJoNRtSCvw_WxyXzr1fps5hlMyIxLYE1vif63UlPwfzhYtbWeWWSLQ4ZuU&usqp=CAU" 
                        alt="" 
                        className="avtar w-10 rounded-full p-0.5 bg-white"
                    />
                    <div className="ml-3 font-semibold text-sm">Name Here</div>
                </div>
                <div className="msg bg-gray-600 w-3/4 text-sm md:ml-14 ml-8 p-2 rounded-b-md rounded-tr-md">
                    This is a message. hello there lorem ipsum. This is a message. hello there lorem ipsum
                </div>
                <p className="time w-3/4 ml-14 py-2 text-xs text-slate-600">12:54 AM</p>
                <div className=" flex justify-end">
                    <div className="msgme bg-slate-700 p-2 rounded-b-md rounded-tl-md mr-4 flex justify-end">I am fine.</div>
                </div>
                <div className=" flex justify-end">
                <p className="time py-2 text-xs text-slate-600 mr-4">12:54 AM</p>
                </div>
            </div>


            <div>
                <div className="message flex items-center px-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Pg8cunPT7yJoNRtSCvw_WxyXzr1fps5hlMyIxLYE1vif63UlPwfzhYtbWeWWSLQ4ZuU&usqp=CAU" 
                        alt="" 
                        className="avtar w-10 rounded-full p-0.5 bg-white"
                    />
                    <div className="ml-3 font-semibold text-sm">Name Here</div>
                </div>
                <div className="msg bg-gray-600 w-3/4 text-sm md:ml-14 ml-8 p-2 rounded-b-md rounded-tr-md">
                    This is a message. hello there lorem ipsum. This is a message. hello there lorem ipsum
                </div>
                <p className="time w-3/4 ml-14 py-2 text-xs text-slate-600">12:54 AM</p>
                <div className=" flex justify-end">
                    <div className="msgme bg-slate-700 p-2 rounded-b-md rounded-tl-md mr-4 flex justify-end">I am fine.</div>
                </div>
                <div className=" flex justify-end">
                <p className="time py-2 text-xs text-slate-600 mr-4">12:54 AM</p>
                </div>
            </div>

            <div>
                <div className="message flex items-center px-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Pg8cunPT7yJoNRtSCvw_WxyXzr1fps5hlMyIxLYE1vif63UlPwfzhYtbWeWWSLQ4ZuU&usqp=CAU" 
                        alt="" 
                        className="avtar w-10 rounded-full p-0.5 bg-white"
                    />
                    <div className="ml-3 font-semibold text-sm">Name Here</div>
                </div>
                <div className="msg bg-gray-600 w-3/4 text-sm md:ml-14 ml-8 p-2 rounded-b-md rounded-tr-md">
                    This is a message. hello there lorem ipsum. This is a message. hello there lorem ipsum
                </div>
                <p className="time w-3/4 ml-14 py-2 text-xs text-slate-600">12:54 AM</p>
                <div className=" flex justify-end">
                    <div className="msgme bg-slate-700 p-2 rounded-b-md rounded-tl-md mr-4 flex justify-end">I am fine.</div>
                </div>
                <div className=" flex justify-end">
                <p className="time py-2 text-xs text-slate-600 mr-4">12:54 AM</p>
                </div>
            </div>

            <div>
                <div className="message flex items-center px-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Pg8cunPT7yJoNRtSCvw_WxyXzr1fps5hlMyIxLYE1vif63UlPwfzhYtbWeWWSLQ4ZuU&usqp=CAU" 
                        alt="" 
                        className="avtar w-10 rounded-full p-0.5 bg-white"
                    />
                    <div className="ml-3 font-semibold text-sm">Name Here</div>
                </div>
                <div className="msg bg-gray-600 w-3/4 text-sm md:ml-14 ml-8 p-2 rounded-b-md rounded-tr-md">
                    This is a message. hello there lorem ipsum. This is a message. hello there lorem ipsum
                </div>
                <p className="time w-3/4 ml-14 py-2 text-xs text-slate-600">12:54 AM</p>
                <div className=" flex justify-end">
                    <div className="msgme bg-slate-700 p-2 rounded-b-md rounded-tl-md mr-4 flex justify-end">I am fine.</div>
                </div>
                <div className=" flex justify-end">
                <p className="time py-2 text-xs text-slate-600 mr-4">12:54 AM</p>
                </div>
            </div>

            <center><h3 className='p-1 text-red-300 mb-2'>End of Chat...</h3></center>



            {/* <div className="typing mx-7 mb-2 flex items-center">
                <HiDotsCircleHorizontal size={30} color={"white"}/>
                <div className="msgtyping text-xs font-semibold ml-1">Martin is typing...</div>
            </div>
            <div className=''>
                <div className="textbox flex mx-6 items-center w-full">
                    <input type="text" placeholder="Write your message..." className="text-black z-10 w-9/12 h-10 px-2 text-base rounded-tl-md rounded-bl-md focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"/>
                    <div className="send bg-white p-1 rounded-tr-md rounded-br-md"><RiSendPlaneFill size={32} class="bg-indigo-800 rounded-md p-1 cursor-pointer" color={"white"}/></div>
                </div>
            </div> */}
            {/* <div ref={chatRef} /> */}
        </div>

        
    </>
  )
}

export default Div3