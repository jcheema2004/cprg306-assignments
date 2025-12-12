"use client";

import Link from "next/link";
// // Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
     // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
        //Sign in to Firebase with GitHub authentication
      await gitHubSignIn();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
        // Sign out of Firebase
      await firebaseSignOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Week 10 – Login Page</h1>

      {!user && (
        <>
          <p className="text-lg">Please log in to continue</p>
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Login with GitHub
          </button>
        </>
      )}
        
      {user && (
        <div className="flex flex-col items-center gap-4">
           {/* Display some of the user's information */}
          <p className="text-lg">  
            Welcome, <span className="font-bold">{user.displayName}</span> (
            {user.email})
          </p>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          >
            Logout
          </button>

          <Link
            href="/week-10/shopping-list"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
          >
            Go to Shopping List
          </Link>
        </div>
      )}
    </main>
  );
}
