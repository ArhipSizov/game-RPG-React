import { useState, useEffect } from "react";

import "./MainMenu.scss";

interface tipe {
  difficult: number;
  setShowMap: (boolean: boolean) => void;
  setShowChooseAlly: (boolean: boolean) => void;
  setAllInstruction: (boolean: boolean[]) => void;
  setShowCity: (boolean: boolean) => void;
  setDifficultGame: (number: number) => void;
  difficultGame: number;
  setIsReset: (boolean: boolean) => void;
}
export default function MainMenu({
  difficult,
  setShowMap,
  setAllInstruction,
  setShowChooseAlly,
  setShowCity,
  setDifficultGame,
  difficultGame,
  setIsReset,
}: tipe) {
  const [difficultText, setDifficultText] = useState<string>("средне");
  const [difficultGameText, setDifficultGameText] = useState<string>("легко");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showResetVerify, setShowResetVerify] = useState<boolean>(false);

  useEffect(() => {
    switch (difficult) {
      case -1:
        setDifficultText("густой лес");
        break;
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

  const changeDifficultGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDifficult = parseFloat(e.target.value);
    setDifficultGame(newDifficult);
    switch (newDifficult) {
      case 1:
        setDifficultGameText("легко");
        break;
      case 2:
        setDifficultGameText("средне");
        break;
      case 3:
        setDifficultGameText("сложно");
        break;
    }
  };
  return (
    <div>
      {showResetVerify && (
        <div onClick={() => setShowResetVerify(false)} className="resetVerify">
          <h2>Вы уверены?</h2>
          <p>
            При нажатии на кнопку подтвердить вы потеряете ВЕСЬ прогресс без
            возможности восстановления
          </p>
          <div>
            <p
              onClick={() => (setIsReset(true), location.reload())}
              className="reset_true"
            >
              Удалить ВСЕ данные
            </p>
            <p className="reset_false">Сохранить данные</p>
          </div>
        </div>
      )}
      {(showMenu && (
        <div onClick={() => setShowMenu(!showMenu)} className="main_menu">
          <p className="close_menu">Закрыть меню</p>
          <div
            onClick={(event) => event.stopPropagation()}
            className="main_menu_block"
          >
            <h1>Главное меню</h1>
            <p onClick={() => setShowResetVerify(true)} className="open_reset">
              Сбросить прогресс
            </p>
            <div className="difficult">
              <p>Текущая локация: {difficultText}</p>
            </div>
            <div>
              <p>Текущая сложность: {difficultGameText}</p>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={difficultGame}
                onChange={changeDifficultGame}
              />
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
