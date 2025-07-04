import { useState, useEffect } from "react";

import "./MainMenu.scss";

interface tipe {
  difficult: number;
  setShowMap: (boolean: boolean) => void;
  setShowChooseAlly: (boolean: boolean) => void;
  setAllInstruction: (boolean: boolean[]) => void;
  setShowCity: (boolean: boolean) => void;
}
export default function MainMenu({
  difficult,
  setShowMap,
  setAllInstruction,
  setShowChooseAlly,
  setShowCity,
}: tipe) {
  const [difficultText, setDifficultText] = useState<string>("средне");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    switch (difficult) {
      case 0:
        setDifficultText("город");
        break;
      case 1:
        setDifficultText("озеро (легко)");
        break;
      case 2:
        setDifficultText("лес (средне)");
        break;
      case 3:
        setDifficultText("горы (сложно)");
        break;
    }
  }, [difficult]);

  return (
    <div>
      {(showMenu && (
        <div onClick={() => setShowMenu(!showMenu)} className="main_menu">
          <p className="close_menu">Закрыть меню</p>
          <div
            onClick={(event) => event.stopPropagation()}
            className="main_menu_block"
          >
            <h1>Главное меню</h1>
            <div className="difficult">
              <p>Текущая локация: {difficultText}</p>
            </div>
            <p
              onClick={() => (
                setShowMenu(false),
                setShowMap(true),
                setAllInstruction([true, true]),
                (document.cookie = "first_time=false")
              )}
              className="open_instruction"
            >
              Пройти обучение снова
            </p>
            <p
              onClick={() => (setShowChooseAlly(true), setShowMenu(false))}
              className="open_choose_ally"
            >
              Открыть изменение персонажей
            </p>
            <p
              onClick={() => (
                setShowMap(true), setShowMenu(false), setShowCity(false)
              )}
              className="open_map"
            >
              Открыть карту
            </p>
          </div>
        </div>
      )) || (
        <p onClick={() => setShowMenu(!showMenu)} className="close_menu">
          Открыть меню
        </p>
      )}
    </div>
  );
}
