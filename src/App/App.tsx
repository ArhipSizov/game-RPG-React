import { useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";
import Map from "../Components/Map/Map";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(2);
  const [showMap, setShowMap] = useState<boolean>(true);
  
  return (
    <div className="app">
      <div className="check_orientation">
        <p>Переверните устройство!</p>
      </div>
      <Pleer />
      <Map setDifficult={setDifficult} showMap={showMap} setShowMap={setShowMap}/>
      <MainMenu difficult={difficult} setShowMap={setShowMap}/>
      <Battle difficult={difficult} />
    </div>
  );
}

export default App;
