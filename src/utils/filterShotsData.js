export const filterDataForXGChart = (shotsData, homeTeam, awayTeam) => {
    return shotsData.filter(shot => (shot.h_team === homeTeam) && (shot.a_team === awayTeam))
}

export const calculateCumulativeXG = (shots, teamIndicator) => {
    const filteredShots = shots.filter(shot => shot.h_a === teamIndicator);
    const sortedShots = filteredShots.sort((a, b) => parseInt(a.minute) - parseInt(b.minute));
  
    let cumulativeXG = 0;
    const teamArray = sortedShots.reduce((acc, shot) => {
      cumulativeXG += parseFloat(shot.xG);
      acc.push({
        minute: shot.minute,
        cumulativeXG,
        player: shot.player,
        result: shot.result,
        shotType: shot.shotType,
        situation: shot.situation,
      });
      return acc;
    }, []);
  
    teamArray.unshift({
      minute: '0',
      cumulativeXG: 0,
      player: null,
      result: null,
      shotType: null,
      situation: null,
    });

    if (teamArray.length > 0 && parseInt(teamArray[teamArray.length - 1].minute) < 90) {
        const lastCumulativeXG = teamArray[teamArray.length - 1].cumulativeXG;
        teamArray.push({
          minute: '90',
          cumulativeXG: lastCumulativeXG + 0.001,
          player: null,
          result: null,
          shotType: null,
          situation: null,
        });
    }
  
    return teamArray;
  };