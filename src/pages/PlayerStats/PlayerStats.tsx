import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import teams from "../../data/team";
import PlayerCards from "../../dataviz/PlayerGraphics/PlayerCards";
import PlayerEventMap from "../../dataviz/PlayerGraphics/PlayerEventMap";
import PlayerReport from "../../dataviz/PlayerGraphics/PlayerReport";
import { fetchPlayerData } from "../../hooks/getPlayersData";
import { TTeam, TVenue } from "../../types";

interface ISelectedData {
  player: string;
  oppositionTeam: TTeam;
  venue: TVenue;
}

const PlayerStats = () => {
  const { team } = useAuth();
  const { data } = fetchPlayerData({ team });
  const [selectedData, setSelectedData] = useState<ISelectedData>({
    player: data && data?.length > 0 ? data[0].name : "",
    oppositionTeam: "Aston Villa",
    venue: "Home",
  });

  useEffect(() => {
    if (data) {
      setSelectedData((prevData) => ({
        ...prevData,
        player: data[0].name,
      }));
    }
  }, [data]);

  const playerData = data?.filter(
    (players) => players.name === selectedData.player
  )[0];

  const homeTeam =
    selectedData.venue === "Home" ? team : selectedData.oppositionTeam;
  const awayTeam =
    selectedData.venue === "Away" ? team : selectedData.oppositionTeam;

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen">
      <PlayerCards />
      <h1 className="text-white text-4xl font-bold mt-12 mb-6 mx-auto underline underline-offset-4 text-center">
        PLAYER DATA VISUALIZATIONS
      </h1>
      <div className="flex flex-col justify-between items-center items-between m-4 sm:flex-row sm:justify-center">
        <div>
          <h3 className="text-white text-xl text-center font-bold mb-2">
            Player
          </h3>
          <select
            className="px-1 py-2 text-center border border-gray-400 rounded-lg shadow-md hover:cursor-pointer mr-4"
            name="player"
            value={selectedData.player}
            onChange={handleInputChange}
          >
            {data?.map((player) => {
              return (
                <option className="bg-gray-800 hover:cursor-pointer text-white">
                  {player.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className="text-white text-xl text-center font-bold mb-2 mt-4 sm:mt-0">
            Against
          </h3>
          <select
            className="px-4 py-2 text-center border border-gray-400 rounded-lg shadow-md hover:cursor-pointer"
            name="oppositionTeam"
            value={selectedData.oppositionTeam}
            onChange={handleInputChange}
          >
            {teams.map((squad) => {
              return squad !== team ? (
                <option className="bg-gray-800 hover:cursor-pointer text-white">
                  {squad}
                </option>
              ) : null;
            })}
          </select>
        </div>
        <div className="sm:ml-4 ml-0 mt-4 sm:mt-0">
          <h3 className="text-white text-xl text-center font-bold mb-2">
            Venue
          </h3>
          <select
            className="px-12 py-2 border border-gray-400 rounded-lg shadow-md hover:cursor-pointer"
            name="venue"
            value={selectedData.venue}
            onChange={handleInputChange}
          >
            <option className="bg-gray-800 hover:cursor-pointer text-white">
              Home
            </option>
            <option className="bg-gray-800 hover:cursor-pointer text-white">
              Away
            </option>
          </select>
        </div>
      </div>
      {playerData ? (
        <div className="flex flex-col items-center sm:flex-row justify-center p-4 text-white">
          <p>{playerData.name}</p>
          <span>|</span>
          <p> Position: {playerData.position} </p>
          <span>|</span>
          <p> Minutes Played: {playerData.minutes}</p>
        </div>
      ) : null}
      <div className="grid sm:grid-cols-2 gap-8 md:grid-cols-1">
        <PlayerReport
          player={selectedData.player}
          position={playerData?.position}
        />
        <PlayerEventMap
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          venue={selectedData.venue}
          player={selectedData.player}
        />
      </div>
    </div>
  );
};

export default PlayerStats;
