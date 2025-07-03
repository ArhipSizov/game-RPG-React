// import { useState } from "react";

import "./City.scss";

interface type {
  setShowCity: (boolean: boolean) => void;
  allGold: number;
}

export default function City({ setShowCity, allGold }: type) {
  //   const [difficult, setDifficult] = useState<number>(1);

  return (
    <div className="city">
      <div className="city_map_all">
        <img className="city_map" src="/city/city.png" alt="" />
        <div onClick={() => setShowCity(false)} className="train">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/train.png" alt="" />
        </div>
        <div onClick={() => alert("Ваше золото: " + allGold)} className="bank">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/bank.png" alt="" />
        </div>
        <div className="mage">
          <img className="mark" src="/mark.svg" alt="" />
          <img src="/city/mage.png" alt="" />
        </div>
      </div>
    </div>
  );
}
