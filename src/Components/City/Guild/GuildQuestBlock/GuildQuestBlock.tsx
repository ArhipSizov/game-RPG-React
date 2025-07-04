import { useState } from "react";

import "./GuildQuestBlock.scss";

import getRandomInt from "../../../../Utils/Random";

import type { quest } from "../Quest";
interface type {
  item: quest;
  setQuest: (quest: quest) => void;
}

export default function GuildQuestBlock({ item, setQuest }: type) {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [classButton, setClassButton] = useState<string>("guild_quest_block");
  const [style] = useState<React.CSSProperties>({
    width: getRandomInt(150) + 150 + "px",
    minHeight: getRandomInt(100) + 100 + "px",
    marginLeft: getRandomInt(600) + "px",
    marginTop: getRandomInt(450) + "px",
  });
  const [styleImg] = useState<React.CSSProperties>({
    marginLeft: getRandomInt(150) + "px",
  });
  console.log(getRandomInt(100) + 200);

  return (
    <div>
      {showButton && (
        <div
          onClick={() => (
            setQuest(item),
            setClassButton("guild_quest_block guild_quest_block_anim"),
            setTimeout(() => {
              setShowButton(false);
            }, 200)
          )}
          className={classButton}
          style={style}
        >
          <h2>Убить "{item.enemy_name}"</h2>
          <p>Необходимо {item.enemy_count} шт.</p>
          <p>Выполнить за {item.time} ч.</p>
          <p>Награда {item.reward} золотых</p>
          <p>Сложность {item.difficult}</p>
          <img src="/city/approved.png" style={styleImg} alt="" />
        </div>
      )}
    </div>
  );
}
