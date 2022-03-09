import faker from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from './Story';

function Stories() {
    const {data:session} = useSession();
    const [suggestions,setSuggestions] = useState([]);
    useEffect(() => {
        const suggestions = [...Array(20)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id:i
        })
        )
        setSuggestions(suggestions)
    },[])

    
  return (
    <div className = "bg-white flex items-center overflow-x-scroll space-x-2 scrollbar-thin scrollbar-thumb-black p-4 mt-6 rounded-sm shadow-sm border-b">
        {session && <Story key = {2} img = {session.user.image} username = {session.user.name} />}
        {   
            suggestions.map(profile => (
                <Story key = {profile.id} img = {profile.avatar} username = {profile.username}  />
            ))
        }
    </div>
  )
}

export default Stories