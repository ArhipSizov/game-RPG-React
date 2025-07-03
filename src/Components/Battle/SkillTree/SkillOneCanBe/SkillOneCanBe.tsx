import "./SkillOneCanBe.scss";

import type { Ability } from "../../interfaceCharacter.ts";

interface tipe {
  item: Ability;
}

export default function SkillOneCanBe({ item }: tipe) {
  return (
    <div
      className="skill_one_can_be"
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
