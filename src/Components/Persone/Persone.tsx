import "./Persone.scss";
import { useEffect, useState } from "react";

interface Ability {
  id: string;
  name: string;
  min_damage: number;
  max_damage: number;
  description: string;
}

interface Character {
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

export default function Persone(item: Character) {
  const [atackView, setAtackView] = useState<string>("damage");
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

    if (item.addAtackViewEnemy[0] == item.id || item.addAtackViewAlly[0] == item.id) {
      setAtackView("damage damage_add");
      setTimeout(() => {
        setAtackView("damage");
      }, 500);
    }
  }, [item.turn]);

  return (
    <div
      onClick={() => item.changeEnemyActive(Number(item.id))}
      className={item.persone[Number(item.id)]}
    >
      {(personeAlly && (
        <p className={atackView}>-{item.addAtackViewAlly[1]}hp</p>
      )) || <p className={atackView}>-{item.addAtackViewEnemy[1]}hp</p>}
      <div className="description">
        <p>{item.description}</p>
      </div>
      <hr className="choose" />
      <hr id={item.id} className="hp_bar" />
      <p className="persone_hp">
        {item.hp}/{item.maxHp}
      </p>
      <p className="persone_name">{item.name}</p>
    </div>
  );
}
