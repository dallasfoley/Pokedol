import { PokemonApi } from "../lib/types";
import Square from "./Square";

const Row = ({
  name,
  type1,
  type2,
  habitat,
  color,
  evolutionStage,
  height,
  weight,
  isCorrect,
}: PokemonApi) => {
  const attributes = [
    name,
    type1,
    type2,
    habitat,
    color,
    evolutionStage,
    height,
    weight,
  ];

  return (
    <div className="grid grid-cols-8 gap-10 my-5">
      {attributes.map((attribute, index) => (
        <Square key={index} info={attribute} isCorrect={isCorrect[index]} />
      ))}
    </div>
  );
};

export default Row;
