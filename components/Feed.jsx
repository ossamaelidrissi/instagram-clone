import Stories from './Stories';
import Posts from "./Posts";
import MiniProfil from "./MiniProfil";
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';

function Feed() {
  const {data : session} = useSession();
  return (
    <main className = {`grid ${!session && "!grid-cols-1 xl:max-w-xl"} grid-cols-1 md:grid-cols-2 md:max-w-xl xl:max-w-4xl mx-auto xl:grid-cols-3`}>

        <section className = "col-span-2 space-y-1">
            <Stories />
            <Posts />
        </section>

        { session && ( 
          <section  className = "hidden xl:inline-grid md:col-span-1">
              <div className = "fixed">
                  <MiniProfil />
                  <Suggestions />
              </div>


          </section>
)}

    </main>
  )
}

export default Feed