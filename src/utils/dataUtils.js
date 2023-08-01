export const alterTeamName = (teamName) => {
    if (teamName === 'Manchester City') return 'Man City'
    if (teamName === 'Manchester United') return 'Man Utd'
    return teamName
}