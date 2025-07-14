import { useState } from "react";

import Dialogue from "../../../Dialogue/Dialogue";
import dialogue from "./dialogue.json";

import getCookie from "../../../../Utils/getCookie";

import "./Man.scss";

interface type {
  setShowMan: (boolean: boolean) => void;
  allGold: number;
  setAllGold: (number: number) => void;
}

export default function Man({ setShowMan, allGold, setAllGold }: type) {
  const [dialogueNumber, setDialogueNumber] = useState<number>(
    Number(getCookie("dialogue_man"))
  );
  if (!getCookie("dialogue_man")) {
    setDialogueNumber(0);
    document.cookie = "dialogue_man=0; max-age=604800";
  }

  function func() {
    document.cookie = "dialogue_man=4; max-age=604800";
    setAllGold(allGold + 5);
  }

  return (
    <div className="man">
      <Dialogue
        closeDialogue={setShowMan}
        img="/city/tavern/man.png"
        dialogue={dialogue}
        func={func}
        dialogueNumberStart={dialogueNumber}
      />
    </div>
  );
}
