import CreatePost from "../components/CreatePost"
import NavbarComponent from "../components/NavbarComponent"

const Profile = () => {
  return (
    <div>
        <NavbarComponent/>
        <div className="">
            <img
                src="https://img.freepik.com/premium-photo/hacker-attack-faceless-hooded-anonymous-computer-hacker-hacker-man-with-laptop-attack-server-network-system-online-data-internet-security-hacking-concept-dark-green-background_256259-2361.jpg?w=2000"
                alt="cover"
                className="m-auto rounded-b-md"
                style={{height: "54vh", width: "71%"}}
            >
            </img>
            <div 
                className="flex gap-6"
                style={{marginLeft: "16%"}}
            >
                <img
                    src="https://img-c.udemycdn.com/course/750x422/3640040_dd97_2.jpg"
                    alt="cover"
                    className="rounded-full -mt-8 "
                    // absolute left-60"
                    style={{height: "180px", width: "180px"}}
                >
                </img>
                <div>
                    <h2 className="mt-8 text-3xl font-bold text-gray-200">Alex Hetachi</h2>
                    <ul class="flex text-sm py-1">
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
                    <div className="flex gap-4 justify-between absolute" style={{right: "16%"}}>
                        <button type="button" class=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700">
                            + Follow
                        </button>
                        <button type="button" class=" text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-700">
                            Edit Profile
                        </button>
                    </div>
                </div>
               
            </div>

            <hr 
                class="m-auto h-px mt-6 mb-1 bg-gray-200 border-0 dark:bg-gray-700"
                style={{width: "68%"}}
            />

            <div className="flex gap-4 items-center" style={{marginLeft: "16%"}}>
                <div className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">
                    Posts
                </div>
                <div className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">
                    About
                </div>
                <div className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">
                    Followers
                </div>
                <div className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">
                    Following
                </div>
            </div>
        </div>

        <div className="down-profile w-3/4 m-auto flex gap-4 justify-center">
            <div className="div1 p-4 bg-gray-900 rounded-2xl" style={{width: "38%"}}>
                <h2 className="text-xl font-bold">Intro</h2>
                <div className="p-2">
                    <p className="text-sm">This is bio</p>
                </div>
                <button type="button" class="my-2 w-full text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-700">Edit Bio</button>
                
                <div className="p-1">
                    <p>Birthday </p>
                </div>
                <div className="p-1">
                    <p>Studies at </p>
                </div>
                <div className="p-1">
                    <p>Lives in </p>
                </div>
                <div className="p-1">
                    <p>In relation </p>
                </div>
                
                <button type="button" class="my-2 w-full text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-700">
                    Edit details
                </button>

                <div className="p-1 grid grid-cols-3 items-center gap-2">
                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Coding </h2>
                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Dancing </h2>

                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Singing </h2>
                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Programming </h2>

                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Gamming </h2>
                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Sports </h2>

                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Study </h2>
                    <h2 className="p-1 px-3 bg-gray-700 rounded-3xl hover:bg-gray-800 cursor-pointer">Gitar </h2>
                </div>
                
                <button type="button" class="my-2 w-full text-white bg-slate-700 hover:bg-slate-800 font-medium rounded-lg px-3 py-1.5 dark:bg-slate-600 dark:hover:bg-slate-700">
                    Edit Hobbies
                </button>
            </div>
            <div className="div2 w-2/4 ">
                <CreatePost/>
            </div>
        </div>
    </div>
  )
}

export default Profile