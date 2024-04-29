const WinMsg = ({ guesses }: { guesses: number }) => {
  return (
    <div className="text-xl md:text-3xl mt-10">
      Congratulations! It took you {guesses} guess
      {guesses !== 1 && "es"} to correctly guess the Pokemon!
    </div>
  );
};

export default WinMsg;
