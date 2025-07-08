import { useEffect, useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";
import Map from "../Components/Map/Map";
import Instruction from "../Components/Instruction/Instruction";
import City from "../Components/City/City";

import type { quest } from "../Components/City/Guild/Quest";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(1);
  const [difficultGame, setDifficultGame] = useState<number>(1);
  const [allGold, setAllGold] = useState<number>(4);
  const [allFavor, setAllFavor] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showChooseAlly, setShowChooseAlly] = useState<boolean>(false);
  const [showCity, setShowCity] = useState<boolean>(false);
  const [allInstruction, setAllInstruction] = useState<boolean[]>([true, true]);
  const [earningsGold, setEarningsGold] = useState<number>(-4);

  // time
  const [showQuest, setShowQuest] = useState<boolean>(true);
  const [quest, setQuest] = useState<quest>();

  useEffect(() => {
    if (quest) {
      quest.time = quest.time - 1;
      if (quest.time <= 0) {
        setQuest(undefined);
      }
    }
    if (Math.floor(turn / 24) == turn / 24) {
      setAllGold(allGold + earningsGold);
    }
  }, [turn]);

  return (
    <div className="app">
      <img
        onClick={() => setShowMap(true)}
        className="litl_map"
        src="/map.png"
        alt=""
      />
      {quest &&
        ((showQuest && (
          <div onClick={() => setShowQuest(false)} className="quest_now">
            <h2>Скрыть поручение</h2>
            <p>Победить {quest.enemy_name}</p>
            <p>Осталось победить {quest.enemy_count}</p>
            <p>Осталось часов {quest.time}</p>
          </div>
        )) || (
          <div className="quest_now">
            <h2 onClick={() => setShowQuest(true)}>Увидеть поручение</h2>
          </div>
        ))}
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
        difficultGame={difficultGame}
        setDifficultGame={setDifficultGame}
      />
      <Battle
        difficult={difficult}
        showChooseAlly={showChooseAlly}
        setShowChooseAlly={setShowChooseAlly}
        setAllGold={setAllGold}
        allGold={allGold}
        turn={turn}
        setTurn={setTurn}
        quest={quest}
        setQuest={setQuest}
        difficultGame={difficultGame}
        allFavor={allFavor}
        setAllFavor={setAllFavor}
      />
      {showCity && (
        <City
          setShowCity={setShowCity}
          allGold={allGold}
          setQuest={setQuest}
          allFavor={allFavor}
          setAllGold={setAllGold}
          earningsGold={earningsGold}
          setEarningsGold={setEarningsGold}
        />
      )}
    </div>
  );
}

export default App;
