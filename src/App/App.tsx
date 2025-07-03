import { useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";
import Map from "../Components/Map/Map";
import Instruction from "../Components/Instruction/Instruction";
import City from "../Components/City/City";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(1);
  const [allGold, setAllGold] = useState<number>(0);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showChooseAlly, setShowChooseAlly] = useState<boolean>(false);
  const [showCity, setShowCity] = useState<boolean>(false);
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
        setShowCity={setShowCity}
      />
      <MainMenu
        difficult={difficult}
        setShowMap={setShowMap}
        setAllInstruction={setAllInstruction}
        setShowChooseAlly={setShowChooseAlly}
        setShowCity={setShowCity}
      />
      <Battle
        difficult={difficult}
        showChooseAlly={showChooseAlly}
        setShowChooseAlly={setShowChooseAlly}
        setAllGold={setAllGold}
        allGold={allGold}
      />
      {showCity && <City setShowCity={setShowCity} allGold={allGold} />}
    </div>
  );
}

export default App;
