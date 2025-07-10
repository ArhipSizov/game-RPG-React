// import { useState } from "react";

import "./Tavern.scss";
import ChooseAlly from "./ChooseAlly/ChooseAlly";

import type { Character } from "../../Battle/interfaceCharacter";

interface type {
  setShowTavern: (boolean: boolean) => void;
  allAlly: Character[];
}

export default function Tavern({ setShowTavern, allAlly }: type) {
  // const [showChooseAlly, setShowChooseAlly] = useState<boolean>(true);

  return (
    <div className="tavern_open">
      <ChooseAlly
        allAlly={allAlly}
        setShowChooseAlly={setShowTavern}
      />
    </div>
  );
}
