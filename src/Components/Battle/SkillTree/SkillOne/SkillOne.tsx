import "./SkillOne.scss";

import type { Ability } from "../../interfaceCharacter.ts";

interface tipe {
  item: Ability;
  setShowSkillTree: (boolean: boolean) => void;
  setNewSkill: (Ability: Ability) => void;
  setShowText: (boolean: boolean) => void;
}

export default function SkillOne({ item, setNewSkill, setShowSkillTree, setShowText }: tipe) {
  return (
    <div
      onClick={() => (setNewSkill(item), setShowSkillTree(false), setShowText(false))}
      className="skill_one"
    >
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>
        {(item.health && "Лечение ") || "Урон "}
        {item.min_damage}-{item.max_damage}
      </p>
    </div>
  );
}
