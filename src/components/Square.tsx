const Square = ({
  info,
  isCorrect,
}: {
  info: string | number;
  isCorrect: boolean;
}) => {
  const capitalizeFirstLetter = (info: string | number) => {
    if (typeof info === "string") {
      return info.charAt(0).toUpperCase() + info.slice(1);
    }
    return info;
  };

  return (
    <div
      className={`h-10 w-10 text-sm md:text-md md:h-16 md:w-16 rounded-2xl flex justify-center items-center ${
        isCorrect ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {capitalizeFirstLetter(info)}
    </div>
  );
};

export default Square;
