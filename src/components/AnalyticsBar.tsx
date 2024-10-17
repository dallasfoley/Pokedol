import { useEffect, useState } from "react";
import { UserType } from "../lib/types";
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";
import { formatDate } from "../lib/utils";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit", // Ensures two-digit months
  day: "2-digit", // Ensures two-digit days
};

const today = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const todayString = today.toLocaleDateString(undefined, options);
const yesterdayString = yesterday.toLocaleDateString(undefined, options);

const AnalyticsBar = ({
  game,
  fetchTrigger,
  user,
  setUser,
}: {
  game: string;
  fetchTrigger: boolean;
  user: UserType;
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const resetStreak = async () => {
      console.log("today :", todayString);
      console.log("yesterday :", yesterdayString);
      console.log("user date :", user.blurryDate);

      if (
        game === "classic" &&
        user.classicDate !== todayString &&
        user.classicDate !== yesterdayString
      ) {
        await axios.put(`http://localhost:8080/api/reset/${user.id}`, {
          streak: "classicStreak",
        });
        setUser({ ...user, classicStreak: 0 });
      } else if (
        game === "blurry" &&
        user.blurryDate !== todayString &&
        user.blurryDate !== yesterdayString
      ) {
        await axios.put(`http://localhost:8080/api/reset/${user.id}`, {
          streak: "blurryStreak",
        });
        setUser({ ...user, blurryStreak: 0 });
      } else if (
        game === "zoomed" &&
        user.zoomedDate !== todayString &&
        user.zoomedDate !== yesterdayString
      ) {
        await axios.put(`http://localhost:8080/api/reset/${user.id}`, {
          streak: "zoomedStreak",
        });
        setUser({ ...user, zoomedStreak: 0 });
      }
    };
    resetStreak();
  }, []);

  useEffect(() => {
    const updateBar = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`
        );
        const updatedUser = res.data[0];
        console.log("updated user :", updatedUser);
        game === "classic" &&
          setUser({
            ...updatedUser,
            classicDate: todayString,
            blurryDate: formatDate(updatedUser.blurryDate),
            zoomedDate: formatDate(updatedUser.zoomedDate),
          });
        game === "zoomed" &&
          setUser({
            ...updatedUser,
            zoomedDate: todayString,
            blurryDate: formatDate(updatedUser.blurryDate),
            classicDate: formatDate(updatedUser.classicDate),
          });
        game === "blurry" &&
          setUser({
            ...updatedUser,
            blurryDate: todayString,
            classicDate: formatDate(updatedUser.classicDate),
            zoomedDate: formatDate(updatedUser.zoomedDate),
          });
      } catch (e) {
        console.error(e);
      }
    };
    updateBar();
  }, [fetchTrigger]);

  return (
    <div
      className={`flex flex-col justify-around items-center
        }`}
    >
      <button
        onClick={() => setToggle(!toggle)}
        className="flex justify-around items-center rounded-2xl bg-slate-700 text-slate-300 
          w-48 h-12 m-5 p-2 transition duration-300 hover:scale-105 
          hover:bg-slate-300 hover:text-slate-700"
      >
        <BarChartIcon className="text-md" />
        Toggle Analytics Bar
      </button>
      {toggle && (
        <div className="flex justify-around h-12">
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Current Streak</h3>
            <h2 className="text-center">
              {game === "classic" && user?.classicStreak}
              {game === "blurry" && user?.blurryStreak}
              {game === "zoomed" && user?.zoomedStreak}
              {!user && 0}
            </h2>
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Max Streak</h3>
            <h2 className="text-center">
              {game === "classic" && user?.classicMax}
              {game === "blurry" && user?.blurryMax}
              {game === "zoomed" && user?.zoomedMax}
              {!user && 0}
            </h2>
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Average Guesses</h3>
            <h2 className="text-center">
              {game === "classic" &&
                (user?.classicGuesses || 0) / (user?.classicWins || 1)}
              {game === "blurry" &&
                (user?.blurryGuesses || 0) / (user?.blurryWins || 1)}
              {game === "zoomed" &&
                (user?.zoomedGuesses || 0) / (user?.zoomedWins || 1)}
            </h2>
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Total Wins</h3>
            <h2 className="text-center">
              {game === "classic" && user?.classicWins}
              {game === "blurry" && user?.blurryWins}
              {game === "zoomed" && user?.zoomedWins}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsBar;
