'use client'
import { useState, useEffect } from 'react'
import { register, login, reset } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';

const auth = () => {

    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );
    const router = useRouter();

    const [loginData, setLoginData] = useState({
        lemail: "",
        lpassword: "",
    });

    const [registerData, setRegisterData] = useState({
        name:"",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isError) {
          toast.error(message);
        }
    
        if (isSuccess || user) {
        //   dispatch(fetchCart());
          router.push("/dashboard");
        }
    
        dispatch(reset());
      }, [user, isError, isSuccess, message, dispatch]);
    

    const { lemail, lpassword } = loginData;

    const { name, email, password } = registerData;

    const onRegisterChange = (e) => {
        setRegisterData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const onLoginChange = (e) => {
        setLoginData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };


    const onLoginSubmit = (e) => {
        e.preventDefault();
    
        const userData = {
            email: lemail,
            password: lpassword,
        };
    
        dispatch(login(userData));
    };

    const onRegisterSubmit = (e) => {
        e.preventDefault();

        if(!name || !email || !password){
            return toast.error("Please enter all fields")
        }

        if(name.length < 3){
            return toast.error("Name must contain atleast 3 characters")
        }
        if(password.length < 6){
            return toast.error("Password must contain atleast 6 characters")
        }
    
        const userData = {
            name,
            email,
            password,
        };
    
        dispatch(register(userData));
    };

    return (
        <div>
            <nav className='flex justify-between items-center p-4 bg-gray-800 overflow-auto gap-3'>
                <h1 className='text-2xl m-2 text-gray-400'>SiteName</h1>
                <div className='flex justify-center items-center gap-5'>
                    <form onSubmit={onLoginSubmit}>
                        <input 
                            type="email" 
                            name="lemail"
                            placeholder='Email' 
                            className='text-black p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                            value={lemail}
                            onChange={onLoginChange}
                        />
                        <input 
                            type="password" 
                            name="lpassword"
                            placeholder='Password' 
                            className='text-black p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                            value={lpassword}
                            onChange={onLoginChange}
                        />
                        <input 
                            type="submit" 
                            value="Login" 
                            className='text-gray-200 text-lg  bg-green-600 hover:bg-green-500 rounded p-1 px-2 cursor-pointer focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                        />
                    </form>
                </div>
            </nav>

            <div className='flex justify-center items-center text-center mt-24'>
                <form className='bg-slate-700 p-2 rounded' onSubmit={onRegisterSubmit}>
                    <h1 className='text-2xl m-2 text-gray-400'>Sign Up</h1>
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Name' 
                        className='text-black h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'
                        value={name}
                        onChange={onRegisterChange}
                    /><br/>
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Email' 
                        className='text-black h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'
                        value={email}
                        onChange={onRegisterChange}
                    /><br/>
                    <input 
                        type="password" 
                        name="password"
                        placeholder='New Password' 
                        className='text-black h-10 p-1 px-2 rounded focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-80'
                        value={password}
                        onChange={onRegisterChange}    
                    /><br/>
                    <input 
                        type="submit" 
                        value='Sign Up' 
                        className='h-10 m-2 text-gray-200 text-lg  bg-blue-600 hover:bg-blue-500 rounded p-1 px-2 cursor-pointer focus:border-sky-500 focus:ring-sky-500 focus:ring-1'
                    /><br/>
                </form>
            </div>
    </div>
    )
}

export default auth