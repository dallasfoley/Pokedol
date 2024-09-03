import { useEffect, useState } from "react";
import { PokemonApi, UserType } from "../lib/types";
import Row from "../components/Row";
import WinMsg from "../components/WinMsg";
import GuessInput from "../components/GuessInput";
//import updateStreak from "../functions/updateStreak";
import AnalyticsBar from "../components/AnalyticsBar";
import axios from "axios";
// import AnalyticsBar from "../components/AnalyticsBar";

const isDev = import.meta.env.MODE === "development";
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const id = Math.floor(Math.random() * 151);

const ColumnHead = {
  name: "Name",
  type1: "Type 1",
  type2: "Type 2",
  habitat: "Habitat",
  color: "Color",
  stage: "Stage",
  height: "Height",
  weight: "Weight",
};

const Classic = ({
  user,
  setUser,
}: {
  user: UserType;
  setUser: (value: UserType | ((val: UserType) => UserType)) => void;
}) => {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<PokemonApi[]>([]);
  const [answer, setAnswer] = useState<PokemonApi | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const hasWon = guesses.length > 0 && guesses[0].name === answer?.name;

  console.log("classic user: ", user);

  const getPokemonData = async (
    url: string,
    answer: PokemonApi | null = null
  ) => {
    const pokemonResponse = await fetch(url);
    const pokemon = await pokemonResponse.json();

    const speciesResponse = await fetch(pokemon.species.url);
    const species = await speciesResponse.json();

    let stage = 1;

    if (species.evolves_from_species) {
      const prevEvoResponse = await fetch(species.evolves_from_species.url);
      const prevEvo = await prevEvoResponse.json();
      console.log(prevEvo);
      stage++;
      prevEvo.evolves_from_species && stage++;
    }

    const {
      name,
      type1,
      type2,
      habitat,
      color,
      evolutionStage,
      height,
      weight,
    } = answer || {};

    return {
      name: pokemon.name,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1]?.type.name || "None",
      habitat: species.habitat?.name || "Unknown",
      color: species.color?.name || "Unknown",
      evolutionStage: stage.toString(),
      height: `${pokemon.height * 10} cm`,
      weight: `${pokemon.weight / 10} kg`,
      picUrl: pokemon.sprites.front_default,
      isCorrect: [
        pokemon.name === name,
        pokemon.types[0].type.name === type1,
        (pokemon.types[1]?.type.name === type2 || type2 === "None") &&
          species.habitat?.name === habitat,
        species.habitat?.name === habitat,
        species.color?.name === color,
        stage.toString() === evolutionStage,
        `${pokemon.height * 10} cm` === height,
        `${pokemon.weight / 10} kg` === weight,
      ],
    } as PokemonApi;
  };

  const handleGuess = async () => {
    console.log("answer: ", answer);
    console.log("input: ", input);
    try {
      if (answer === null || hasWon) {
        setGuesses([]);
        const data = await getPokemonData(`${API_BASE_URL}${id}`, answer);
        isDev && console.log("answer: ", data.name);
        setAnswer(data);
      }
      if (!hasWon) {
        const data = await getPokemonData(
          `${API_BASE_URL}${input.toLowerCase()}`,
          answer
        );
        setGuesses([data, ...guesses]);
      }
    } catch (error) {
      alert("Failed to fetch Pokémon");
    } finally {
      setInput("");
    }
  };

  const handleGuess2 = async (name: string) => {
    console.log("answer: ", answer);
    console.log("input: ", name);
    try {
      if (answer === null || hasWon) {
        setGuesses([]);
        //const data = await getPokemonData(`${API_BASE_URL}${id}`, answer);
        //isDev && console.log("answer: ", data.name);
        //setAnswer(data);
      }
      if (!hasWon) {
        const data = await getPokemonData(
          `${API_BASE_URL}${name.toLowerCase()}`,
          answer
        );
        setGuesses([data, ...guesses]);
      }
    } catch (e) {
      alert("Failed to fetch Pokémon");
      console.error(e);
    } finally {
      setInput("");
    }
  };

  useEffect(() => {
    if (hasWon && user?.email.length > 4) {
      const updateUserStreak = async () => {
        console.log("here");
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_URL}api/update/${user.id}`,
            {
              game: "classic",
              guesses: guesses.length,
            }
          );
          console.log("res.data: ", response.data);
          const updatedUser = {
            ...user,
            classicStreak: response.data.data.streak,
            classicGuesses: response.data.data.totalGuesses,
            classicWins: response.data.data.totalWins,
            classicMax: response.data.data.maxStreak,
          };
          setUser(updatedUser);
          console.log(updatedUser);
          if (response.status === 200) {
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

  useEffect(() => {
    const fetchAnswer = async () => {
      const data = await getPokemonData(`${API_BASE_URL}${id}`);
      setAnswer(data);
    };
    fetchAnswer();
  }, []);

  return (
    <div className="flex flex-col justify-around items-center">
      <AnalyticsBar
        game="classic"
        fetchTrigger={fetchTrigger}
        user={user}
        setUser={setUser}
      />
      {guesses.length === 0 && (
        <p className="text-lg md-text-3xl mt-4 flex flex-wrap justify-center items-center">
          Guess a Pokemon to begin! You will receive hints about the Pokémon's
          attributes following each incorrect guess.
        </p>
      )}
      {hasWon ? (
        <>
          <img
            className="h-[200px] w-[200px] md:h-[350px] md:w-[350px] lg:h-[500px] lg:w-[500px]"
            src={answer?.picUrl}
          />
          <WinMsg guesses={guesses.length} />
        </>
      ) : (
        <GuessInput
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          handleGuess2={(name) => handleGuess2(name)}
        />
      )}
      <div className="grid grid-cols-8 gap-10">
        {Object.entries(ColumnHead).map(([key, val]) => (
          <div className="my-5 mx-1" key={key}>
            {val}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-around">
        {guesses.map((guess, idx) => (
          <Row key={`${idx}-${guess.name}`} {...guess} />
        ))}
      </div>
    </div>
  );
};

export default Classic;
