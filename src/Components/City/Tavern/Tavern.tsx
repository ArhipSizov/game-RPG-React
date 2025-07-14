import { useState } from "react";

import "./Tavern.scss";
import ChooseAlly from "./ChooseAlly/ChooseAlly";
import Bad from "./Bad/Bad";
import Man from "./Man/Man";

import type { Character } from "../../Battle/interfaceCharacter";

interface type {
  setShowTavern: (boolean: boolean) => void;
  allAlly: Character[];
  allGold: number;
  setAllGold: (number: number) => void;
  turn: number;
  setTurn: (number: number) => void;
}

export default function Tavern({
  setShowTavern,
  allAlly,
  allGold,
  setAllGold,
  turn,
  setTurn,
}: type) {
  const [showChooseAlly, setShowChooseAlly] = useState<boolean>(false);
  const [showBad, setShowBad] = useState<boolean>(false);
  const [showMan, setShowMan] = useState<boolean>(false);

  return (
    <div onClick={() => setShowTavern(false)} className="tavern_open_back">
      <div onClick={(event) => event.stopPropagation()}>
        {showMan && (
          <Man
            setShowMan={setShowMan}
            allGold={allGold}
            setAllGold={setAllGold}
          />
        )}
      </div>
      <div onClick={(event) => event.stopPropagation()} className="tavern_open">
        <img className="background_img" src="/city/tavern/tavern.png" alt="" />
        <div
          onClick={() => setShowChooseAlly(true)}
          className="choose_ally_img"
        >
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/tavern/choose_ally.png" alt="" />
        </div>
        <div onClick={() => setShowBad(true)} className="bad_img">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/tavern/bad.png" alt="" />
        </div>
        <div onClick={() => setShowMan(true)} className="man_img">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/tavern/man.png" alt="" />
        </div>
        {showChooseAlly && (
          <ChooseAlly
            allAlly={allAlly}
            setShowChooseAlly={setShowChooseAlly}
            allGold={allGold}
            setAllGold={setAllGold}
          />
        )}
        {showBad && (
          <Bad setTurn={setTurn} setShowBad={setShowBad} turn={turn} />
        )}
      </div>
    </div>
  );
}
