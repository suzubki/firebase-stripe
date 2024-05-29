import { signInWithCredentials } from '@/services/firebase';
import React, { useState } from 'react'
import { Button } from '../common';

const DEFAULT_USER = {
  email: "firebase-and-stripe-integration@hotmail.com",
  password: "123456789",
}

export const NotLoggedIn = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSignIn = async () => {
    setIsSigningIn(true);
    await signInWithCredentials(DEFAULT_USER.email, DEFAULT_USER.password);
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-center">
      <p className="text-2xl">You are not logged in</p>
      <Button
        onClick={() => { onSignIn() }}
        disabled={isSigningIn}
      >
        Sign in with credentials
      </Button>
    </main>
  )
}
