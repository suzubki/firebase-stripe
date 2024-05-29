import { auth } from "@/api/firebase";
import { Dashboard, NotLoggedIn, ValidatingUser } from "@/components/cpages";
import { type User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [validatingUser, setValidatingUser] = useState(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);

      setValidatingUser(false);
    })

    return () => unSubscribe();
  }, [])

  if (validatingUser) return <ValidatingUser />

  if (!user) return <NotLoggedIn />

  return <Dashboard user={user} />
}
