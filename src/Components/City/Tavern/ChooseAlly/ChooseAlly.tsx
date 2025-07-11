import { useState } from "react";

import AllAllyDB from "../../../Battle/DataBase/AllAlly.json";
import PersoneChoose from "./PersoneChoose/PersoneChoose.tsx";

import "./ChooseAlly.scss";

import type { Character } from "../../../Battle/interfaceCharacter.ts";

interface tipe {
  allAlly: Character[];
  setShowChooseAlly: (boolean: boolean) => void;
  allGold: number;
  setAllGold: (number: number) => void;
}
export default function ChooseAlly({
  allAlly,
  setShowChooseAlly,
  allGold,
  setAllGold,
}: tipe) {
  const [persone, setPersone] = useState<Character>();
  const [personeForEditing, setPersoneForEditing] = useState<Character>();
  const [showError, setShowError] = useState<boolean>(false);

  //hp %
  function changeAlly() {
    if (allGold < 10) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    if (personeForEditing && persone) {
      allAlly[Number(persone.id) - 5] = { ...personeForEditing };
      allAlly[Number(persone.id) - 5].id = persone.id;
      const firstSkill = allAlly[Number(persone.id) - 5].skills[0];
      allAlly[Number(persone.id) - 5].skills = [];
      allAlly[Number(persone.id) - 5].skills[0] = firstSkill;
      setAllGold(allGold - 10);
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
      {showError && <p className="error">Недостаточно золота!</p>}
      {persone && personeForEditing && (
        <p onClick={() => changeAlly()} className="button">
          Заменить (10золота)
        </p>
      )}
    </div>
  );
}
