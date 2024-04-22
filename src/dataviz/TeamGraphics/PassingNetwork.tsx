import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { pitch } from "d3-soccer";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { fetchPassingNetworkData } from "../../hooks/getPassingNetworkData";
import {
  TTeamForNetworkData,
  alterTeamName,
  teamColorMapping,
} from "../../utils/dataUtils";
import { useAuth } from "../../context/AuthContext";
import {
  IAverageLocation,
  IPassBetween,
  IPassingNetworkData,
  TTeam,
  TTopSixTeam,
  TVenue,
} from "../../types";

interface IPassingNetworkProps {
  homeTeam: TTeamForNetworkData;
  awayTeam: TTeamForNetworkData;
  venue: TVenue;
}

const PassingNetwork = ({
  homeTeam,
  awayTeam,
  venue,
}: IPassingNetworkProps) => {
  const { team } = useAuth();
  const chartRef = useRef(null);
  const h = 500;

  const pitchConfig = pitch()
    .height(h)
    .clip([
      [0, 0],
      [68, 105],
    ])
    .goals("line")
    .rotate(true)
    .showDirOfPlay(true)
    .shadeMiddleThird(false);

  homeTeam = alterTeamName(homeTeam);
  awayTeam = alterTeamName(awayTeam);

  const { data, isLoading, error } = fetchPassingNetworkData({
    team,
    homeTeam,
    awayTeam,
    venue,
  });

  const passNetworkChart = () => {
    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    const handleMouseOver = (
      event: React.MouseEvent<HTMLButtonElement>,
      d: IAverageLocation
    ) => {
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "absolute bg-black text-white text-xs rounded p-2 z-10")
        .html(`
                <p>Player Name: ${d.name}</p>
                <p>Total Passes: ${d.count}</p>
              `);
      tooltip
        .style("top", event.pageY + "px")
        .style("left", event.pageX + "px");
    };

    const handleMouseOut = () => {
      d3.selectAll("#tooltip").remove();
    };

    svg.call(pitchConfig);

    // Select the pitch SVG container
    const pitchSvg = svg.select("#pitch");

    if (!data || data?.average_locations.length === 0) {
      pitchSvg
        .append("text")
        .attr("class", "message-text")
        .attr("y", 40)
        .attr("x", 105 / 2)
        .text("GAME YET TO BE PLAYED")
        .attr("font-size", "4px")
        .attr("transform", "rotate(90, 68, 25)")
        .attr("fill", "white");
      return;
    }

    const averageLocations = data?.average_locations;
    const passBetween = data?.pass_between;

    // Plot average locations (circles) on the pitch

    const maxPassCount = 10;
    const minPassCount = 3;

    const passLines = pitchSvg
      .selectAll(".line")
      .data(passBetween)
      .enter()
      .append("g")
      .attr("class", "pass-line");

    passLines
      .append("line")
      .attr("x1", (d: IPassBetween) => d.x * 1.05)
      .attr("y1", (d: IPassBetween) => (100 - d.y) * 0.68)
      .attr("x2", (d: IPassBetween) => d.x_end * 1.05)
      .attr("y2", (d: IPassBetween) => (100 - d.y_end) * 0.68)
      .style("stroke", (d: IPassBetween) => {
        // Determine line color based on pass_count
        const passCount = d.pass_count;
        if (passCount > maxPassCount) {
          return "whitesmoke";
        } else if (passCount > minPassCount) {
          return "whitesmoke";
        } else if (passCount > 0) {
          return "whitesmoke";
        } else {
          return "transparent"; // Hide lines with pass_count less than 3
        }
      })
      .style("stroke-width", (d: IPassBetween) => {
        // Determine line thickness based on pass_count
        const passCount = d.pass_count;
        if (passCount > maxPassCount) {
          return 1;
        } else if (passCount > minPassCount) {
          return 0.3;
        } else if (passCount > 0) {
          return 0.1;
        } else {
          return 0; // Hide lines with pass_count less than 3
        }
      });

    const circleRadius = 4;
    const circleColor = teamColorMapping[team].color;
    const circleBorderWidth = 0.3;
    const circleBorderDash = 1;
    const circleBorderColor = team === "Tottenham" ? "black" : "white";
    const shirtNumberColor = team === "Tottenham" ? "black" : "white";
    const shirtFontSize = 2;

    const playerCircles = pitchSvg
      .selectAll(".line")
      .data(averageLocations)
      .enter()
      .append("g")
      .attr("class", "player-location")
      .attr(
        "transform",
        (d: IAverageLocation) =>
          `translate(${d.x * 1.05}, ${(100 - d.y) * 0.68})`
      );

    playerCircles
      .append("circle")
      .attr("r", circleRadius)
      .attr("fill", circleColor)
      .attr("stroke", circleBorderColor)
      .attr("stroke-width", circleBorderWidth)
      .attr("stroke-dasharray", circleBorderDash)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    playerCircles
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", shirtNumberColor)
      .attr("font-size", shirtFontSize)
      .attr("transform", "rotate(90)")
      .text((d: IAverageLocation) => d.shirtNo);
  };

  useEffect(() => {
    passNetworkChart();
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div
      className="border-2 min-h-500"
      style={{ borderColor: `${teamColorMapping[team]?.color}` }}
    >
      <h2 className="text-white text-2xl font-bold m-4 mx-auto text-center">
        Passing Network
      </h2>
      <div id="chart" ref={chartRef} className="flex justify-center mt-8" />
    </div>
  );
};

export default PassingNetwork;
