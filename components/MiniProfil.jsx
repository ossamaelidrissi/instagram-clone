import { useSession , signOut } from 'next-auth/react'
import React from 'react'

function MiniProfil() {

  const {data:session} = useSession();
  return (


     
          <section className = "flex items-center justify-between mt-14 ml-10 ">
        <img src={session?.user?.image}
             alt=""
             className = "rounded-full border p-[2px] w-16 h-16" />
        <div className = "flex-1 mx-4">
            <h2 className = "font-bold" >{session?.user?.name}</h2>
            <h3 className = "text-gray-400 text-sm" >welcome to instagram</h3>
        </div>

        <button onClick = {signOut} className = "text-blue-400 text-sm font-semibold" >
            Sign Out
        </button>
          </section>

  )
}

export default MiniProfil