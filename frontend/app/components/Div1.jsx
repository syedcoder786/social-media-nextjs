
const Div1 = () => {
    return (
      <>
          {/* profile */}
          <div className='w-11/12 m-auto'>
              <div className='h-24 bg-slate-900 cursor-pointer rounded'>
                  {/* Top<p>Here</p> */}
              </div>
              <div className='mb-2'>
              <img 
                  src="https://thumbs.dreamstime.com/b/cryptocurrency-icon-vector-bitcoin-blockchain-male-person-profile-avatar-digital-wallet-glyph-pictogram-illustration-210078657.jpg" 
                  alt=""
                  className='w-1/3 m-auto rounded-full -mt-10 mb-2'
                  // style={{top:"-20%"}}
              />
                  <div className='text-center'>
                      <p className='text-lg font-semibold'>name</p>
                      <p>This is bio</p>
                      <p>This is bio</p>
                  </div>
              </div>
              {/* <hr/> */}
              <div className='rounded m-1 p-2' style={{backgroundColor: "#303338"}}> {/* #3E4042 */}
                  <p className='text-center mb-1 text-lg font-semibold'>Notifications</p>
                  <div className='h-36 overflow-y-auto notilist'>
                      <div className='text-center p-2 w-11/12 m-auto rounded cursor-pointer my-2 notification hover:scale-105'>
                          John Doe added a post.
                      </div>
                      <div className='text-center p-2 w-11/12 m-auto rounded cursor-pointer my-2 notification hover:scale-105'>
                          John Doe added a post.
                      </div>
                      <div className='text-center p-2 w-11/12 m-auto rounded cursor-pointer my-2 notification hover:scale-105'>
                          John Doe added a post.
                      </div>
                      
                      <div className='text-center p-2 w-11/12 m-auto rounded cursor-pointer my-2 notification hover:scale-105'>
                          John Doe added a post.
                      </div>
                  </div>
              </div>
  
              <div className='bg-zinc-700 hover:bg-zinc-600 p-2 rounded m-1 cursor-pointer hover:scale-105'>
                      <img
                          src="https://pngimg.com/uploads/hacker/hacker_PNG24.png"
                          alt=""
                          className='w-2/4 rounded m-auto'
                      />
                      <p className='text-center text-gray-400 font-medium text-base'>Feel As Anonymous</p>
                      <p className='text-center text-gray-400 font-medium text-base'>Right To Privacy</p>
              </div>
  
          </div>
      </>
    )
  }
  
  export default Div1