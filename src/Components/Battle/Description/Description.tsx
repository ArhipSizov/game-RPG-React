import { useEffect, useState } from "react";
import "./Description.scss";

import EffectsDB from "../DataBase/Effects.json";

interface Effects {
  id: string;
  img: string;
  name: string;
  type: string;
  count: number;
  countTime: number;
}

interface Ability {
  id: string;
  name: string;
  position: string[];
  min_damage: number;
  max_damage: number;
  description: string;
  effect?: string[];
  crit?: number;
  health?: boolean;
}

interface ItemCharacter {
  id: string;
  lv: number;
  exp: number;
  name: string;
  hp: number;
  maxHp: number;
  difficult: number;
  description: string;
  changeEnemyActive: (num: number) => void;
  persone: string[];
  turn: number;
  who: string;
  addAtackView: string[];
  skills: Ability[];
  effect: Effects[];
}
export default function Description(item: ItemCharacter) {
  const [haveExp, setHaveExp] = useState<boolean>(false);

  useEffect(() => {
    let doOneTime = 0;
    if (doOneTime === 0) {
      doOneTime = 1;
      const parentDiv = document.getElementById("abilitys_description");
      let newNameAbility;
      let newDescriptionAbility;
      let newDamageAbility;
      let newPosition: HTMLParagraphElement;
      let newEffect: HTMLParagraphElement;
      let newBlock: HTMLParagraphElement;
      for (let i = 0; i < item.skills.length; i++) {
        newNameAbility = document.createElement("h3");
        newNameAbility.textContent = item.skills[i].name;
        newDescriptionAbility = document.createElement("p");
        newDescriptionAbility.textContent = item.skills[i].description;
        newPosition = document.createElement("p");
        newPosition.textContent = "Возможная позиция - ";
        newEffect = document.createElement("p");
        newBlock = document.createElement("p");
        if (item.skills[i].position) {
          item.skills[i].position.forEach((element) => {
            newPosition.textContent += element + " ";
          });
        }
        const effect = item.skills[i].effect;
        if (effect) {
          Object.values(EffectsDB).forEach((element) => {
            if (element.id == effect[0]) {
              newEffect.textContent =
                element.name +
                ", урон - " +
                element.count +
                ", длительность - " +
                effect[1] +
                "-" +
                effect[2];
            }
          });
        }
        newDamageAbility = document.createElement("p");
        if (item.skills[i].health == true) {
          newDamageAbility.textContent = "Лечение - ";
        } else {
          newDamageAbility.textContent = "Урон - ";
        }
        newDamageAbility.textContent +=
          item.skills[i].min_damage + "-" + item.skills[i].max_damage;
        if (item.skills[i].crit != undefined) {
          newDamageAbility.textContent +=
            ", Крит - " + item.skills[i].crit + "%";
        }
        if (parentDiv) {
          parentDiv.appendChild(newNameAbility);
          parentDiv.appendChild(newDescriptionAbility);
          parentDiv.appendChild(newPosition);
          parentDiv.appendChild(newDamageAbility);
          parentDiv.appendChild(newEffect);
          parentDiv.appendChild(newBlock);
        }
      }
    }

    if (item.lv) {
      setHaveExp(true);
    }
  }, []);
  return (
    <div className="description_all_block">
      <div className="description_block_in">
        <h2>{item.name}</h2>
        <h2>Описание</h2>
        <p>{item.description}</p>
        <p>
          Уровень {item.lv}
          {item.difficult}
        </p>
        <p>
          Опыт {item.exp}
          {haveExp && "/" + (item.lv * item.lv - item.lv + 1)}
        </p>
        <div className="all_effects_description">
          <h2>Эффекты</h2>
          {item.effect.map((item) => (
            <div>
              <div>
                <img src={item.img} alt="" />
                <p>{item.name}</p>
              </div>
              <p>Длительность - {item.countTime} хода</p>
              <p>Урон {item.count}</p>
            </div>
          ))}
        </div>
        <h2>Способности</h2>
        <div id="abilitys_description" className="abilitys_description"></div>
      </div>
    </div>
  );
}
