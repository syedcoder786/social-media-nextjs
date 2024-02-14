'use client'

import { useRef, useState, useEffect } from 'react'
import AWS from "aws-sdk";
import S3 from 'react-aws-s3';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { createPost, reset } from "../../store/post/postSlice";
import Resizer from "react-image-file-resizer";
import ReactLoading from 'react-loading';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// import { Popover } from 'flowbite';


AWS.config.update({
    accessKeyId: 'AKIA32QY5HCQ5TIQ7NEC',
    secretAccessKey: '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',
    region: 'ap-northeast-1',
});

const CreatePost = () => {

    const [postData, setPostData] = useState({
        title: "",
        myFile: "",
    });

    const [modal, setModal] = useState(false)

    // const modalRef= useRef()

    const [popup, setPopup] = useState("")

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth);

    const { isSuccess, isError } = useSelector((state) => state.post);

    useEffect(() => {
        if(isSuccess || isError){
            setLoading("")
        }
        dispatch(reset())
    },[isSuccess, isError])


    // var modalEl
    // useEffect(() => {
    //     // set the modal menu element
    //     const $targetEl = document.getElementById('defaultModal');
    //     const options = {
    //         placement: 'bottom-left',
    //         backdrop: 'dynamic',
    //         backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    //         closable: true,
    //         onHide: () => {
    //             console.log('modal is hidden');
    //             // if(document.querySelector('[modal-backdrop]'))
    //             // document.querySelector('[modal-backdrop]').remove();
    //         },
    //         onShow: () => {
    //             console.log('modal is shown');
    //             // document.querySelector('[modal-backdrop]').remove();
    //         },
    //         onToggle: () => {
    //             console.log('modal has been toggled');
    //         }
    //       };
    //     const modalEl = new Modal($targetEl, options);
    //     setModal(modalEl)
    //     // modalEl.toggle();
    // }, [])
    

    const [loading, setLoading] = useState("")

    const resizeFile = (file) =>
        new Promise((resolve) => {
            console.log(file.name.split('.').pop())
            Resizer.imageFileResizer(
            file,
            600,
            900,
            file.name.split('.').pop(),
            // "jfif",
            600,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
            );
        });

    const onChange = (e) => {
        // console.log(e.target.value)
        // modal.toggle();
        setPostData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const onFileChange = async (e) => {
        console.log(e.target.files[0])
        let resizeImage = e.target.files[0]
        var fileExt = resizeImage.name.split('.').pop().toLowerCase();
        if(e.target.files[0]){
            if(fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png" || fileExt === "jfif"){
                resizeImage = await resizeFile(e.target.files[0])
                console.log(resizeImage)
            }
            setPostData((prevState) => ({
                ...prevState,
                [e.target.name]: resizeImage,
            }));
        }else{
            setPostData((prevState) => ({
                ...prevState,
                title: "",
                [e.target.name]: e.target.files[0],
            }));
        }
        
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(postData.myFile)

        if(!postData.myFile){
            return toast.error("No file choosen")
        }

        // if(postData.myFile){
        //     console.log("reset")
        //     setPostData((prevState) => ({
        //         ...prevState,
        //         myFile: undefined,
        //     }));
        // }

        var fileExt = postData.myFile.name.split('.').pop().toLowerCase();

        
        if(fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png" || fileExt === "jfifjfif"){

            const config = {
                bucketName: 'social-media-nextjs',
                dirName: 'images', /* optional */
                region: 'ap-northeast-1',
                accessKeyId: 'AKIA32QY5HCQ5TIQ7NEC',
                secretAccessKey: '0mg0tkGVTahMRvRFvkT1DryjWgQoKFn52mppTDqW',
                // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
            }
            
            const ReactS3Client = new S3(config);
            
            try {
                const savedName = uuid()+postData.myFile.name
                console.log(savedName)

                setLoading("Uploading...")

                const data = await ReactS3Client
                    .uploadFile(postData.myFile, savedName)
                console.log(data)

                const url = data.location

                setLoading("Checking Content...")

                var params = {
                    Image: {
                        S3Object: {
                            Bucket: "social-media-nextjs",
                            Name: "images/"+savedName
                        }
                    }
                    // Video: {
                    //     S3Object: {
                    //         Bucket: "social-media-nextjs",
                    //         Name: "WHOAMI IS ENDING TO DO MRX.mp4"
                    //     }
                    // }
                }
                const rekognition = new AWS.Rekognition()


                rekognition.detectModerationLabels(params, (err, data) => {
                    if(err){
                        console.log(err)
                        toast.error(err)
                        setLoading("")
                    }else{
                        console.log(data)
                        if(data.ModerationLabels.length > 0){
                            console.log("Content of image is not good")
                            const newpopup = data.ModerationLabels.map(label => (
                                <div key={label.Name}>
                                    <p class="text-base leading-relaxed text-gray-600">
                                        {label.Name} : {label.Confidence.toFixed(2)} %
                                    </p>
                                </div>
                            ))

                            // setPostData((prevState) => ({
                            //     ...prevState,
                            //     myFile: undefined,
                            // }));
                            setPopup(newpopup)

                            // modal.show()
                            setModal(true);

                            
                        }else{
                            const newPostData = {
                                user:user._id,
                                title: postData.title,
                                post_url: {
                                    category: "image",
                                    url: url
                                }
                            }
                            console.log(newPostData)
                            setLoading("Uploading to server...")
                            // setPostData((prevState) => ({
                            //     ...prevState,
                            //     myFile: undefined,
                            // }));
                            dispatch(createPost(newPostData))
                        }

                        setPostData((prevState) => ({
                            ...prevState,
                            title: "",
                            myFile: undefined,
                        }));
                        setLoading("")
                    }
                })
                    
            } catch (error) {
                console.error(error)
                setLoading("")
                toast.error(error)
            }
        }

        if(fileExt === "mp4"){

            const config = {
                bucketName: 'social-media-nextjs',
                dirName: 'videos', /* optional */
                region: 'ap-northeast-1',
                accessKeyId: 'AKIA32QY5HCQ5TIQ7NEC',
                secretAccessKey: '0mg0tkGVTahMRvRFvkT1DryjWgQoKFn52mppTDqW',
                // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
            }
            
            const ReactS3Client = new S3(config);
            
            try {
                const savedName = uuid()+postData.myFile.name.replaceAll(' ','')
                console.log(savedName)

                setLoading("Uploading...")

                const data = await ReactS3Client
                    .uploadFile(postData.myFile, savedName)
                console.log(data)

                console.log(savedName)
                const url = data.location

                // AWS.config.update({
                //     accessKeyId: 'AKIA32QY5HCQ5TIQ7NEC',
                //     secretAccessKey: '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',
                //     region: 'ap-northeast-1',
                // });
                const transcoder = new AWS.ElasticTranscoder(
                    // options=
                    {
                        accessKeyId: 'AKIA32QY5HCQ5TIQ7NEC',
                        secretAccessKey: '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',
                        region: 'us-east-1',
                        sessionToken:null
                    }
                );

                // for (const video of videosArr) {
                const job = await transcoder
                .createJob({
                    PipelineId: "1679211018002-smm048",
                    Input: {
                    Key: "videos/"+savedName,
                    Container: "mp4",
                    },
                    // Output: {
                    // Key: `test/${savedName}`,
                    // PresetId: "1351620000001-000020",
                    // },

                    OutputKeyPrefix: `hlsvideos/${savedName.split('.').slice(0, -1).join('.')}`,
                    Outputs: [
                        {
                            Key: "hls2000",
                            PresetId: "1351620000001-200010",
                            SegmentDuration: "10"
                        },
                        {
                            Key: "hls1500",
                            PresetId: "1351620000001-200020",
                            SegmentDuration: "10"
                        },
                        {
                            Key: "hls600",
                            PresetId: "1351620000001-200040",
                            SegmentDuration: "10"
                        },
                        {
                            Key: "hls400",
                            PresetId: "1351620000001-200050",
                            SegmentDuration: "10"
                        }
                        ],
                    Playlists: [
                        {
                            Format: 'HLSv3',
                            Name: 'hls',
                            OutputKeys: [
                                "hls2000",
                                "hls1500"
                            ]
                        },
                    ],
                })
                .promise();

                // console.log(job)
                // console.log(job.Job)

                setLoading("Compressing...")
                var params = {
                    Id: job.Job.Id /* required */
                  };
                  transcoder.waitFor('jobComplete', params, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        console.log(data);           // successful response 
                        const newPostData = {
                            user:user._id,
                            title: postData.title,
                            post_url: {
                                category: "video",
                                url: `https://d3evdg0gx0fvcc.cloudfront.net/hlsvideos/${savedName.split('.').slice(0, -1).join('.')}hls.m3u8`
                            }
                        }
                        console.log(newPostData)
                        setLoading("Uploading to server...")
                        dispatch(createPost(newPostData)) 
                    }    
                    setPostData((prevState) => ({
                        ...prevState,
                        myFile: undefined,
                    }));
                    setLoading(false)
                  });


                // TODO: checking content
                // setLoading("Checking Content...")

                // var params = {
                //     // Image: {
                //     //     S3Object: {
                //     //         Bucket: "social-media-nextjs",
                //     //         Name: "images/"+savedName
                //     //     }
                //     // }
                //     Video: {
                //         S3Object: {
                //             Bucket: "social-media-nextjs",
                //             Name: "videos/"+savedName
                //         }
                //     },
                //     NotificationChannel: {
                //         RoleArn: 'arn:aws:iam::social-media-nextjs:role/AmazonRekognitionSNSSuccessFeedback',
                //         SNSTopicArn: 'arn:aws:sns:ap-northeast-1:social-media-nextjs:recoknize',
                //     },
                //     MinConfidence: 60
                // }
                // const rekognition = new AWS.Rekognition()

                // // rekognition.startContentModeration(params, (err, data) => {

                // // }).

                // rekognition.startLabelDetection(params).promise().then(data => {
                //     console.log(JSON.stringify(data));
                // }).catch(error => {
                //     console.log(error);
                // });

            }catch(err){
                toast.error(err)
                console.log(err)
            }
        }
        

        // const s3 = new AWS.S3();

        //     const items = await s3
        //         .listObjectsV2({
        //         Bucket: "social-media-nextjs",
        //         })
        //         .promise();

        //     console.log(items.Contents)

        
            // var params = {
            //     // Image: {
            //     //     S3Object: {
            //     //         Bucket: "social-media-nextjs",
            //     //         Name: "smk1.jpg"
            //     //     }
            //     // }
            //     Video: {
            //         S3Object: {
            //             Bucket: "social-media-nextjs",
            //             Name: "WHOAMI IS ENDING TO DO MRX.mp4"
            //         }
            //     }
            // }
            // const rekognition = new AWS.Rekognition()

            // rekognition.startLabelDetection(params, (err, data) => {
            //     if(err){
            //         console.log(err)
            //     }else{
            //         console.log(data)
            //         // rekognition.detectLabels
            //         rekognition.getLabelDetection((params,data), (err, newdata) => {
            //             if(err){
            //                 console.log(err)
            //             }else{
            //                 console.log(newdata)
            //             }
            //         })
            //     }
            // })

            
    }

    // const targetEl = useRef(null)
    // const triggerEl = useRef(null)

    // useEffect(() => {
    //     /*
    //     * $targetEl: required
    //     * $triggerEl: required
    //     * options: optional
    //     */
    //     const options = {
    //         placement: 'bottom',
    //         triggerType: 'hover',
    //         offset: 10,
    //         onHide: () => {
    //             console.log('popover is shown');
    //         },
    //         onShow: () => {
    //             console.log('popover is hidden');
    //         },
    //         onToggle: () => {
    //             console.log('popover is toggled');
    //         }
    //       };
          
    //     const popover = new Popover(targetEl.current, triggerEl.current, options);

    //     // popover.show()

    // },[])


  return (
    <>

        {/* <div>
            <button 
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                type="button" 
                data-modal-toggle="defaultModal"
                // ref={modalRef} 
                onClick={()=> console.log('clicked')}
            >
                Toggle modal
            </button>
        </div> */}

    <Modal open={modal} onClose={()=>{setModal(false)}}>
        <h2 className='text-black text-2xl font-bold'>
            <u>Terms of Content</u>
        </h2>
        <br/>
        {/* <div> */}
        <div className="space-y-6">
            <p class="text-lg font-semibold leading-relaxed text-gray-600">
                As our rules and regulation we do not allow this post.
            </p>
            {popup}
            <p class="text-sm leading-relaxed text-red-500">
                Account may be suspended if we find violations of our policies or the Terms and Conditions.
            </p>
        </div>
        <div className='flex justify-end'>
            <button className='p-2 bg-blue-500 m-2 px-4 rounded-md'
                onClick={()=>setModal(false)}
            >OK</button>
        </div>
        
        {/* </div> */}
    </Modal>

    {/* <Modal show={true} onHide={()=>{}} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{}}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal> */}


        {/* <Modal
            show={modal}
            onClose={()=>{}}
        >
            <Modal.Header>
                Terms of Content
            </Modal.Header>
            <Modal.Body>
            <div className="space-y-6">
                <p class="text-lg font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                    As our rules and regulation we do not allow this post.
                </p>
                {popup}
                <p class="text-sm leading-relaxed text-red-500 dark:text-gray-400">
                    Account may be suspended if we find violations of our policies or the Terms and Conditions.
                </p>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={()=>{setModal(false)}}>
                I accept
            </Button>
            </Modal.Footer>
        </Modal> */}


        {/* <div id="modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">        <div class="relative w-full h-full max-w-2xl md:h-auto">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Content
                        </h3>
                    </div>

                    <div class="p-6 space-y-6">
                        <p class="text-lg font-semibold leading-relaxed text-gray-500 dark:text-gray-400">
                            As our rules and regulation we do not allow this post.
                        </p>
                        {popup}
                        <p class="text-sm leading-relaxed text-red-500 dark:text-gray-400">
                            Account may be suspended if we find violations of our policies or the Terms and Conditions.
                        </p>
                    </div>

                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button 
                            data-modal-toggle="defaultModal" 
                            type="button" 
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={()=>{
                                modal.hide()
                            }}
                        >
                            I accept
                        </button>

                    </div>
                </div>
            </div>
        </div> */}


        {/* <button id="popoverButton" ref={triggerEl} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default popover</button>
        <div data-popover id="popoverContent" ref={targetEl} role="tooltip" class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">Popover title</h3>
            </div>
            <div class="px-3 py-2">
                <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
            <div data-popper-arrow></div>
        </div> */}


        <div className='w-full m-auto rounded-lg bg-neutral-700 py-1'>
            <div className='flex justify-center gap-2 m-2 p-2'>
                <img 
                    className='w-12 h-12 rounded-full'
                    alt=""
                    src="https://t4.ftcdn.net/jpg/03/21/43/07/360_F_321430761_qQi0CU9tzI5w1k1vJgdA02LMtXtsXvJE.jpg"
                />

                <textarea 
                    className='rounded-md p-2 px-3 outline-none w-full text-base text-white bg-neutral-700' 
                    placeholder="What's on you mind?"
                    value={postData.title}
                    name="title"
                    onChange={onChange}
                /> 

            </div>

            <hr className='m-auto bg-gray-500 border-0 h-px -mt-1' style={{width: "95%"}}/>
            {/* <br/> */}

            {loading ? (
                <div className='flex justify-center items-center gap-2'>
                    <ReactLoading type={"bars"} color={"yellow"} height={'10%'} width={'10%'} />
                    <h3 className='text-yellow-200 text-lg'>{loading}</h3>
                </div>
            )
            :
            (
                <form method="post" onSubmit={onSubmit}>
                    <div className='flex justify-between items-center px-4 py-1'>
                        <div className='w-1/2 rounded cursor-pointer hover:bg-gray-500 p-1'>
                            <label 
                                for="files" 
                                class="btn flex items-center justify-center h-10 gap-2 cursor-pointer"
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/1375/1375106.png" 
                                    className='w-8'
                                    alt=""
                                />
                                <h2 className='font-semibold'>{postData.myFile?postData.myFile.name:"Photo/Video"}</h2>
                                
                            </label>
                            <input 
                                type="file" 
                                accept="image/*, .mp4"
                                className='text-white hidden'
                                id="files"
                                name="myFile"
                                onChange={onFileChange}
                            />
                            

                        </div>

                        
                        {postData.myFile && <div 
                        >
                            {/* <img src={URL.createObjectURL(postData.myFile)} className="w-12" alt=""/> */}
                            <span 
                                className='bg-red-500 cursor-pointer text-sm font-semibold px-2 py-1 rounded hover:bg-red-600 -ml-10'
                                onClick={(e) => {
                                    setPostData((prevState) => ({
                                        ...prevState,
                                        myFile: undefined,
                                    }));
                                }}>X
                            </span>
                        </div>}

                        <button className='w-1/3 bg-green-500 flex items-center justify-center p-2 rounded cursor-pointer hover:bg-green-600' type="submit">
                            Upload
                        </button>
                    </div>
                </form>
            )}
        </div>
    </>
  )
}

export default CreatePost