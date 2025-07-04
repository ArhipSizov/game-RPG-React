import { useState } from "react";

import "./GuildQuestBlock.scss";

import type { quest } from "../Quest";
interface type {
  item: quest;
  setQuest: (quest: quest) => void;
}

export default function GuildQuestBlock({ item, setQuest }: type) {
  const [showButton, setShowButton] = useState<boolean>(true);

  return (
    <div onClick={() => (setQuest(item), setShowButton(false))} className="guild_quest_block">
      <h2>Убить "{item.enemy_name}"</h2>
      <p>Необходимо {item.enemy_count} шт.</p>
      <p>Выполнить за {item.time} раунд</p>
      <p>Награда {item.reward} золотых</p>
      {showButton && <p>Принять</p>}
    </div>
  );
}
