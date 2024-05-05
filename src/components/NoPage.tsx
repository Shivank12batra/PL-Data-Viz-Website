import red_card from "../assets/red_card.jpg";

const NoPage = () => {
  return (
    <div className="flex flex-column justify-center bg-gradient-to-b from-black to-gray-800 min-h-screen border-2 border-solid border-transparent">
      <div className="mt-32 text-center">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">
          PAGE NOT FOUND!
        </h1>
        <img
          src={red_card}
          alt="Page not found"
          className="w-100 h-100 mx-auto mt-8"
        />
      </div>
    </div>
  );
};

export default NoPage;
