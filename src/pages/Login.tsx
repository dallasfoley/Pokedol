import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import MailIcon from "@mui/icons-material/Mail";
import { signInWithEmailPassword, signInWithGoogle } from "../lib/constants";
import { useState } from "react";
import { auth } from "../lib/firebase.config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSignInWithEmailPassword = async () => {
    signInWithEmailPassword(emailInput, passwordInput);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("This is the user: ", user);
        navigate("/home");
      } else {
        console.log("There is no logged in user");
      }
    });
  };

  const handleSignInWithGoogle = async () => {
    signInWithGoogle();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("This is the user: ", user);
        navigate("/home");
      } else {
        console.log("There is no logged in user");
      }
    });
  };

  const handleSignUpWithGoogle = async () => {
    navigate("/signup");
  };

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
          onClick={handleSignInWithEmailPassword}
          className="h-14 w-14 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-110 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>

        <h2 className="font-bold text-lg">or</h2>

        <button
          onClick={handleSignInWithGoogle}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-110 hover:text-black text-lg"
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
          onClick={handleSignUpWithGoogle}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-110 hover:text-black text-lg"
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
        transition duration-300 hover:scale-110 hover:text-black text-lg"
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
