// import { Box, ScrollView } from 'native-base';
// import React, { useEffect } from 'react';
// import { fetchTeamDetails } from '../api/sportsApi';
// import { Loading } from '../components/common/Loading';
// import { MatchesList } from '../components/team/MatchesList';
// import { PlayersList } from '../components/team/PlayersList';
// import { StatsCard } from '../components/team/StatsCard';
// import { TeamHeader } from '../components/team/TeamHeader';
// import { useApi } from '../hooks/useApi';

// export const TeamScreen = ({ teamId = 1 }) => {
//   const { data: team, isLoading, execute: loadTeam } = useApi(() => fetchTeamDetails(teamId), null, false);
  
//   useEffect(() => {
//     loadTeam();
//   }, [teamId, loadTeam]);
  
//   if (isLoading || !team) {
//     return <Loading message="Cargando información del equipo..." />;
//   }

//   return (
//     <ScrollView>
//       <Box>
//         <TeamHeader 
//           name={team.name}
//           logo={team.logo}
//           position={team.position}
//           stats={`${team.wins}G ${team.draws}E ${team.losses}P`}
//         />
        
//         <Box p={4}>
//           <StatsCard 
//             wins={team.wins}
//             draws={team.draws}
//             losses={team.losses}
//           />
          
//           <PlayersList players={team.players} />
          
//           <MatchesList matches={team.upcoming_matches} />
//         </Box>
//       </Box>
//     </ScrollView>
//   );
// };