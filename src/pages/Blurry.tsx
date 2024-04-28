import { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import GuessInput from "../components/GuessInput";

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

const Blurry = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const darkTheme = useContext(ThemeContext).darkTheme;

  const hasWon = guesses.length > 0 && guesses[0] === answer[0];

  const handleGuess = () => {
    !hasWon && setGuesses([input.toLowerCase(), ...guesses]);
  };

  const handleGuess2 = (name: string) => {
    !hasWon && setGuesses([name.toLowerCase(), ...guesses]);
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

  return (
    <>
      <div className="flex flex-col items-center justify-around">
        <GuessInput
          input={input}
          setInput={setInput}
          handleGuess={() => handleGuess()}
          handleGuess2={(name) => handleGuess2(name)}
        />

        <img
          src={answer[1]}
          className=""
          style={{
            filter: !hasWon ? `blur(${64 - guesses.length * 8}px)` : "none",
            width: "500px",
            height: "500px",
            objectFit: "contain",
            transition: "transform 0.3s ease",
          }}
        />
        {hasWon && (
          <div className="text-2xl md:text-3xl">
            Congratulations! It took you {guesses.length}{" "}
            {guesses.length === 1 ? "guess" : "guesses"} to correctly guess the
            Pokemon!
          </div>
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

export default Blurry;
