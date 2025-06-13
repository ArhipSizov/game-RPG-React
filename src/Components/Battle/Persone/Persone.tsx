import "./Persone.scss";
import { useEffect, useState } from "react";

import Description from "../Description/Description";

interface Ability {
  id: string;
  name: string;
  min_damage: number;
  max_damage: number;
  description: string;
}

interface ItemCharacter {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: number;
  description: string;
  changeEnemyActive: (num: number) => void;
  persone: string[];
  turn: number;
  who: string;
  addAtackViewEnemy: string[];
  addAtackViewAlly: string[];
  skills: [Ability, Ability, Ability];
}

export default function Persone(item: ItemCharacter) {
  const [atackView, setAtackView] = useState<string>("damage");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [personeAlly, setPersoneAlly] = useState<boolean | undefined>(
    undefined
  );
  if (item.who == "ally" && personeAlly == undefined) {
    setPersoneAlly(true);
  }

  useEffect(() => {
    //hp bar
    if (item.id !== "0") {
      const idEnemy = document.getElementById(item.id);
      const width = (item.hp / item.maxHp) * 100;
      if (idEnemy) {
        idEnemy.style.width = width + "%";
      }
    }

    //View atack

    if (
      item.addAtackViewEnemy[0] == item.id ||
      item.addAtackViewAlly[0] == item.id
    ) {
      setAtackView("damage damage_add");
      setTimeout(() => {
        setAtackView("damage");
      }, 500);
    }
  }, [item.turn]);

  // description

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event);

    if (event.button === 2) {
      event.preventDefault();
      setIsDescriptionOpen(true);
    }
    console.log(1);
  };
  return (
    <div
      onClick={() => {
        item.changeEnemyActive(Number(item.id));
        setIsDescriptionOpen(false);
      }}
      onContextMenu={handleRightClick}
      className={item.persone[Number(item.id)]}
    >
      {isDescriptionOpen && <Description {...item} />}
      {(personeAlly && (
        <p className={atackView}>-{item.addAtackViewAlly[1]}hp</p>
      )) || <p className={atackView}>-{item.addAtackViewEnemy[1]}hp</p>}
      <hr className="choose" />
      <hr id={item.id} className="hp_bar" />
      <p className="persone_hp">
        {item.hp}/{item.maxHp}
      </p>
      <p className="persone_name">{item.name}</p>
    </div>
  );
}
