import "./Persone.scss";
import { useEffect } from "react";

interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: number;
  changeEnemyActive: any;
  persone: string[];
  turn: number;
  who: string;
  skills: [];
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
      onClick={() => item.changeEnemyActive(item.id)}
      className={item.persone[Number(item.id)]}
    >
      <hr className="choose" />
      <hr id={item.id} className="hp_bar" />
      <p className="enemy_name">{item.name}</p>
    </div>
  );
}
