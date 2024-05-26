import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import MailIcon from "@mui/icons-material/Mail";
import { signInWithEmailPassword, signInWithGoogle } from "../lib/constants";
import { useState } from "react";
import { auth, db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSignInWithEmailPassword = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signInWithEmailPassword(emailInput, passwordInput);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/home");
      } else {
        console.log("There is no logged in user");
      }
    });
  };

  const handleSignInWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signInWithGoogle();
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        !docSnap.exists() &&
          (await setDoc(docRef, {
            blurryStreak: 0,
            classicStreak: 0,
            zoomedStreak: 0,
            blurryMax: 0,
            classicMax: 0,
            zoomedMax: 0,
            blurryDate: "null",
            classicDate: "null",
            zoomedDate: "null",
            userID: user.uid,
            classicTotalGuesses: 0,
            classicTotalWins: 0,
            blurryTotalGuesses: 0,
            blurryTotalWins: 0,
            zoomedTotalGuesses: 0,
            zoomedTotalWins: 0,
          }));
        navigate("/home");
      } else {
        console.log("There is no logged in user");
      }
    });
  };

  const handleSignUpWithEmail = async () => {
    navigate("/signup");
  };

  console.log("API Key:", import.meta.env.VITE_API_KEY);
  console.log("Auth Domain:", import.meta.env.VITE_AUTH_DOMAIN);

  return (
    <div className="min-h-screen w-full bg-slate-950 m-0 flex flex-col justify-center items-center text-white p-0">
      <div className="h-96 w-64 md:h-96 md:w-72 rounded-2xl bg-slate-800 flex flex-col justify-around items-center p-0">
        <h1 className="text-3xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmailInput(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />

        <button
          onClick={(e) => handleSignInWithEmailPassword(e)}
          className="h-14 w-14 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>

        <h2 className="font-bold text-lg">or</h2>

        <button
          onClick={handleSignInWithGoogle}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black text-lg"
        >
          <div className="flex justify-center items-center">
            <h3 className="font-bold mr-1">Sign-In with Google</h3>
            <GoogleIcon className="ml-1" fontSize="large" />
          </div>
        </button>
      </div>
      <h3 className="my-4">{`Don't have an account yet?`}</h3>
      <div className="flex flex-col justify-around items-center ">
        <button
          onClick={handleSignUpWithEmail}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black text-lg"
        >
          <div className="flex justify-center items-center">
            <h3 className="font-bold mr-1">Sign-Up with Email</h3>
            <MailIcon className="ml-1" fontSize="large" />
          </div>
        </button>

        <h2 className="font-bold text-lg mx-4">or</h2>

        <button
          onClick={handleSignInWithGoogle}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black text-lg"
        >
          <div className="flex justify-center items-center">
            <h3 className="font-bold mr-1">Sign-Up with Google</h3>
            <GoogleIcon className=" ml-1" fontSize="large" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
