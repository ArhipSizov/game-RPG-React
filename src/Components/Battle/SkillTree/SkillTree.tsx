import { useEffect, useState } from "react";

import AllAllyDB from "../DataBase/AllAlly.json";

import SkillOne from "./SkillOne/SkillOne";
import SkillOneCanBe from "./SkillOneCanBe/SkillOneCanBe";

import "./SkillTree.scss";

interface Ability {
  id: string;
  name: string;
  position: string[];
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
  const [skillChoose, setSkillChoose] = useState<Ability[]>([]);
  const [skillCanBe, setSkillCanBe] = useState<Ability[]>([]);
  const [showText, setShowText] = useState<boolean>(false);
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const newArrChoose: Ability[] = [];
    const newArrCanBe: Ability[] = [];
    Object.values(AllAllyDB).forEach((allyArr) => {
      if (allyArr.name == notLearnSkill[0]) {
        setSkillChoose([]);
        let countAbility = 0;
        let randomeSkill = 0;
        let lastRandomeSkill = -1;
        for (let i = 0; i < allyArr.skills.length; i++) {
          if (allyArr.skills[i].id == notLearnSkill[i + 1]) {
            if (countAbility < 2) {
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
              newArrChoose[i] = allyArr.skills[randomeSkill];
            }
            setShowText(true);
            newArrCanBe[i] = allyArr.skills[i];
          }
        }
      }
    });
    setSkillChoose(newArrChoose);
    setSkillCanBe(newArrCanBe);
  }, []);

  return (
    <div className="skill_tree">
      <h1>Выберите способность</h1>
      <div className="skill_tree_block">
        {skillChoose.map((item) => (
          <SkillOne
            item={item}
            key={item.id}
            setNewSkill={setNewSkill}
            setShowSkillTree={setShowSkillTree}
            setShowText={setShowText}
          />
        ))}
      </div>
      {showText && (
        <h1>Возможные способности персонажа для изучения в будущем</h1>
      )}
      <div className="skill_tree_can_be_block">
        {skillCanBe.map((item) => (
          <SkillOneCanBe item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
