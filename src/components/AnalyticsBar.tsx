import BarChartIcon from "@mui/icons-material/BarChart";
import { useEffect, useState } from "react";
import getUserData from "../functions/getUserData";
import { UserDataType } from "../lib/types";
import { resetStreak } from "../functions/resetStreak";

const AnalyticsBar = ({
  game,
  fetchTrigger,
  guesses = 0,
}: {
  game: string;
  fetchTrigger: boolean;
  guesses: number;
}) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const today = new Date();
      const todayString = today.toLocaleDateString();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayString = yesterday.toLocaleString();
      const data = await getUserData(game);
      data && setUser(data);
      console.log(`user: ${data}`);
      if (fetchTrigger && user) {
        if (game === "classic" && data?.classicDate !== todayString) {
          setUser({
            ...user,
            classicStreak: data?.classicStreak || 1,
            classicTotalGuesses: (data?.classicTotalGuesses || 0) + guesses,
            classicTotalWins: (data?.classicTotalWins || 0) + 1,
            classicMax:
              (data?.classicStreak || 1) > (data?.classicMax || 0)
                ? (data?.classicStreak || 0) + 1
                : data?.classicMax || 1,
          });
        }
        if (game === "blurry" && data?.blurryDate !== todayString) {
          setUser({
            ...user,
            blurryStreak: data?.blurryStreak || 1,
            blurryTotalGuesses: (data?.blurryTotalGuesses || 0) + guesses,
            blurryTotalWins: (data?.blurryTotalWins || 0) + 1,
            blurryMax:
              (data?.blurryStreak || 1) > (data?.blurryMax || 0)
                ? (data?.blurryStreak || 0) + 1
                : data?.blurryMax || 1,
          });
        }
        if (game === "zoomed" && data?.zoomedDate !== todayString) {
          setUser({
            ...user,
            zoomedStreak: data?.zoomedStreak || 1,
            zoomedTotalGuesses: (data?.zoomedTotalGuesses || 0) + guesses,
            zoomedTotalWins: (data?.zoomedTotalWins || 0) + 1,
            zoomedMax:
              (data?.zoomedStreak || 1) > (data?.zoomedMax || 0)
                ? (data?.zoomedStreak || 0) + 1
                : data?.zoomedMax || 1,
          });
        }
      }
      if (
        game === "classic" &&
        data?.classicDate !== todayString &&
        data?.classicDate !== yesterdayString &&
        data?.classicDate !== "null"
      ) {
        resetStreak(game);
        console.log(todayString);
        console.log(yesterdayString);
        console.log(data?.classicDate);
      }

      if (
        game === "blurry" &&
        data?.blurryDate !== todayString &&
        data?.blurryDate !== yesterdayString &&
        data?.blurryDate !== "null"
      ) {
        resetStreak(game);
        console.log(todayString);
        console.log(yesterdayString);
        console.log(data?.blurryDate);
      }
      if (
        game === "zoomed" &&
        data?.zoomedDate !== todayString &&
        data?.zoomedDate !== yesterdayString &&
        data?.zoomedDate !== "null"
      ) {
        resetStreak(game);
        console.log(todayString);
        console.log(yesterdayString);
        console.log(data?.zoomedDate);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                (user?.classicTotalGuesses || 0) /
                  (user?.classicTotalWins || 1)}
              {game === "blurry" &&
                (user?.blurryTotalGuesses || 0) / (user?.blurryTotalWins || 1)}
              {game === "zoomed" &&
                (user?.zoomedTotalGuesses || 0) / (user?.zoomedTotalWins || 1)}
            </h2>
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Total Wins</h3>
            <h2 className="text-center">
              {game === "classic" && user?.classicTotalWins}
              {game === "blurry" && user?.blurryTotalWins}
              {game === "zoomed" && user?.zoomedTotalWins}
              {!user && 0}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsBar;
