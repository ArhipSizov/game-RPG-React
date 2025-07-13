import { useState } from "react";
import type { quest } from "./Guild/Quest";
import type { Character } from "../Battle/interfaceCharacter";

import Guild from "./Guild/Guild";
import Castle from "./Castle/Castle";
import Tavern from "./Tavern/Tavern";

import "./City.scss";

interface type {
  setQuest: (quest: quest) => void;
  setShowCity: (boolean: boolean) => void;
  allGold: number;
  allFavor: number;
  setAllGold: (number: number) => void;
  setEarningsGold: (number: number) => void;
  earningsGold: number;
  allAlly: Character[];
  setTurn: (number: number) => void;
}

export default function City({
  setShowCity,
  allGold,
  setQuest,
  setAllGold,
  allFavor,
  earningsGold,
  setEarningsGold,
  allAlly,
  setTurn,
}: type) {
  const [showGuild, setShowGuild] = useState<boolean>(false);
  const [showCastle, setShowCastle] = useState<boolean>(false);
  const [showTavern, setShowTavern] = useState<boolean>(false);

  return (
    <div className="city">
      {showTavern && (
        <Tavern
          setShowTavern={setShowTavern}
          allAlly={allAlly}
          allGold={allGold}
          setAllGold={setAllGold}
          setTurn={setTurn}
        />
      )}
      {showGuild && <Guild setShowGuild={setShowGuild} setQuest={setQuest} />}
      {showCastle && (
        <Castle
          setShowCastle={setShowCastle}
          allGold={allGold}
          allFavor={allFavor}
          setAllGold={setAllGold}
          earningsGold={earningsGold}
          setEarningsGold={setEarningsGold}
        />
      )}
      <div className="city_map_all">
        <img className="city_map" src="/city/city_map/city.png" alt="" />
        <div onClick={() => setShowCity(false)} className="train">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/train.png" alt="" />
        </div>
        <div
          onClick={() =>
            alert(
              "Ваше золото: " +
                allGold +
                "\nВаш пасивный доход: " +
                earningsGold
            )
          }
          className="bank"
        >
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/bank.png" alt="" />
        </div>
        <div className="mage">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/mage.png" alt="" />
        </div>
        <div onClick={() => setShowGuild(true)} className="guild">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/guild.png" alt="" />
        </div>
        <div onClick={() => setShowCastle(true)} className="castle">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/castle.png" alt="" />
        </div>
        <div onClick={() => setShowTavern(true)} className="tavern">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/city_map/tavern.png" alt="" />
        </div>
      </div>
    </div>
  );
}
