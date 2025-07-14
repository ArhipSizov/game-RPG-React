import { useEffect, useState } from "react";

import Battle from "../Components/Battle/Battle";
import Pleer from "../Components/Pleer/Pleer";
import MainMenu from "../Components/MainMenu/MainMenu";
import Map from "../Components/Map/Map";
import Instruction from "../Components/Instruction/Instruction";
import City from "../Components/City/City";

import type { Character } from "../Components/Battle/interfaceCharacter";
import type { quest } from "../Components/City/Guild/Quest";

import "./App.scss";

function App() {
  const [difficult, setDifficult] = useState<number>(1);
  const [difficultGame, setDifficultGame] = useState<number>(1);
  const [allGold, setAllGold] = useState<number>(Number(localStorage.gold));
  const [allFavor, setAllFavor] = useState<number>(Number(localStorage.favor));
  const [turn, setTurn] = useState<number>(Number(localStorage.turn));
  const [showMap, setShowMap] = useState<boolean>(true);
  const [showCity, setShowCity] = useState<boolean>(false);
  const [allInstruction, setAllInstruction] = useState<boolean[]>([true, true]);
  const [earningsGold, setEarningsGold] = useState<number>(
    Number(localStorage.earningsGold)
  );
  const [showQuest, setShowQuest] = useState<boolean>(true);
  const [quest, setQuest] = useState<quest>();
  const [isReset, setIsReset] = useState<boolean>(false);

  //ally
  const [AllyTest] = useState<Character>({
    id: "1",
    lv: 0,
    exp: 0,
    name: "none",
    hp: 20,
    maxHp: 20,
    defaultDamage: 0,
    description: "",
    difficult: 0,
    effect: [],
    skills: [
      {
        id: "1",
        name: "Firebol",
        position: ["1"],
        effect: ["1"],
        min_damage: 1,
        max_damage: 1,
        description:
          "very long textvery long textvery long textvery long textvery long textvery long text",
        crit: 0,
        health: false,
      },
    ],
  });

  const [allAlly, setAllAlly] = useState<Character[]>([AllyTest]);
  //save
  useEffect(() => {
    if (localStorage.allAlly) {
      if (eval(localStorage.allAlly).length == 4) {
        const oldAlly = eval(localStorage.allAlly);
        setTimeout(() => {
          localStorage.allAlly = JSON.stringify(oldAlly);
          setAllAlly(oldAlly);
          setTurn(turn + 1);
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    if (
      isReset == true ||
      localStorage.turn == "NaN" ||
      localStorage.turn == undefined
    ) {
      setIsReset(false);
      localStorage.gold = 0;
      setAllGold(0);
      localStorage.turn = 0;
      setTurn(0);
      localStorage.favor = 0;
      setAllFavor(0);
      localStorage.earningsGold = -4;
      setEarningsGold(-4);
      localStorage.allAlly = JSON.stringify([AllyTest]);
      setAllAlly([AllyTest]);
    }
  }, [isReset]);

  function save() {
    localStorage.turn = turn;
    localStorage.gold = allGold;
    localStorage.favor = allFavor;
    localStorage.earningsGold = earningsGold;
    localStorage.allAlly = JSON.stringify(allAlly);
  }

  // time

  useEffect(() => {
    if (quest) {
      quest.time = quest.time - 1;
      if (quest.time <= 0) {
        setQuest(undefined);
      }
    }
  }, [turn]);

  useEffect(() => {
    setAllGold(allGold + earningsGold);
    save();
  }, [Math.floor(turn / 24)]);

  return (
    <div className="app">
      <p className="fast_save" onClick={() => save()}>
        Быстр. сохр
      </p>
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
        setShowCity={setShowCity}
        difficultGame={difficultGame}
        setDifficultGame={setDifficultGame}
        setIsReset={setIsReset}
      />
      <Battle
        difficult={difficult}
        setAllGold={setAllGold}
        allGold={allGold}
        turn={turn}
        setTurn={setTurn}
        quest={quest}
        setQuest={setQuest}
        difficultGame={difficultGame}
        allFavor={allFavor}
        setAllFavor={setAllFavor}
        allAlly={allAlly}
        setAllAlly={setAllAlly}
        showCity={showCity}
        showMap={showMap}
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
          allAlly={allAlly}
          turn={turn}
          setTurn={setTurn}
        />
      )}
    </div>
  );
}

export default App;
