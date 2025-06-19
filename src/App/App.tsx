import { useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(2);
  
  return (
    <div className="app">
      <div className="check_orientation">
        <p>Переверните устройство!</p>
      </div>
      <Pleer />
      <MainMenu difficult={difficult} setDifficult={setDifficult}/>
      <Battle difficult={difficult} />
    </div>
  );
}

export default App;
