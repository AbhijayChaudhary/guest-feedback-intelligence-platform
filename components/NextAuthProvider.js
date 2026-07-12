'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

/**
 * NextAuthProvider wraps the application children inside next-auth's SessionProvider.
 * This is a Client Component which allows client-side components to consume OAuth sessions.
 */
export default function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
