import { useState, useEffect } from "react";

import "./PersoneChoose.scss";

import type { Character } from "../../interfaceCharacter";

interface type {
  item: Character;
  setPersone: (Character: Character) => void;
  idChoose?: string;
}

export default function PersoneChoose({ item, setPersone, idChoose }: type) {
  const [choose, setChoose] = useState<string>("persone_choose");
  useEffect(() => {
    if (idChoose == item.id) {
      setChoose("persone_choose persone_choose_choose");
    } else {
      setChoose("persone_choose");
    }
  }, [idChoose]);

  return (
    <div onClick={() => setPersone(item)} className={choose}>
      <hr id={item.id} className="hp_bar" />
      <p className="persone_hp">
        {item.hp}/{item.maxHp}
      </p>
      <p className="persone_name">{item.name}</p>
      <p className="lv">Lv {item.lv}</p>
    </div>
  );
}
