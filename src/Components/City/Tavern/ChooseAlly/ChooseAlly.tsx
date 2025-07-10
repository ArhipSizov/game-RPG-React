import { useState } from "react";

import AllAllyDB from "../../../Battle/DataBase/AllAlly.json";
import PersoneChoose from "./PersoneChoose/PersoneChoose.tsx";

import "./ChooseAlly.scss";

import type { Character } from "../../../Battle/interfaceCharacter.ts";

interface tipe {
  allAlly: Character[];
  setShowChooseAlly: (boolean: boolean) => void;
}
export default function ChooseAlly({ allAlly, setShowChooseAlly }: tipe) {
  const [persone, setPersone] = useState<Character>();
  const [personeForEditing, setPersoneForEditing] = useState<Character>();

  //hp %
  function changeAlly() {
    if (personeForEditing && persone) {
      const hpPecent = persone.hp / persone.maxHp;
      allAlly[Number(persone.id) - 5] = { ...personeForEditing };
      allAlly[Number(persone.id) - 5].id = persone.id;
      allAlly[Number(persone.id) - 5].hp = Math.round(
        allAlly[Number(persone.id) - 5].hp * hpPecent
      );
      const firstSkill = allAlly[Number(persone.id) - 5].skills[0];
      allAlly[Number(persone.id) - 5].skills = [];
      allAlly[Number(persone.id) - 5].skills[0] = firstSkill;
    }
    setPersone(undefined);
    setPersoneForEditing(undefined);
  }

  return (
    <div className="choose_ally">
      <h1 onClick={() => setShowChooseAlly(false)}>Выход из редактора</h1>
      <h2>Ваши персонажи</h2>
      <div className="all_persone">
        {allAlly.map((item) => (
          <PersoneChoose
            key={item.id}
            item={item}
            setPersone={setPersone}
            idChoose={persone?.id}
          />
        ))}
      </div>
      <h2>Можно заменить на</h2>
      <div className="all_persone_for_choose">
        {Object.values(AllAllyDB).map((item) => (
          <PersoneChoose
            key={item.id}
            item={item}
            setPersone={setPersoneForEditing}
            idChoose={personeForEditing?.id}
          />
        ))}
      </div>
      {persone && personeForEditing && (
        <p onClick={() => changeAlly()} className="button">
          Заменить
        </p>
      )}
    </div>
  );
}
