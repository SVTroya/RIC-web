import NextAuth, {Profile, Session} from 'next-auth'
import GoogleProvider, {GoogleProfile} from 'next-auth/providers/google'

import {connectToDB} from '@utils/database'
import User from '@models/user'

interface SessionUser {
  _id: string
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({session}: { session: Session }) {
      const sessionUser = User.findOne({
        email: session.user.email as string
      }) as unknown as SessionUser

      session.user.id = sessionUser._id?.toString()

      return session
    },
    async signIn({profile}: {profile?: Profile }) {
      try {
        await connectToDB()

        if (!profile){
          return false
        }

        const userExists = await User.findOne({email: profile.email})

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(' ', '').toLowerCase(),
            image: profile.image ? profile.image : (profile as GoogleProfile).picture
          })
        }

        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
})

export {handler as GET, handler as POST}