import { useState } from "react";

import Guild from "./Guild/Guild";
import type { quest } from "./Guild/Quest";

import "./City.scss";

interface type {
  setQuest: (quest: quest) => void;
  setShowCity: (boolean: boolean) => void;
  allGold: number;
}

export default function City({ setShowCity, allGold, setQuest }: type) {
    const [showGuild, setShowGuild] = useState<boolean>(false);

  return (
    <div className="city">
      {showGuild && <Guild setShowGuild={setShowGuild} setQuest={setQuest}/>}
      <div className="city_map_all">
        <img className="city_map" src="/city/city.png" alt="" />
        <div onClick={() => setShowCity(false)} className="train">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/train.png" alt="" />
        </div>
        <div onClick={() => alert("Ваше золото: " + allGold)} className="bank">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/bank.png" alt="" />
        </div>
        <div className="mage">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/mage.png" alt="" />
        </div>
        <div onClick={() => setShowGuild(true)} className="guild">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/guild.png" alt="" />
        </div>
      </div>
    </div>
  );
}
