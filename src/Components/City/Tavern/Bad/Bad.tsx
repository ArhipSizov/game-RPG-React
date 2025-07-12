import { useState } from "react";

import "./Bad.scss";

interface type {
  setTurn: (number: number) => void;
  setShowBad: (boolean: boolean) => void;
}

export default function Bad({ setTurn }: type) {
  const [time, setTime] = useState<number>(0);

  //изменение времени
  return (
    <div className="bad">
      <img className="background_img" src="/city/tavern/bad_room.png" alt="" />
      <h1>{time} ч.</h1>
      <input
        type="range"
        min="0"
        max="23"
        step="1"
        value={time}
        onChange={(e) => setTime(parseFloat(e.target.value))}
      />
      <p onClick={() => setTurn(time)} className="button">
        Изменить время
      </p>
    </div>
  );
}
