import React from 'react'
// import  Head from 'next/head';
// import { Dropdown } from "flowbite-react";

// import dynamic from 'next/dynamic';
// dynamic(import ('flowbite'),{ssr:false});

if (typeof window !== 'undefined') { 
    require('flowbite');
}  


const dashboard = () => {
  return (
    <div>
        {/* <Head>
            <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.4/dist/flowbite.min.css" />
            <script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js"></script>
        </Head> */}
        <nav className='flex justify-between items-center p-1 px-3 pr-8 sticky top-0' style={{backgroundColor:"#1c1e21"}}>
            <div className='flex justify-center items-center'>
                <img src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png" alt="" className='w-20'/>
                <input type="text" placeholder="Search" className='h-10 p-2 px-4 rounded-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 '/>
            </div>

            <div className='flex justify-center items-center gap-3'>
                <img src="https://www.nicepng.com/png/full/115-1153942_white-home-icon-png-white-home-logo-transparent.png" 
                    alt=""  
                    className='w-28 hover:bg-gray-500 py-2 px-10 rounded-lg cursor-pointer'
                />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHI7svG-giMziyZpe1JpFl64j7ohuUS4d8IkAd9vv90r3R-0ZYHrH7YPpJro26PenoVS0&usqp=CAU" alt=""  
                    className='w-28 hover:bg-gray-500 py-2 px-10 rounded-lg cursor-pointer'
                />
                <img src="https://www.nicepng.com/png/full/332-3327400_gillespie-fuels-propane-friend-icon-png-white.png" alt=""  
                    className='w-28 hover:bg-gray-500 py-2 px-10 rounded-lg cursor-pointer'
                />
            </div>

            <div className='flex justify-center items-center gap-3'>
                <img 
                    src="data:image/png;base64,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" 
                    alt=""  
                    className='w-9 bg-gray-600 hover:bg-gray-500 rounded-full p-2 cursor-pointer'
                />


                <img 
                    data-dropdown-toggle="dropdownNotification"
                    src="https://www.citypng.com/public/uploads/small/116389850303ufdx83go2mmx7wz9iodbnh27afxknnf9bofncviac8z2n9w4rwksenu7mwokevjmznxdga1dt7xhiquhtxbvjjjdrqb3pt5rhuk.png" 
                    alt=""  
                    className='w-9 bg-gray-600 hover:bg-gray-500 rounded-full p-2 cursor-pointer'
                />

        {/* <!-- Dropdown menu --> */}
        <div id="dropdownNotification" className="hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
        <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full" src="https://www.bleepstatic.com/content/hl-images/2022/10/06/Chinese_hacker.jpg" alt="Jese image"/>
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                </div>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
            </div>
            </a>
            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph image"/>
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-800">
                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                </div>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
            </div>
            </a>
            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-800">
                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span className="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
            </div>
            </a>
            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-4.jpg" alt="Leslie image"/>
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-800">
                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-blue-500" href="#">@bonnie.green</span> what do you say?</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">1 hour ago</div>
            </div>
            </a>
            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Robert image"/>
                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-800">
                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                </div>
            </div>
            <div className="pl-3 w-full">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">3 hours ago</div>
            </div>
            </a>
        </div>
        <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
            <div className="inline-flex items-center ">
            <svg className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                View all
            </div>
        </a>
        </div>



                {/* <Dropdown 
                    label="Dropdown button" 
                    // src="https://toppng.com/uploads/preview/hacker-logo-11556286244jtkoizdbsw.png"
                >
                <Dropdown.Header>
                    <span className="block text-sm">
                    Bonnie Green
                    </span>
                    <span className="block text-sm font-medium truncate">
                    bonnie@flowbite.com
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item>
                    Earnings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    Sign out
                </Dropdown.Item>
                </Dropdown> */}

                <img 
                    data-dropdown-toggle="dropdownInformation"
                    src="https://toppng.com/uploads/preview/hacker-logo-11556286244jtkoizdbsw.png" 
                    alt=""  
                    className='w-9 rounded-full cursor-pointer'
                />

                {/* <!-- Dropdown menu --> */}
                <div id="dropdownInformation" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div>Bonnie Green</div>
                    <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    </ul>
                    <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>

            </div>
            
        </nav>

        <div className='flex justify-center m-auto'>
            <div className='left w-1/4 border-2 sticky top-16 h-full'>
                <h1>this is div1</h1>
            </div>

            <div className='middle w-1/2 border-2'>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
                <h1>this is div2</h1><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>

            <div className='right w-1/4 border-2 sticky top-16 h-full'>
                <h1>this is div3</h1>
            </div>
        </div>
        
    </div>
  )
}

export default dashboard