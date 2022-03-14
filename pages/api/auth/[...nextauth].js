import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider(
        {
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }
    ),
    // ...add more providers here
  ],
  pages:{
      signIn:"/auth/signin",
  },
  secret:process.env.NEXTAUTH_SECRET
<<<<<<< HEAD
})
=======
})
>>>>>>> d5b09ee2ef8926ee7c823099b9ebcaa12c294b1a
