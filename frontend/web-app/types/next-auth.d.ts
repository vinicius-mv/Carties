import NextAuth, { type DefaultSession } from "next-auth"
import JWT from 'next-auth/jwt'

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            username: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }

    interface Profile {
        username: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
    }
}