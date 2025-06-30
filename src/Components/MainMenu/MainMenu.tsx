import { useState, useEffect } from "react";

import "./MainMenu.scss";

interface tipe {
  difficult: number;
  setShowMap: (boolean: boolean) => void;
}
export default function MainMenu({ difficult, setShowMap }: tipe) {
  const [difficultText, setDifficultText] = useState<string>("средне");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    switch (difficult) {
      case 0:
        setDifficultText("тренировка");
        break;
      case 1:
        setDifficultText("легко");
        break;
      case 2:
        setDifficultText("средне");
        break;
      case 3:
        setDifficultText("сложно");
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
              <p>Текущая сложность: {difficultText}</p>
            </div>
            <p
              onClick={() => (setShowMap(true), setShowMenu(false))}
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
