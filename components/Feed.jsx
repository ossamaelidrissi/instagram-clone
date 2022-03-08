import Stories from './Stories';
import Posts from "./Posts";
import MiniProfil from "./MiniProfil";
import Suggestions from './Suggestions';

function Feed() {
  return (
    <main className = "grid grid-cols-1 md:grid-cols-2 md:max-w-xl xl:max-w-4xl mx-auto xl:grid-cols-3">

        <section className = "col-span-2 space-y-1">
            <Stories />
            <Posts />
        </section>

        <section  className = "hidden xl:inline-grid md:col-span-1">
            <div className = "fixed">
                <MiniProfil />
                <Suggestions />
            </div>


        </section>

    </main>
  )
}

export default Feed