import { useEffect, useState } from "react";

import "./Mage.scss";

import startMageDialoge from "./MageDialoge.json";
import Dialogue from "../../Dialogue/Dialogue";

import type { DialogueType, choose } from "../../Dialogue/DialogueType";
import type { Character } from "../../Battle/interfaceCharacter";

interface type {
  setShowMage: (boolean: boolean) => void;
  allAlly: Character[];
  allGold: number;
  setAllGold: (number: number) => void;
}

export default function Mage({
  setShowMage,
  allAlly,
  allGold,
  setAllGold,
}: type) {
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [mageDialogue, setMageDialogue] =
    useState<DialogueType[][]>(startMageDialoge);

  function reNameInDialogue() {
    const newMageDialogue: DialogueType[][] = startMageDialoge;
    const reNameChoose: choose[] = [];
    allAlly.forEach((element, index) => {
      if (element.hp > 0) {
        reNameChoose.unshift({
          text: element.name + " " + (4 - index),
          do: 4,
          func: true,
        });
      }
    });
    reNameChoose.push({ text: "Я передумал", do: 0, func: true });
    if (
      "choose" in startMageDialoge[2][0] &&
      "choose" in startMageDialoge[3][0]
    ) {
      startMageDialoge[2][0].choose = reNameChoose;
      startMageDialoge[3][0].choose = reNameChoose;
    }
    setMageDialogue(newMageDialogue);
  }

  useEffect(() => {
    reNameInDialogue();
  }, []);

  function func(params: number, textNumber?: number) {
    if (params == 0 || params == 4) {
      if (allGold < 15) {
        setShowDialogue(false);
      }
    } else {
      let numAlly = 0;
      allAlly.forEach((element) => {
        if (element.hp > 0) {
          if (numAlly == textNumber) {
            setAllGold(allGold - 15);
            if (params == 2) {
              element.defaultDamage += 1;
            } else {
              element.hp = element.maxHp;
            }
          }
          numAlly++;
        }
      });
    }
  }
  return (
    <div className="mage_open" onClick={() => setShowMage(false)}>
      <h1 className="button_leave">Выйти</h1>
      <div onClick={(event) => event.stopPropagation()}>
        {showDialogue && (
          <Dialogue
            closeDialogue={setShowDialogue}
            img="/city/mage/mage_persone.png"
            dialogue={mageDialogue}
            func={func}
            dialogueNumberStart={0}
          />
        )}
      </div>
      <div
        className="mage_open_in"
        onClick={(event) => event.stopPropagation()}
      >
        <div onClick={() => setShowDialogue(true)} className="mage_img">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/mage/mage_persone.png" alt="" />
        </div>
        <img className="background_img" src="/city/mage/mage.png" alt="" />
      </div>
    </div>
  );
}
