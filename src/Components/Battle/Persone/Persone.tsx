import "./Persone.scss";
import { useEffect, useState } from "react";

import Description from "../Description/Description";

interface EffectsVieDb {
  id: number;
  img: string;
  min: string;
  max: string;
}

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
  addHealthView: string[];
  round: number;
  skills: Ability[];
  effect?: Effects[];
}

export default function Persone(item: ItemCharacter) {
  const [atackView, setAtackView] = useState<string>("damage");
  const [healthView, setHealthView] = useState<string>("health");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [effectVieDb, setEffectVieDb] = useState<EffectsVieDb[]>([]);
  const [personeAlly, setPersoneAlly] = useState<boolean | undefined>(
    undefined
  );
  if (item.who == "ally" && personeAlly == undefined) {
    setPersoneAlly(true);
  }

  useEffect(() => {
    setEffectVieDb([]);
    //hp bar update
    if (!personeAlly) {
      setTimeout(() => {
        if (item.id !== "0") {
          const idEnemy = document.getElementById(item.id);
          if (idEnemy) {
            idEnemy.style.width = "100%";
          }
        }
      }, 10);
    }
  }, [item.round, item.difficult]);

  useEffect(() => {
    //effect update

    if (item.effect) {
      const newArr: EffectsVieDb[] = [];
      item.effect.forEach((element) => {
        let fiend = false;
        newArr.forEach((_, index) => {
          if (newArr[index].img == element.img) {
            fiend = true;
            if (element.countTime < Number(newArr[0].min)) {
              newArr[index].min = element.countTime.toString();
            }
            if (element.countTime > Number(newArr[0].max)) {
              newArr[index].max = element.countTime.toString();
            }
          }
        });
        if (!fiend) {
          newArr.push({
            id: newArr.length,
            img: element.img,
            min: element.countTime.toString(),
            max: element.countTime.toString(),
          });
        }
      });
      setEffectVieDb(newArr);
    }

    //hp bar
    if (item.id !== "0") {
      const idEnemy = document.getElementById(item.id);
      const width = (item.hp / item.maxHp) * 100;
      if (idEnemy) {
        idEnemy.style.width = width + "%";
      }
    }

    //View atack

    if (item.addAtackView[0] == item.id && item.addAtackView[1] != "0") {
      if (item.addAtackView[2] == "true") {
        setAtackView("damage damage_add damage_crit");
        item.addAtackView[2] = "false";
      } else {
        setAtackView("damage damage_add");
      }
      setTimeout(() => {
        setAtackView("damage");
        item.addAtackView[0] = "0";
      }, 500);
    }

    //View health

    if (item.addHealthView[0] == item.id) {
      if (item.addHealthView[2] == "true") {
        setHealthView("health health_add damage_crit");
        item.addHealthView[2] = "false";
      } else {
        setHealthView("health health_add");
      }
      setTimeout(() => {
        setHealthView("health");
        item.addHealthView[0] = "0";
      }, 500);
    }
  }, [item.turn]);

  // description

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 2) {
      event.preventDefault();
      setIsDescriptionOpen(true);
    }
  };

  return (
    <div className={item.persone[Number(item.id)]}>
      <img
        className="description_open"
        onClick={() => setIsDescriptionOpen(true)}
        src="/battle/question.svg"
        alt=""
      />
      <div className="all_effects_persone">
        {effectVieDb &&
          effectVieDb.map((item) => (
            <div key={item.id}>
              <img src={item.img} alt="" />
              <p>
                {item.min}
                {item.min == item.max || " - "}
                {item.min == item.max || item.max}
              </p>
            </div>
          ))}
      </div>
      <div
        onClick={() => {
          item.changeEnemyActive(Number(item.id));
          setIsDescriptionOpen(false);
        }}
        onContextMenu={handleRightClick}
        className={item.persone[Number(item.id)]}
      >
        {isDescriptionOpen && <Description {...item} />}
        <p className={atackView}>-{item.addAtackView[1]}hp</p>
        <p className={healthView}>+{item.addHealthView[1]}hp</p>
        <hr className="choose" />
        <hr id={item.id} className="hp_bar" />
        <p className="persone_hp">
          {item.hp}/{item.maxHp}
        </p>
        <p className="persone_name">{item.name}</p>
        {(personeAlly && <p className="lv">Lv {item.lv}</p>) || (
          <p className="lv">Lv {item.difficult}</p>
        )}
      </div>
    </div>
  );
}
