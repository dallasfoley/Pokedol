import BarChartIcon from "@mui/icons-material/BarChart";
import { useEffect, useState } from "react";
import getUserData from "../functions/getUserData";
import { UserDataType } from "../lib/types";
import { resetStreak } from "../functions/resetStreak";

const AnalyticsBar = ({
  game,
  fetchTrigger,
}: {
  game: string;
  fetchTrigger: boolean;
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
            </h2>
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="mx-3">Max Streak</h3>
            <h2 className="text-center">
              {game === "classic" && user?.classicMax}
              {game === "blurry" && user?.blurryMax}
              {game === "zoomed" && user?.zoomedMax}
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
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsBar;
