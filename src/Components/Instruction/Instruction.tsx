import { useEffect } from "react";

import getCookie from "../../Utils/getCookie";
import "./Instruction.scss";

interface tipe {
  allInstruction: boolean[];
  setAllInstruction: (boolean: boolean[]) => void;
  setShowMap: (boolean: boolean) => void;
}

export default function Instruction({
  allInstruction,
  setAllInstruction,
  setShowMap,
}: tipe) {
  useEffect(() => {
    if (getCookie("first_time") == "true") {
      setAllInstruction([]);
    }
  }, []);

  function changeBlock(next?: boolean) {
    const newArr: boolean[] = [true];
    if (next) {
      newArr[allInstruction.length] = true;
      setAllInstruction(newArr);
    } else {
      setAllInstruction([]);
      document.cookie = "first_time=true";
    }
  }
  return (
    <div className="instruction">
      {allInstruction[1] && (
        <div className="instruction_base instruction_start">
          <h1>Хотите пройти обучение?</h1>
          <div
            onClick={() => {
              changeBlock(true);
            }}
            className="positive_butt"
          >
            <p>Да! Я тут впервые</p>
          </div>
          <div
            onClick={() => {
              changeBlock();
            }}
            className="negative_butt"
          >
            <p>Нет, я уже заходил</p>
          </div>
        </div>
      )}
      {allInstruction[0] && (
        <p
          onClick={() => {
            changeBlock();
          }}
          className="instruction_end"
        >
          Закончить обучение
        </p>
      )}
      {allInstruction[2] && (
        <div className="instruction_base instruction_1">
          <p>
            1/7 Тогда я сейчас тебе всё расскажу! Тут находится карта, здесь
            можно выбирать локации, позже локацию можно изменить в меню (для
            продолжения нажми кнопку ниже)
          </p>
          <p
            onClick={() => {
              changeBlock(true);
              setShowMap(false);
            }}
            className="button"
          >
            Понятно!
          </p>
        </div>
      )}
      {allInstruction[3] && (
        <div className="instruction_base instruction_2">
          <p>
            2/7 Это интерфейс боя! Слева находятся твои войны, ты можешь выбрать
            любого из них, после обучения
          </p>
          <p
            onClick={() => {
              changeBlock(true);
            }}
            className="button"
          >
            Ясно!
          </p>
        </div>
      )}
      {allInstruction[4] && (
        <div className="instruction_base instruction_3">
          <p>
            3/7 Это твои способности! Тут краткое описание выбранной
            способности. Сейчас у тебя всего 1 способность, но с повышением
            уровня их станет больше!
          </p>
          <p
            onClick={() => {
              changeBlock(true);
            }}
            className="button"
          >
            Отлично!
          </p>
        </div>
      )}
      {allInstruction[5] && (
        <div className="instruction_base instruction_4">
          <p>
            4/7 Это твои противники - Слаймы! Под некоторыми есть линии, серая
            значит что его можно выбрать целью, а красная у выбранных
          </p>
          <p
            onClick={() => {
              changeBlock(true);
            }}
            className="button"
          >
            Прекрасно!
          </p>
        </div>
      )}
      {allInstruction[6] && (
        <div className="instruction_base instruction_5">
          <p>
            5/7 После всех выборов, ты можешь закончить ход! После этого ты
            атакуешь выбранного противника, а случайный противник так-же атакует
            тебя!
          </p>
          <p
            onClick={() => {
              changeBlock(true);
            }}
            className="button"
          >
            Ого!
          </p>
        </div>
      )}
      {allInstruction[7] && (
        <div className="instruction_base instruction_6">
          <p>
            6/7 Что бы посмотреть подробную информацию о персонаже, нажмите по
            нему ПКМ или знак вопроса!
          </p>
          <p
            onClick={() => {
              changeBlock(true);
            }}
            className="button"
          >
            Невероятно!
          </p>
        </div>
      )}
      {allInstruction[8] && (
        <div className="instruction_base instruction_7">
          <p>
            7/7 Так-же тут есть плеер с музыкой! Можешь включить там музыку! На этом всё, удачи!
          </p>
          <p
            onClick={() => {
              changeBlock();
            }}
            className="button"
          >
            Спасибо!
          </p>
        </div>
      )}
    </div>
  );
}
