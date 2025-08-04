import { useState } from "react";

import "./Dialogue.scss";
import type { choose, DialogueType } from "./DialogueType";

interface type {
  closeDialogue: (boolean: boolean) => void;
  img: string;
  dialogue: DialogueType[][];
  func: (numDialogue: number, numChoose?: number) => void;
  dialogueNumberStart: number;
}

export default function Dialogue({
  closeDialogue,
  img,
  dialogue,
  func,
  dialogueNumberStart
}: type) {
  const [dialogueNumber, setDialogueNumber] = useState<number>(dialogueNumberStart);
  const [textNumber, setTextNumber] = useState<number>(0);
  
  function nextText() {
    if (dialogue[dialogueNumber].length - 1 > textNumber) {
      setTextNumber(textNumber + 1);
    } else if (!dialogue[dialogueNumber][textNumber].choose) {
      closeDialogue(false);
    }
  }

  function chooseDialogue(item: choose, index: number) {
    if (item.func == true) {
      func(dialogueNumber, index);
    }
    setDialogueNumber(item.do);
    setTextNumber(0);
  }

  return (
    <div onClick={() => nextText()} className="dialogue">
      <div className="dialogue_in">
        <img src={img} alt="" />
        <div className="dialogue_text">
          <p>{dialogue[dialogueNumber][textNumber].text}</p>
          <div className="dialogue_choose">
            {dialogue[dialogueNumber][textNumber].choose &&
              dialogue[dialogueNumber][textNumber].choose.map((item, index) => (
                <p key={index} onClick={() => chooseDialogue(item, index)}>
                  {item.text}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
