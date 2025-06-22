import "./SkillOne.scss";

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
  item: Ability;
  setShowSkillTree: (boolean: boolean) => void;
  setNewSkill: (Ability: Ability) => void;
}

export default function SkillOne({ item, setNewSkill, setShowSkillTree }: tipe) {
  return (
    <div
      onClick={() => (setNewSkill(item), setShowSkillTree(false))}
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
