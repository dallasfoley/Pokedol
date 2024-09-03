import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { UserContext } from "../contexts/UserContext";
import { UserType } from "../lib/types";
import { format } from "date-fns";

const formatDate = (isoString: string) => {
  return format(new Date(isoString), "MM/dd/yyyy");
};

console.log("api url: ", import.meta.env.VITE_API_URL);

const Login = ({
  setUser,
}: {
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const res = await axios.post<{ user: UserType }>(
        `${import.meta.env.VITE_API_URL}api/login`,
        {
          email,
          password,
        }
      );
      const user1 = res.data.user as UserType;
      setUser({
        ...user1,
        blurryDate: formatDate(user1.blurryDate),
        classicDate: formatDate(user1.classicDate),
        zoomedDate: formatDate(user1.zoomedDate),
      });

      navigate("/home");
    } catch (e) {
      console.error(e);
      const today = new Date();
      const todayString = today.toLocaleDateString();
      setUser({
        id: 0,
        email: email,
        password: password,
        darkTheme: true,
        blurryStreak: 0,
        classicStreak: 0,
        zoomedStreak: 0,
        blurryMax: 0,
        classicMax: 0,
        zoomedMax: 0,
        blurryDate: todayString,
        classicDate: todayString,
        zoomedDate: todayString,
        classicGuesses: 0,
        classicWins: 0,
        blurryGuesses: 0,
        blurryWins: 0,
        zoomedGuesses: 0,
        zoomedWins: 0,
      });
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 m-0 flex flex-col justify-center items-center text-white p-0">
      <div className="h-96 w-64 md:h-96 md:w-72 rounded-2xl bg-slate-800 flex flex-col justify-around items-center p-0">
        <h1 className="text-3xl font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-10 w-48 rounded-xl p-2 text-slate-950"
        />

        <button
          onClick={signIn}
          className="h-14 w-14 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black"
        >
          <ArrowForwardIcon fontSize="large" />
        </button>
      </div>
      <h3 className="my-4">{`Don't have an account yet?`}</h3>
      <div className="flex flex-col justify-around items-center ">
        <button
          onClick={() => navigate("/signup")}
          className="h-14 w-56 bg-slate-500 rounded-2xl hover:bg-slate-200
        transition duration-300 hover:scale-105 hover:text-black text-lg"
        >
          <div className="flex justify-center items-center">
            <h3 className="font-bold mr-1">Sign-Up with Email</h3>
            <MailIcon className="ml-1" fontSize="large" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
