import Image from "next/image"
import {SearchIcon , PlusCircleIcon , UserGroupIcon , HeartIcon , PaperAirplaneIcon , MenuIcon} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";

function Header() {
  return (
    <header className = "bg-white shadow-sm border-b sticky top-0 z-50 flex items-center w-full justify-around md:mx-auto mt-2 md:mt-0 py-5 lg:py-0">

        {/* Left */}

            <section className = "hidden lg:inline-grid cursor-pointer">
                <Image src="https://links.papareact.com/ocw" width={120} height={80} objectFit="contain" />
            </section>
            <section className = "lg:hidden cursor-pointer relative w-8 h-8">
                <Image src="https://links.papareact.com/jjm" layout="fill" objectFit="contain" />
            </section>
        
        
        {/* Middle - Search input field */}

            <section className = "group lg:w-1/5 bg-gray-50 flex items-center border border-gray-200 rounded-md">
                <div className = "p-1 lg:p-2 cursor-auto">
                    <SearchIcon className = "h-5 w-5 text-gray-400" />
                </div>
                <input type="search" placeholder="Search" className="outline-none text-sm bg-gray-50 text-gray-600" />
            </section>

        {/* Right */}

            <section className = "flex items-center justify-end space-x-4">
                <HomeIcon className = "button " />
                <MenuIcon className = "h-6 md:hidden cursor-pointer hover:scale-125 duration-300 " />
                <div className = "relative button">
                    <PaperAirplaneIcon className = " " />
                    <span className = "bg-red-500 text-white px-1 text-xs rounded-full right-0 -top-2 absolute justify-center items-center animate-pulse">2</span>
                </div>
                <HeartIcon className = "button " />
                <UserGroupIcon className = "button " />
                <PlusCircleIcon className = "button " />

                <img src="https://avatars.githubusercontent.com/u/87373195?v=4" alt="" className = "rounded-full h-10 cursor-pointer" />
            </section>
    </header>
  )
}

export default Header