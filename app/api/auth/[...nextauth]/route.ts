import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  type SiweMessage,
  parseSiweMessage,
  validateSiweMessage,
} from 'viem/siwe';

import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials: any) {
        try {
          console.log('Authorizing with credentials:', credentials);
          const siweMessage = parseSiweMessage(
            credentials?.message,
          ) as SiweMessage;

          if (
            !validateSiweMessage({
              address: siweMessage?.address,
              message: siweMessage,
            })
          ) {
            return null;
          }

          console.log('Environment variables:', {
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            VERCEL_URL: process.env.VERCEL_URL
          });
          
          let nextAuthHost = 'localhost:3000';
          if (process.env.NEXTAUTH_URL) {
            try {
              nextAuthHost = new URL(process.env.NEXTAUTH_URL).host;
            } catch (e) {
              console.log('Invalid NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
            }
          } else if (process.env.VERCEL_URL) {
            nextAuthHost = process.env.VERCEL_URL;
          }
          
          console.log('Expected host:', nextAuthHost);
          if (siweMessage.domain !== nextAuthHost) {
            console.log('Domain mismatch:', siweMessage.domain, 'expected:', nextAuthHost);
            return null;
          }

          const publicClient = createPublicClient({
            chain: base,
            transport: http(),
          });

          const valid = await publicClient.verifyMessage({
            address: siweMessage?.address,
            message: credentials?.message,
            signature: credentials?.signature,
          });

          console.log('Message verification result:', valid);
          if (!valid) {
            console.log('Message verification failed');
            return null;
          }

          return {
            id: siweMessage.address,
          };
        } catch (e) {
          console.error('Error authorizing user', e);
          return null;
        }
      },
      credentials: {
        message: {
          label: 'Message',
          placeholder: '0x0',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          placeholder: '0x0',
          type: 'text',
        },
      },
      name: 'Ethereum',
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.address = token.sub;
      session.user = {
        name: token.sub,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};


const handler = NextAuth({
  ...authOptions,
})

export { handler as GET, handler as POST }