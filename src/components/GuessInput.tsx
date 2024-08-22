import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { names } from "../lib/constants";
import SearchIcon from "@mui/icons-material/Search";

const GuessInput = ({
  input,
  setInput,
  handleGuess,
  handleGuess2,
}: {
  input: string;
  setInput: (value: string) => void;
  handleGuess: () => void;
  handleGuess2: (name: string) => void;
}) => {
  const { darkTheme } = useContext(ThemeContext);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let newValue = event.target.value;
    setInput(newValue);
    newValue = event.target.value.toLowerCase();
    const newFilter = names.filter((value) => {
      return value.toLowerCase().includes(newValue.toLowerCase());
    });
    newValue === "" ? setFilteredData([]) : setFilteredData(newFilter);
  };

  return (
    <div className="flex flex-col">
      <div className="flex m-10">
        <input
          className={`p-4 mr-3 h-14 w-56 rounded-2xl ${
            darkTheme
              ? "bg-slate-200 text-slate-900"
              : "bg-slate-900 text-slate-200"
          }`}
          value={input}
          onChange={(e) => handleFilter(e)}
          placeholder="Type Pokemon name..."
          onKeyDown={(e) => e.key === "Enter" && handleGuess()}
          style={{
            background: darkTheme ? "#ebfffc" : "#2f3133",
            color: darkTheme ? "#2f3133" : "#f0f0f0",
          }}
        />
        <button
          className={`rounded-2xl h-14 w-14 ml-3 transition duration-300 hover:scale-110`}
          onClick={handleGuess}
          style={{
            color: darkTheme ? "#2f3133" : "#ebfffc",
            background: darkTheme ? "#ebfffc" : "#2f3133",
          }}
        >
          <SearchIcon />
        </button>
      </div>
      {filteredData.length > 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((name, key) => (
            <button
              className="dataItem"
              onClick={() => {
                setInput(name);
                handleGuess2(name);
              }}
              key={key}
              style={{
                color: darkTheme ? "#2f3133" : "#ebfffc",
                background: darkTheme ? "#ebfffc" : "#2f3133",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuessInput;
