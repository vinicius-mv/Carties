export { auth as middleware } from "@/auth"

export const config = {
    matcher: [
        '/session'
    ],
    pages: {
        SingIn: '/api/auth/signin'
    }
}