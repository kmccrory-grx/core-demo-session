import NextAuth from "next-auth"
import OktaProvider from "next-auth/providers/okta";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        OktaProvider({
            clientId: process.env.OKTA_CLIENT_ID,
            issuer: process.env.OKTA_ISSUER,
            checks: ["pkce", "state"]
        })
    ]
});
