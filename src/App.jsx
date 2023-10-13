import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import Homepage from './components/Homepage';
import Draftpage from './components/Draftpage';
import Teams from './components/Teams';
import Nuggets from './components/TeamsWest/Nuggets';
import Mavericks from './components/TeamsWest/Mavericks';
import Timberwolves from './components/TeamsWest/Timberwolves';
import Pelicans from './components/TeamsWest/Pelicans';
import Thunder from './components/TeamsWest/Thunder';
import Suns from './components/TeamsWest/Suns';
import Blazers from './components/TeamsWest/Blazers';
import Spurs from './components/TeamsWest/Spurs';
import Lakers from './components/TeamsWest/Lakers';
import Kings from './components/TeamsWest/Kings';
import Jazz from './components/TeamsWest/Jazz';
import Warriors from './components/TeamsWest/Warriors';
import Rockets from './components/TeamsWest/Rockets';
import Clippers from './components/TeamsWest/Clippers';
import Hawks from './components/TeamsEast/Hawks';
import Heat from './components/TeamsEast/Heat';
import Cavaliers from './components/TeamsEast/Cavaliers';
import Bulls from './components/TeamsEast/Bulls';
import Bucks from './components/TeamsEast/Bucks';
import Celtics from './components/TeamsEast/Celtics';
import Seventy6ers from './components/TeamsEast/Seventy6ers'
import Wizards from './components/TeamsEast/Wizards';
import Raptors from './components/TeamsEast/Raptors';
import Pistons from './components/TeamsEast/Pistons';
import Pacers from './components/TeamsEast/Pacers';
import Nets from './components/TeamsEast/Nets';
import Magic from './components/TeamsEast/Magic';
import Knicks from './components/TeamsEast/Knicks';

import Hornets from './components/TeamsEast/Hornets'
import { DateTimeProvider } from './components/DateTimeContext';


function App() {


  return (
    <DateTimeProvider>
    <Routes>
     
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Homepage />} />
      <Route path="/draftpage" element={<Draftpage />} />
      <Route path="/teams" element={<Teams />} />
      

      {/* WEST TEAMS  */}
      <Route path="/teams/Mavericks" element={<Mavericks />} /> 
      <Route path="/teams/Nuggets" element={<Nuggets/>} /> 
      <Route path="/teams/Warriors" element={<Warriors/>} /> 
      <Route path="/teams/Rockets" element={<Rockets/>} /> 
      <Route path="/teams/Clippers" element={<Clippers/>} /> 
      <Route path="/teams/Timberwolves" element={<Timberwolves/>} /> 
      <Route path="/teams/Pelicans" element={<Pelicans/>} /> 
      <Route path="/teams/Thunder" element={<Thunder/>} /> 
      <Route path="/teams/Suns" element={<Suns/>} /> 
      <Route path="/teams/Blazers" element={<Blazers/>} /> 
      <Route path="/teams/Spurs" element={<Spurs/>} /> 
      <Route path="/teams/Lakers" element={<Lakers/>} /> 
      <Route path="/teams/Kings" element={<Kings/>} /> 
      <Route path="/teams/Jazz" element={<Jazz/>} /> 
      {/* EAST TEAMS  */}
      <Route path="/teams/Hawks" element={<Hawks/>} /> 
      <Route path="/teams/Knicks" element={<Knicks/>} /> 
      <Route path="/teams/Magic" element={<Magic/>} /> 
      <Route path="/teams/Nets" element={<Nets/>} /> 
      <Route path="/teams/Pacers" element={<Pacers/>} /> 
      <Route path="/teams/Pistons" element={<Pistons/>} /> 
      <Route path="/teams/Raptors" element={<Raptors/>} /> 
      <Route path="/teams/Wizards" element={<Wizards/>} /> 
      <Route path="/teams/Celtics" element={<Celtics/>} /> 
      <Route path="/teams/76ers" element={<Seventy6ers/>} /> 
      <Route path="/teams/Bucks" element={<Bucks/>} /> 
      <Route path="/teams/Bulls" element={<Bulls/>} /> 
      <Route path="/teams/Cavaliers" element={<Cavaliers/>} /> 
      <Route path="/teams/Heat" element={<Heat/>} /> 
      <Route path="/teams/Hornets" element={<Hornets/>} /> 
      
      
      </Routes>
      </DateTimeProvider>
  );
}

export default App; 
