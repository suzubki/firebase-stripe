import { app, auth } from "@/api/firebase";
import { getCheckoutUrl, getPremiumStatus } from "@/services/firebase";
import { type User } from "firebase/auth";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../common";

const inter = Inter({ subsets: ["latin"] });

export const Dashboard = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isFetchingPremiumStatus, setIsFetchingPremiumStatus] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isFetchingCheckoutUrl, setIsFetchingCheckoutUrl] = useState(false);

  useEffect(() => {
    setIsFetchingPremiumStatus(true);

    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
      setIsFetchingPremiumStatus(false);
    };

    checkPremium();
  }, []);

  const onCheckoutPayment = async (productId: string) => {
    try {
      setIsFetchingCheckoutUrl(true);

      const checkoutUrl = await getCheckoutUrl(app, productId);
      router.push(checkoutUrl);

      return;
    } catch (error) {
      console.error(error);
      setIsFetchingCheckoutUrl(false);
    }
  }

  const onLogout = async () => {
    await auth.signOut();
  }

  return (
    <main className={`flex min-h-screen flex-col gap-16 p-24 xl:mx-96 ${inter.className}`}>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Welcome to Firebase and Stripe Integration</h1>
        <p className="text-xl">You are logged using:</p>
        <p className="text-xl font-medium">{user.email}</p>
        <Button className="w-fit" onClick={() => { onLogout() }}>
          Logout
        </Button>
      </div>

      <hr className="w-full border-1 border-gray-200" />

      <div className="self-start w-96 flex flex-col gap-4">
        <h2 className="text-base">Our Products:</h2>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">
            1. Premium Subscription, $20.00/month
          </h2>
          {
            isFetchingPremiumStatus ? <p className="text-sm">Checking your premium status...</p> : (
              !isPremium ? 
                <Button onClick={() => onCheckoutPayment('price_1PLUcCRtmWcJdMmTzErJPTxW')} disabled={isFetchingCheckoutUrl}>
                  {isFetchingCheckoutUrl ? 'Redirecting...' : 'Checkout'}
                </Button> : <p className="text-sm text-green-600">You are already subscribed to this product</p>
            )
          }
        </div>
      </div>
    </main>
  )
}
