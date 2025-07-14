import { useState } from "react";

import "./Bad.scss";

interface type {
  setTurn: (number: number) => void;
  setShowBad: (boolean: boolean) => void;
  turn: number;
}

export default function Bad({ setTurn, setShowBad, turn }: type) {
  const [time, setTime] = useState<number>(1);

  //изменение времени
  return (
    <div className="bad">
      <img className="background_img" src="/city/tavern/bad_room.png" alt="" />
      <h2 onClick={() => setShowBad(false)}>Вернуться</h2>
      <h1>Спать до {(turn + time) % 24}:00</h1>
      <input
        type="range"
        min="1"
        max="23"
        step="1"
        value={time}
        onChange={(e) => setTime(parseFloat(e.target.value))}
      />
      <p onClick={() => setTurn(turn + time)} className="button">
        Спать
      </p>
    </div>
  );
}
