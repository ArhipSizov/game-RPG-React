import { useEffect, useState } from "react";

import AllAllyDB from "../DataBase/AllAlly.json";

import SkillOne from "./SkillOne/SkillOne";

import "./SkillTree.scss";

interface Ability {
  id: string;
  name: string;
  min_damage: number;
  max_damage: number;
  description: string;
  crit?: number;
  health?: boolean;
}

interface tipe {
  notLearnSkill: string[];
  setShowSkillTree: (boolean: boolean) => void;
  setNewSkill: (Ability: Ability) => void;
}

export default function SkillTree({
  notLearnSkill,
  setShowSkillTree,
  setNewSkill,
}: tipe) {
  const [arr, setArr] = useState<Ability[]>([]);
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const newArr: Ability[] = [];
    Object.values(AllAllyDB).forEach((allyArr) => {
      if (allyArr.name == notLearnSkill[0]) {
        setArr([]);
        let countAbility = 0;
        let randomeSkill = 0;
        let lastRandomeSkill = -1;
        for (let i = 0; i < allyArr.skills.length; i++) {
          if (
            allyArr.skills[i].id == notLearnSkill[i + 1] &&
            countAbility < 2
          ) {
            let serchSkill = false;
            while (serchSkill == false) {
              randomeSkill = getRandomInt(allyArr.skills.length);
              notLearnSkill.forEach((element) => {
                if (
                  randomeSkill + 1 == Number(element) &&
                  lastRandomeSkill != randomeSkill + 1
                ) {
                  lastRandomeSkill = randomeSkill + 1;
                  serchSkill = true;
                }
              });
            }
            countAbility += 1;
            newArr[i] = allyArr.skills[randomeSkill];
          }
        }
      }
    });
    setArr(newArr);
  }, []);

  return (
    <div className="skill_tree">
      <h1>Выберите способность</h1>
      <div id="skill_tree" className="skill_tree_block">
        {arr.map((item) => (
          <SkillOne
            item={item}
            key={item.id}
            setNewSkill={setNewSkill}
            setShowSkillTree={setShowSkillTree}
          />
        ))}
      </div>
    </div>
  );
}
