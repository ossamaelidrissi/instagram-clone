import Image from "next/image"
import {SearchIcon , PlusCircleIcon , UserGroupIcon , HeartIcon , PaperAirplaneIcon , MenuIcon} from "@heroicons/react/outline";
import {HomeIcon} from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react"
import {modalState} from "../atoms/modalAtom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

function Header() {

    const {data : session} = useSession();
    const router = useRouter();
    const [open,setOpen] = useRecoilState(modalState);

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
                <HomeIcon className = "button " onClick={() => router.push("/")} />
                <MenuIcon className = "h-6 md:hidden cursor-pointer hover:scale-125 duration-300 " />
                {
                    session ? (
                        <>
                            <div className = "relative button">
                                <PaperAirplaneIcon className = " " />
                                <span className = "bg-red-500 text-white px-1 text-xs rounded-full right-0 -top-2 absolute justify-center items-center animate-pulse">2</span>
                            </div>
                            <HeartIcon className = "button " />
                            <UserGroupIcon className = "button " />
                            <PlusCircleIcon onClick = {() => setOpen(true)} className = "button " />
                            <img onClick = {signOut} src={session?.user?.image} alt="" className = "rounded-full h-10 cursor-pointer" />
                        </>
                    ) : (
                        <button onClick = {() => router.push("/auth/signin")} >Login</button>
                    )
                }

            </section>
    </header>
  )
}

export default Header