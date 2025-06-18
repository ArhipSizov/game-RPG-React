import { useState } from "react";

import "./MainMenu.scss";

interface tipe {
  difficult: number;
  setDifficult: (num: number) => void;
}
export default function MainMenu({ difficult, setDifficult }: tipe) {
  const [difficultText, setDifficultText] = useState<string>("средне");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const changeDifficult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDifficult = parseFloat(e.target.value);
    setDifficult(newDifficult);
    switch (newDifficult) {
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
  };

  return (
    <div>
      {(showMenu && (
        <div onClick={() => setShowMenu(!showMenu)} className="main_menu">
          <p className="close_menu">Закрыть меню</p>
          <div
            onClick={(event) =>  event.stopPropagation()}
            className="main_menu_block"
          >
            <h1>Главное меню</h1>
            <div className="difficult">
              <p>Выбор сложности </p>
              <div>
                <b>{difficultText}</b>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={difficult}
                  onChange={changeDifficult}
                />
              </div>
            </div>
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
