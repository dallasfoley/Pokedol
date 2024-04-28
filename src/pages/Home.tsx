import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        className={` w-full min-h-screen flex flex-col justify-around items-center text-white`}
      >
        <Link
          to="/classic"
          className={`text-2xl md:text-4xl w-72 h-36 rounded-xl bg-slate-950 
          flex justify-center items-center transition duration-300 hover:scale-110`}
        >
          Classic
        </Link>
        <Link
          to="/blurry"
          className={`text-2xl md:text-4xl w-72 h-36 rounded-xl bg-slate-950 
          flex justify-center items-center transition duration-300 hover:scale-110`}
        >
          Blurry
        </Link>
        <Link
          to="/zoomed"
          className={`text-2xl md:text-4xl w-72 h-36 rounded-xl bg-slate-950 
          flex justify-center items-center transition duration-300 hover:scale-110`}
        >
          Zoomed
        </Link>
      </div>
    </>
  );
};

export default Home;
