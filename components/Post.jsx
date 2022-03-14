import { BookmarkAltIcon, ChatIcon, HeartIcon, PaperAirplaneIcon , EmojiHappyIcon } from '@heroicons/react/outline'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import React from 'react'

function Post({id,username,img,caption,userImg}) {
    const {data: session} = useSession();
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
                        <HeartIcon className = "btn" />
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

        { session &&
           ( 
                <form className = "flex p-4 items-center space-x-2" >
                    <EmojiHappyIcon className = "h-7" />
                    <input type="text" className = "border-none flex-1 outline-none" placeholder = "Add a comment..." />
                    <button className = "text-blue-400 font-semibold" >Post</button>
                </form>
            )
        }

    </section>
  )
}

export default Post