export interface Effects {
  id: string;
  img: string;
  name: string;
  type: string;
  count: number;
  countTime: number;
}

export interface Ability {
  id: string;
  name: string;
  position: string[];
  min_damage: number;
  max_damage: number;
  description: string;
  mass?: boolean;
  effect?: string[];
  crit?: number;
  health?: boolean;
}

export interface Character {
  id: string;
  lv: number;
  exp: number;
  gold?: number;
  name: string;
  hp: number;
  maxHp: number;
  defaultDamage: number;
  description: string;
  difficult?: number;
  skills: Ability[];
  effect?: Effects[];
}
