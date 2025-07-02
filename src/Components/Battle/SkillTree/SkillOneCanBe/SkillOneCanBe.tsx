import "./SkillOneCanBe.scss";

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
  item: Ability;
}

export default function SkillOneCanBe({ item }: tipe) {
  console.log(item);
  
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
