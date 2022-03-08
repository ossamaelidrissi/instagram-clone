import React from 'react'

function MiniProfil() {
  return (
    <section className = "flex items-center justify-between mt-14 ml-10 ">
        <img src="https://avatars.githubusercontent.com/u/87373195?v=4" 
             alt=""
             className = "rounded-full border p-[2px] w-16 h-16" />
        <div className = "flex-1 mx-4">
            <h2 className = "font-bold" >ossama elidrissi</h2>
            <h3 className = "text-gray-400 text-sm" >welcome to instagram</h3>
        </div>

        <button className = "text-blue-400 text-sm font-semibold" >
            Sign Out
        </button>
    </section>
  )
}

export default MiniProfil