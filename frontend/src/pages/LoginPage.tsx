// import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import toast from "react-hot-toast"
import { auth } from "../auth/firebase"
import { useLoginMutation } from "@/redux/api/userAPI"
import { useCallback, useState } from "react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { MessageTypes } from "@/types/apiTypes"
import { useNavigate } from "react-router"

function LoginPage() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider)

      const result = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      })

      if ("data" in result) {

        if (result.data?.message) {
          toast.success(result.data?.message);
          window.open("/", "_self");
          // navigate("/");
        }

      } else {
        const error = result.error as FetchBaseQueryError;
        console.log(error);
        const message = (error.data as MessageTypes).message;

        toast.error(message);
      }

    } catch (error) {
      toast.error("Sign In Failed")
    }
  }, [[gender, date, login, navigate]])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f7f7f7]">
      <div className="max-w-md w-full space-y-4 p-6 rounded-lg shadow-lg bg-card">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-card-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <div>
          <p className="text-sm text-center font-medium opacity-80">Please enter details if you are visiting for the first time.</p>
        </div>

        <form onSubmit={(e) => loginHandler(e)}>
          <div className="flex flex-col gap-8 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border rounded p-2 text-slate-600">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dob" >Date of birth</label>
              <input
                id="dob"
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded p-2 text-slate-600"
              />
            </div>
          </div>
          <p className="text-center opacity-90 mb-4 mt-2 text-sm">Already Signned In Once</p>
          <Button
            type="submit"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-card-foreground hover:bg-gray-700 hover:text-white"
          >
            <ChromeIcon className="h-5 w-5" />
            Login with Google
          </Button>
        </form>
      </div>
    </div>)
}

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

export default LoginPage


