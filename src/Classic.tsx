import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Row from "./Row";
import { PokemonApi } from "./Row";

const Classic = () => {
  const [input, setInput] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState<PokemonApi[]>([]);
  const [answer, setAnswer] = useState<PokemonApi | null>(null);
  const [answerPic, setAnswerPic] = useState("");
  const [state, setState] = useState(false);

  const handleGuess = async () => {
    if (state === false) {
      try {
        const rawData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
        );
        const data = await rawData.json();
        setGuessCount(guessCount + 1);
        const speciesUrl = data.species.url;
        const speciesRawData = await fetch(speciesUrl);
        const speciesData = await speciesRawData.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainRawData = await fetch(evolutionChainUrl);
        const evolutionChainData = await evolutionChainRawData.json();
        let evolutionStage;
        const evolvesFrom = speciesData.evolves_from_species;
        const firstEvolution = evolutionChainData.chain;

        if (!evolvesFrom && firstEvolution.evolves_to.length > 0) {
          evolutionStage = "1";
        } else if (
          evolvesFrom &&
          firstEvolution.evolves_to.length > 0 &&
          firstEvolution.evolves_to[0].evolves_to.length > 0
        ) {
          evolutionStage = "2";
        } else {
          evolutionStage = "3";
        }
        const pokemonData = {
          name: data.name,
          type1: data.types.length > 0 ? data.types[0].type.name : "None",
          type2: data.types.length > 1 ? data.types[1].type.name : "None",
          habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
          color: speciesData.color ? speciesData.color.name : "Unknown",
          evolutionStage: evolutionStage, // Placeholder, determining this would require additional logic
          height: `${data.height * 10} cm`,
          weight: `${data.weight / 10} kg`,
          isCorrect: [
            answer && data.name === answer.name ? true : false,
            answer && data.types[0].type.name === answer.type1 ? true : false,
            (answer &&
              data.types.length > 1 &&
              data.types[1].type.name === answer.type2) ||
            (data.types.length === 1 && answer?.type2 === "None")
              ? true
              : false,
            answer && speciesData.habitat.name === answer.habitat
              ? true
              : false,
            answer && speciesData.color.name === answer.color ? true : false,
            answer && evolutionStage === answer.evolutionStage ? true : false,
            answer && `${data.height * 10} cm` === answer.height ? true : false,
            answer && `${data.weight / 10} kg` === answer.weight ? true : false,
          ],
        };

        setGuesses([pokemonData, ...guesses]);
        answer && data.name === answer.name && setState(true);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Pokémon");
      }
    }
  };

  useEffect(() => {
    const getAnswer = async () => {
      const id = Math.floor(Math.random() * 151);
      try {
        const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await rawData.json();
        const speciesUrl = data.species.url;
        const speciesRawData = await fetch(speciesUrl);
        const speciesData = await speciesRawData.json();
        setAnswerPic(data.sprites.front_default);
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionChainRawData = await fetch(evolutionChainUrl);
        const evolutionChainData = await evolutionChainRawData.json();
        let evolutionStage;
        const evolvesFrom = speciesData.evolves_from_species;
        const firstEvolution = evolutionChainData.chain;

        if (!evolvesFrom && firstEvolution.evolves_to.length > 0) {
          evolutionStage = "1";
        } else if (
          evolvesFrom &&
          firstEvolution.evolves_to.length > 0 &&
          firstEvolution.evolves_to[0].evolves_to.length > 0
        ) {
          evolutionStage = "2";
        } else {
          evolutionStage = "3";
        }
        const pokemonData = {
          name: data.name,
          type1: data.types.length > 0 ? data.types[0].type.name : "None",
          type2: data.types.length > 1 ? data.types[1].type.name : "None",
          habitat: speciesData.habitat ? speciesData.habitat.name : "Unknown",
          color: speciesData.color ? speciesData.color.name : "Unknown",
          evolutionStage: evolutionStage, // Placeholder, determining this would require additional logic
          height: `${data.height * 10} cm`,
          weight: `${data.weight / 10} kg`,
          isCorrect: [false],
        };
        setAnswer(pokemonData);
        console.log(pokemonData.name);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch Answer Pokémon, reload page");
      }
    };
    getAnswer();
  }, []);

  return (
    <>
      <div className="Classic">
        <div className="wrapper">
          <div className="pokegames-logo">
            <Link to="/">PokeGames</Link>
          </div>
          <div className="input-group">
            <input
              className="guess-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Pokemon name..."
            ></input>
            <button className="guess-button" onClick={() => handleGuess()}>
              Guess
            </button>
          </div>
          {guessCount !== 0 ? null : (
            <div style={{ fontSize: "20px" }}>Guess a Pokemon to begin</div>
          )}
          {state && (
            <div className="win">
              Congratulations! It took you {guessCount}{" "}
              {guessCount === 1 ? "guess" : "guesses"} to correctly guess the
              Pokemon!
              <img className="classic-img" src={answerPic}></img>
            </div>
          )}
          {guessCount > 0 && (
            <div className="attributes-header">
              <div>Name</div>
              <div>Type 1</div>
              <div>Type 2</div>
              <div>Habitat</div>
              <div>Color</div>
              <div>Stage</div>
              <div>Height</div>
              <div>Weight</div>
            </div>
          )}
          {guesses.map((guess) => (
            <Row {...guess} key={guess.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Classic;
