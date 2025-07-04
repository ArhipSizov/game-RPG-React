import { useEffect, useState } from "react";

import EnemyBD from "../../Battle/DataBase/AllEnemy.json";
import getRandomInt from "../../../Utils/Random";
import GuildQuestBlock from "./GuildQuestBlock/GuildQuestBlock";

import "./Guild.scss";

interface type {
  setShowGuild: (boolean: boolean) => void;
  setQuest: (quest: quest) => void;
}

import type { quest } from "./Quest";

export default function Guild({ setShowGuild, setQuest }: type) {
  const [allQuests, setShowQuests] = useState<quest[]>([]);

  useEffect(() => {
    const newArrAll: quest[] = [];
    for (let i = 0; i < 3; i++) {
      const newArr: quest = {
        reward: 0,
        time: 0,
        enemy_name: "",
        enemy_count: 0,
      };
      let randEnemy =
        Object.values(EnemyBD)[getRandomInt(Object.values(EnemyBD).length)];
      while (randEnemy.difficult == 0) {
        randEnemy =
          Object.values(EnemyBD)[getRandomInt(Object.values(EnemyBD).length)];
      }
      newArr.enemy_name = randEnemy.name;
      newArr.enemy_count = getRandomInt(5) + 2;
      newArr.reward =
        (getRandomInt(randEnemy.difficult) + randEnemy.difficult) * newArr.enemy_count +
        randEnemy.difficult;
      newArr.time = getRandomInt(newArr.reward) + 40;
      newArrAll[i] = newArr;
    }
    setShowQuests(newArrAll);
  }, []);

  return (
    <div onClick={() => setShowGuild(false)} className="guild_quests">
      <div
        onClick={(event) => event.stopPropagation()}
        className="guild_quests_all_block"
      >
        <h1>Доска заданий</h1>
        <div>
          {allQuests.map((item) => (
            <GuildQuestBlock item={item} setQuest={setQuest}/>
          ))}
        </div>
      </div>
    </div>
  );
}
