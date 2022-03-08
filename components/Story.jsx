

export default function Story({img,key,username}) {
  return (
    <div className = "flex flex-col items-center">
        <img src={img} alt="" className = "h-14 w-14 rounded-full border-2 border-red-700 cursor-pointer hover:scale-110 transition-all duration-100 ease-out object-contain" />
        <p className = "font-semibold text-xs truncate w-14 ">{username}</p>
    </div>
  )
}
