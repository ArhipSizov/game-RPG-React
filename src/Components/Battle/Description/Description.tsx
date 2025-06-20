import { useEffect } from "react";
import "./Description.scss";

interface Ability {
  id: string;
  name: string;
  min_damage: number;
  max_damage: number;
  description: string;
  crit: number;
  health: boolean;
}

interface ItemCharacter {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  description: string;
  changeEnemyActive: (num: number) => void;
  persone: string[];
  turn: number;
  who: string;
  addAtackView: string[];
  skills: [Ability];
}
export default function Description(item: ItemCharacter) {
  useEffect(() => {
    let doOneTime = 0;
    if (doOneTime === 0) {
      doOneTime = 1;
      const parentDiv = document.getElementById("abilitys_description");
      let newNameAbility;
      let newDescriptionAbility;
      let newDamageAbility;
      for (let i = 0; i < item.skills.length; i++) {
        newNameAbility = document.createElement("h3");
        newNameAbility.textContent = item.skills[i].name;
        newDescriptionAbility = document.createElement("p");
        newDescriptionAbility.textContent = item.skills[i].description;
        newDamageAbility = document.createElement("p");
        if (item.skills[i].health == true) {
          newDamageAbility.textContent = "Лечение - ";
        } else {
          newDamageAbility.textContent = "Урон - ";
        }
        newDamageAbility.textContent +=
          item.skills[i].min_damage +
          "-" +
          item.skills[i].max_damage;
        if (item.skills[i].crit != undefined) {
          newDamageAbility.textContent += ", Крит - " + item.skills[i].crit + "%";
        }
        if (parentDiv) {
          parentDiv.appendChild(newNameAbility);
          parentDiv.appendChild(newDescriptionAbility);
          parentDiv.appendChild(newDamageAbility);
        }
      }
    }
  }, []);
  return (
    <div className="description_all_block">
      <div className="description_block_in">
        <h2>Имя</h2>
        <p>{item.name}</p>
        <h2>Описание</h2>
        <p>{item.description}</p>
        <h2>Способности</h2>
        <div id="abilitys_description" className="abilitys_description"></div>
      </div>
    </div>
  );
}
