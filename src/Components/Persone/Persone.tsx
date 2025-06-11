import "./Persone.scss";
import { useEffect } from "react";

interface Ability {
  id: string;
  name: string;
  damage: number;
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
  skills: [Ability, Ability, Ability];
}

export default function Persone(item: Character) {
  //hp bar
  useEffect(() => {
    if (item.id !== "0") {
      const idEnemy = document.getElementById(item.id);
      const width = (item.hp / item.maxHp) * 100;
      if (idEnemy) {
        idEnemy.style.width = width + "%";
      }
    }
  }, [item.turn]);

  return (
    <div
      onClick={() => item.changeEnemyActive(Number(item.id))}
      className={item.persone[Number(item.id)]}
    >
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
