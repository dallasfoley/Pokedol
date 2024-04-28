import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonApi } from "../lib/types";
import Row from "../components/Row";
import InputGuess from "../components/GuessInput";

const isDev = import.meta.env.MODE === "development";
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

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

const getPokemonData = async (
  url: string,
  answer: PokemonApi | null = null
) => {
  const pokemonResponse = await fetch(url);
  const pokemon = await pokemonResponse.json();

  const speciesResponse = await fetch(pokemon.species.url);
  const species = await speciesResponse.json();

  const evolutionChainResponse = await fetch(species.evolution_chain.url);
  const evolutionChain = await evolutionChainResponse.json();

  const { name, type1, type2, habitat, color, evolutionStage, height, weight } =
    answer || {};

  const newEvoState =
    (species.evolves_from_species ? 1 : 0) +
    (evolutionChain.chain.evolves_to.length > 0 ? 1 : 0) +
    (evolutionChain.chain.evolves_to[0].evolves_to.length > 0
      ? 1
      : 0
    ).toString();

  return {
    name: pokemon.name,
    type1: pokemon.types[0].type.name,
    type2: pokemon.types[1]?.type.name || "None",
    habitat: species.habitat?.name || "Unknown",
    color: species.color?.name || "Unknown",
    evolutionStage: newEvoState,
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
      newEvoState === evolutionStage,
      `${pokemon.height * 10} cm` === height,
      `${pokemon.weight / 10} kg` === weight,
    ],
  } as PokemonApi;
};

const Classic = () => {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<PokemonApi[]>([]);
  const [answer, setAnswer] = useState<PokemonApi | null>(null);
  const darkTheme = useContext(ThemeContext).darkTheme;
  const randomPokemonId = Math.floor(Math.random() * 151);

  const hasWon = guesses.length > 0 && guesses[0].name === answer?.name;

  const handleGuess = async () => {
    console.log("answer: ", answer);
    console.log("input: ", input);
    try {
      if (answer === null || hasWon) {
        setGuesses([]);
        const data = await getPokemonData(
          `${API_BASE_URL}${randomPokemonId}`,
          answer
        );
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
        const data = await getPokemonData(
          `${API_BASE_URL}${randomPokemonId}`,
          answer
        );
        isDev && console.log("answer: ", data.name);
        setAnswer(data);
      }
      if (!hasWon) {
        const data = await getPokemonData(
          `${API_BASE_URL}${name.toLowerCase()}`,
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

  return (
    <div style={{ backgroundColor: darkTheme ? "#2f3133" : "#f0f0f0" }}>
      <div className="wrapper">
        <InputGuess
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          handleGuess2={(name) => handleGuess2(name)}
        />
        {hasWon && (
          <div className="win">
            Congratulations! It took you {guesses.length} guess
            {guesses.length !== 1 && "es"} to correctly guess the Pokemon!
            <img className="classic-img" src={answer?.picUrl} />
          </div>
        )}
        <div className="attributes-header">
          {Object.entries(ColumnHead).map(([key, val]) => (
            <div key={key}>{val}</div>
          ))}
        </div>
        {guesses.length === 0 && (
          <p
            style={{
              fontSize: "20px",
              color: darkTheme ? "#ffffff" : "#2f3133",
            }}
          >
            Guess a Pokemon to begin
          </p>
        )}
        {guesses.map((guess, idx) => (
          <Row key={`${idx}-${guess.name}`} {...guess} />
        ))}
      </div>
    </div>
  );
};

export default Classic;
