import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
        <Header />
        <main className = "flex flex-col items-center justify-center min-h-screen py-2 -mt-32 px-14">
                <div className = "flex flex-col items-center">
                    <img src="https://links.papareact.com/ocw" className = "w-80" alt="" />
                    <p className = "w-96 text-center text-sm font-serif" >This is not the real instagram , it's a Personal app Where You can login with your Gmail , Add Posts And comments</p>
                </div>
                <div className ="mt-16" >
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className = "active:scale-90 duration-300 uppercase p-3 border rounded-lg flex items-center space-x-2 border-gray-300 hover:shadow-sm font-semibold"
                                    onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
                                <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="h-5" alt="" />
                                <p className ="text-gray-500" > CONTINUE WITH {provider.name} </p>
                            </button>
                        </div>
                    ))}
                </div>

        </main>
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/