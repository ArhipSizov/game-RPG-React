import { useState } from "react";
import { useSelector } from "react-redux";

import Dialogue from "../../Dialogue/Dialogue";
import castleBD from "./Castle.json";
import startDialogueKing from "./dialogue.json";

import "./Castle.scss";

import type { castleType } from "./CastleType";

import type allData from "../../../Services/TypeAllData";

import type { DialogueType } from "../../Dialogue/DialogueType";

interface state {
  allData: allData;
}

interface type {
  setShowCastle: (boolean: boolean) => void;
  allGold: number;
  allFavor: number;
  setAllGold: (number: number) => void;
  setEarningsGold: (number: number) => void;
  earningsGold: number;
}

export default function Castle({
  setShowCastle,
  allGold,
  allFavor,
  setAllGold,
  earningsGold,
  setEarningsGold,
}: type) {
  const [notEnoughGold, setNotEnoughGold] = useState<boolean>(false);
  const [notEnoughFavor, setNotEnoughFavor] = useState<boolean>(false);
  const [showDialogueKing, setShowDialogueKing] = useState<boolean>(false);
  const [dialogueKingNumber] = useState<number>(6);
  const [dialogueKing, setDialogueKing] = useState<
    DialogueType[][] | undefined
  >(undefined);

  const userArr = useSelector((state: state) => state.allData.allData);

  const [name] = useState<string>(userArr[userArr.length - 1].name);

  if (dialogueKing == undefined) {
    const newArr: castleType[] = [];
    const newDialogueKing = startDialogueKing;
    newDialogueKing[5][0] = {
      text: "Что ты желаешь преобрести?",
      choose: [],
    };
    castleBD.forEach((element) => {
      if (newArr.length < 3 && earningsGold < element.add_gold * 2) {
        newArr.push(element);
        const newElement = { text: "", do: 0, func: false };
        newElement.text =
          element.name +
          " (+" +
          element.add_gold +
          "з. , стоит " +
          element.cost_gold +
          "з. и " +
          element.cost_favor +
          "реп.)";
        newElement.do = element.id;
        if ("choose" in newDialogueKing[5][0]) {
          newDialogueKing[5][0].choose.push(newElement);
        }
      }
    });

    newDialogueKing[7][0].text =
      "В данный момент твоя репутация - " + allFavor + ", " + name;
    setDialogueKing(newDialogueKing);
  }

  function buyFunc(name: string) {
    castleBD.forEach((element) => {
      if (name == element.name) {
        let pass = true;
        if (allFavor < element.cost_favor) {
          pass = false;
          setNotEnoughFavor(true);
          setTimeout(() => {
            setNotEnoughFavor(false);
          }, 5000);
        }
        if (allGold < element.cost_gold) {
          pass = false;
          setNotEnoughGold(true);
          setTimeout(() => {
            setNotEnoughGold(false);
          }, 5000);
        }
        if (pass == true) {
          setAllGold(allGold - element.cost_gold);
          setEarningsGold(earningsGold + element.add_gold);
        } else {
          setShowDialogueKing(false);
        }
      }
    });
  }

  function func(params: number) {
    buyFunc(castleBD[params].name);
  }

  return (
    <div className="castle_open" onClick={() => setShowCastle(false)}>
      <div onClick={(event) => event.stopPropagation()}>
        {showDialogueKing && dialogueKing && (
          <Dialogue
            closeDialogue={setShowDialogueKing}
            img="/city/castle/king.png"
            dialogue={dialogueKing}
            func={func}
            dialogueNumberStart={dialogueKingNumber}
          />
        )}
      </div>
      <div
        className="castle_open_in"
        onClick={(event) => event.stopPropagation()}
      >
        <div onClick={() => setShowDialogueKing(true)} className="king_img">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/castle/king.png" alt="" />
        </div>
        <img className="background_img" src="/city/castle/castle.png" alt="" />
        <h1></h1>
        {notEnoughGold && <p className="error">Недостаточно золота!</p>}
        {notEnoughFavor && <p className="error">Недостаточно репутации!</p>}
      </div>
    </div>
  );
}
