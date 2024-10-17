import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import InputGuess from "../components/GuessInput";
import WinMsg from "../components/WinMsg";
import { names } from "../lib/constants";
//import updateStreak from "../functions/updateStreak";
import AnalyticsBar from "../components/AnalyticsBar";
import { UserType } from "../lib/types";
import axios from "axios";
// import AnalyticsBar from "../components/AnalyticsBar";

const id = Math.floor(Math.random() * 151);

const getAnswer = async (): Promise<string[]> => {
  try {
    const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await rawData.json();
    return [data.name, data.sprites.front_default];
  } catch (error) {
    console.error(error);
    alert("Failed to fetch Answer Pokémon, reload page");
    return ["", ""];
  }
};

const Zoom = ({
  user,
  setUser,
}: {
  user: UserType;
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}) => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [zoomPercent, setZoomPercent] = useState(750);
  const darkTheme = useContext(ThemeContext).darkTheme;
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const hasWon = guesses.length > 0 && guesses[0] === answer[0];

  const handleGuess = async () => {
    if (!hasWon && names.includes(input.toLowerCase())) {
      setGuesses([input.toLowerCase(), ...guesses]);
      setZoomPercent(zoomPercent - 50);
    }
  };

  const handleGuess2 = (name: string) => {
    !hasWon && setGuesses([name.toLowerCase(), ...guesses]);
    setZoomPercent(zoomPercent - 50);
  };

  const capitalizeFirstLetter = (info: string | number) => {
    if (typeof info === "string") {
      return info.charAt(0).toUpperCase() + info.slice(1);
    }
    return info;
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      const data = await getAnswer();
      setAnswer(data);
    };
    fetchAnswer().catch(console.error);
  }, []);

  useEffect(() => {
    if (hasWon && user?.email.length > 4) {
      const updateUserStreak = async () => {
        console.log("here");
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}api/update/${user.id}`,
            {
              game: "zoomed",
              guesses: guesses.length,
            }
          );
          console.log("res.data: ", response.data);
          const updatedUser = {
            ...user,
            zoomedStreak: response.data.data.streak,
            zoomedGuesses: response.data.data.totalGuesses,
            zoomedWins: response.data.data.totalWins,
            zoomedMax: response.data.data.maxStreak,
          };
          setUser(updatedUser);
          console.log(updatedUser);
          if (response.status === 200) {
            // Optionally, update local user state or notify user
            console.log("Streak updated successfully:", response.data.message);
          } else {
            console.error("Failed to update streak:", response.data.error);
          }
        } catch (error) {
          console.error("Error updating streak:", error);
        }
      };

      updateUserStreak();
      setFetchTrigger(!fetchTrigger);
    }
  }, [hasWon]);

  return (
    <>
      <div className="flex flex-col justify-around items-center">
        <AnalyticsBar
          game="zoomed"
          fetchTrigger={hasWon}
          user={user}
          setUser={setUser}
        />
        {guesses.length === 0 && (
          <p className="text-lg md-text-3xl mt-4">
            Guess a Pokemon to begin! The image will become slightly more
            zoomed-out following each incorrect guess.
          </p>
        )}
        {!hasWon ? (
          <>
            <InputGuess
              input={input}
              setInput={setInput}
              handleGuess={handleGuess}
              handleGuess2={(name) => handleGuess2(name)}
            />
            <div
              className=""
              style={{
                backgroundImage: `url(${answer[1]})`,
                backgroundSize: `${zoomPercent}%`,
                backgroundPosition: "center",
                width: "500px",
                height: "500px",
                margin: "20px auto",
                border: "1px solid black",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </>
        ) : (
          <>
            <img
              src={answer[1]}
              alt="Answer"
              style={{ margin: "20px auto" }}
              className="h-[200px] w-[200px] md:h-[350px] md:w-[350px] lg:h-[500px] lg:w-[500px]"
            />
            <WinMsg guesses={guesses.length} />
          </>
        )}
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="w-56 h-14 md:w-64 md:h-16 rounded-xl m-5 flex justify-center items-center"
            style={{
              backgroundColor: hasWon && index === 0 ? "green" : "red",
              border: darkTheme ? "2px #fff solid" : "2px #2f3133 solid",
              color: darkTheme ? "#ebfffc" : "#2f3133",
            }}
          >
            {capitalizeFirstLetter(guess)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Zoom;
