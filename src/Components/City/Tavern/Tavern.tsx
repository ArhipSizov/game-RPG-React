import { useState } from "react";

import "./Tavern.scss";
import ChooseAlly from "./ChooseAlly/ChooseAlly";

import type { Character } from "../../Battle/interfaceCharacter";

interface type {
  setShowTavern: (boolean: boolean) => void;
  allAlly: Character[];
  allGold: number;
  setAllGold: (number: number) => void;
}

export default function Tavern({
  setShowTavern,
  allAlly,
  allGold,
  setAllGold,
}: type) {
  const [showChooseAlly, setShowChooseAlly] = useState<boolean>(false);

  return (
    <div onClick={() => setShowTavern(false)} className="tavern_open_back">
      <div onClick={(event) => event.stopPropagation()} className="tavern_open">
        <img className="background_img" src="/city/tavern/tavern.png" alt="" />
        <div
          onClick={() => setShowChooseAlly(true)}
          className="choose_ally_img"
        >
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/tavern/choose_ally.png" alt="" />
        </div>
        {showChooseAlly && (
          <ChooseAlly
            allAlly={allAlly}
            setShowChooseAlly={setShowChooseAlly}
            allGold={allGold}
            setAllGold={setAllGold}
          />
        )}
      </div>
    </div>
  );
}
