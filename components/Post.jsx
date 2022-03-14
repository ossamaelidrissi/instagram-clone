import { BookmarkAltIcon, ChatIcon, HeartIcon, PaperAirplaneIcon , EmojiHappyIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Moment from "react-moment";

function Post({id,username,img,caption,userImg}) {
    const {data: session} = useSession();
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState("");
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);

    console.log(session)

    useEffect(() => onSnapshot(query(collection(db,'posts',id,"comments"), orderBy("timestamp","desc")),snapshot => setComments(snapshot.docs)),[db,id])
    useEffect(() => onSnapshot(query(collection(db,'posts',id,"likes")),snapshot => setLikes(snapshot.docs)),[db,id])

    const likePost = async () => {
        await addDoc(collection(db,'posts',id,"likes"),{
            username:session.user?.name
        })
    }

    const sendComment = async (e) => {

        e.preventDefault();

        const commentToSend = comment;

        setComment('');

        await addDoc(collection(db,'posts',id,"comments"),{
            comment:commentToSend,
            username:session.user.name,
            userImage:session.user.image,
            timestamp:serverTimestamp()
        })
    }
  return (
    <section className = " bg-white my-7 border rounded-sm">
        <section className = "flex items-center justify-between pr-2">
            <div className = "flex items-center space-x-2 p-4">
                <img src={userImg} className = "rounded-full h-12 w-12 object-contain border p-1" alt="" />
                <p className = "font-bold text-sm">{username}</p>
            </div>
            <DotsHorizontalIcon className = "h-4 cursor-pointer button" />
        </section>

        <section>
            <img src={img} alt="" className = "w-full object-cover" />
        </section>

        { session && (
            <section className = "flex items-center justify-between px-4 pt-4">
                    <div className = "flex items-center space-x-4">
                        <HeartIcon onClick = {likePost} className = "btn" />
                        <ChatIcon className = "btn" />
                        <PaperAirplaneIcon className = "btn" />
                    </div>

                    <BookmarkAltIcon className = "btn" />
            </section>
        )}


        <p className = "p-5 truncate ">
            <span className = "font-bold mr-1"> {username} </span>
            {caption}
        </p>

        {
            comments.length > 0 && (
                <div className = "ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {
                        comments.map(comment => (
                            <div key={comment.id} className = "flex items-center space-x-2 mb-3" >
                                <img className = "rounded-full h-7 " src={comment.data().userImage} alt="" />
                                <p className = "text-sm flex-1" >
                                    <span className = "font-semibold mr-3" >{comment.data().username}</span>
                                    {comment.data().comment}
                                </p>

                                <Moment fromNow className='pr-5 text-xs' >
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                                    
                            </div>
                        ))
                    }
                </div>
            )
        }

        { session &&
           ( 
                <form className = "flex p-4 items-center space-x-2" >
                    <EmojiHappyIcon className = "h-7" />
                    <input value={comment} onChange={e => setComment(e.target.value)} type="text" className = "border-none flex-1 outline-none" placeholder = "Add a comment..." />
                    <button type = "submit" disabled={!comment.trim()} onClick = {sendComment} className = "text-blue-400 font-semibold" >Post</button>
                </form>
            )
        }

    </section>
  )
}

export default Post