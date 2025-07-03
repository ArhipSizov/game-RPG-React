import { useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";
import Map from "../Components/Map/Map";
import Instruction from "../Components/Instruction/Instruction";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(1);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showChooseAlly, setShowChooseAlly] = useState<boolean>(false);
  const [allInstruction, setAllInstruction] = useState<boolean[]>([true, true]);

  return (
    <div className="app">
      <div className="check_orientation">
        <p>Переверните устройство!</p>
      </div>
      <Instruction
        setShowMap={setShowMap}
        allInstruction={allInstruction}
        setAllInstruction={setAllInstruction}
      />
      <Pleer />
      <Map
        setDifficult={setDifficult}
        showMap={showMap}
        setShowMap={setShowMap}
      />
      <MainMenu
        difficult={difficult}
        setShowMap={setShowMap}
        setAllInstruction={setAllInstruction}
        setShowChooseAlly={setShowChooseAlly}
      />
      <Battle
        difficult={difficult}
        showChooseAlly={showChooseAlly}
        setShowChooseAlly={setShowChooseAlly}
      />
    </div>
  );
}

export default App;
