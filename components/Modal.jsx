import {Dialog,Transition} from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import {db , storage} from "../firebase";
import {addDoc,collection,serverTimestamp,doc,updateDoc} from "@firebase/firestore";
import {ref,uploadString,getDownloadURL} from "@firebase/storage";
import { useSession } from "next-auth/react";

export default function Modal() {
    const [open,setOpen] = useRecoilState(modalState);
    const pictureRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile,setSelectedFile] = useState(null);
    const [loading,setLoading] = useState(false);

    const {data: session} = useSession();

    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);

        // 1) Create a post and add to firestore 'posts' collection
        // 2) Get the post ID for the newly created post
        // 3) Upload the image to firebase storage with the post id
        // 4) Get a download URL from firbase storage and update the original post with image

        console.log(session.user.name)

        const docRef = await addDoc(collection(db,'posts'),{
            username: session.user.name,
            caption:captionRef.current.value,
            profileImg:session.user.image,
            timestamp:serverTimestamp()
        });

        const imageRef = ref(storage,`posts/${docRef.id}/images`);

        await uploadString(imageRef,selectedFile,"data_url").then(async (snapshot) => {

            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db,'posts',docRef.id),{
                image:downloadURL
            })
        });

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }
  return (
    <Transition.Root show = {open} as={Fragment} >
        <Dialog as = "div"
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={setOpen} >
            <div className = "flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 " >
                <Transition.Child 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className = "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <span className = "hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden = "true" >
                    &#8203;
                </span>

                <Transition.Child 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className = "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" >
                        <div>
                            <div className = "space-y-4 mx-auto flex flex-col items-center">
                                {
                                    selectedFile ? (
                                        <img src={selectedFile} 
                                                    className = "w-full object-contain cursor-pointer"
                                                     onClick = {() => setSelectedFile(null) } alt="" />
                                    )
                                            : (
                                                <CameraIcon onClick = {() => pictureRef.current.click()} className = "cursor-pointer h-12 bg-gray-200 text-red-600 rounded-full p-2" />
                                            )

                                }
                                <Dialog.Title as="h3"
                                className = "text-lg mt-5 leading-6 font-meduim text-gray-900"
                                >
                                    Upload a photo
                                </Dialog.Title>
                                
                                <input ref={captionRef} type="text" className = "bg-white border-none outline-none" placeholder = "Please enter a caption ..." />
                                
                                <div>
                                    <input ref={pictureRef} onChange={addImageToPost} type="file" hidden />
                                </div>
                            </div>
                            <div className ="mt-5 sm:mt-6" >
                                <button type ="button"
                                        disabled={!selectedFile}
                                        onClick={uploadPost}
                                        className = "inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-meduim text-white hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                        >
                                        {loading ? "Uploading..." : "Uplaod Post" } 
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}
