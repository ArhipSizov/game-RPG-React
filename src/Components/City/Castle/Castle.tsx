import { useState } from "react";
import castleBD from "./Castle.json";
import CastleBlock from "./CastleBlock/CastleBlock";

import "./Castle.scss";

import type { castleType } from "./CastleType";

interface type {
  setShowCastle: (boolean: boolean) => void;
  allGold: number;
  allFavor: number;
  setAllGold: (number: number) => void;
  setEarningsGold: (number: number) => void;
  earningsGold: number;
}

export default function Castle({
  setShowCastle,
  allGold,
  allFavor,
  setAllGold,
  earningsGold,
  setEarningsGold,
}: type) {
  const [canBeBuyCastle, setCanBeBuyCastle] = useState<
    castleType[] | undefined
  >();
  const [notEnoughGold, setNotEnoughGold] = useState<boolean>(false);
  const [notEnoughFavor, setNotEnoughFavor] = useState<boolean>(false);

  if (canBeBuyCastle == undefined) {
    const newArr: castleType[] = [];
    castleBD.forEach((element) => {
      if (newArr.length < 3 && earningsGold < element.add_gold * 2) {
        newArr.push(element);
      }
    });
    setCanBeBuyCastle(newArr);
  }

  function buyFunc(name: string) {
    castleBD.forEach((element) => {
      if (name == element.name) {
        let pass = true;
        if (allFavor < element.cost_favor) {
          pass = false;
          setNotEnoughFavor(true);
          setTimeout(() => {
            setNotEnoughFavor(false);
          }, 3000);
        }
        if (allGold < element.cost_gold) {
          pass = false;
          setNotEnoughGold(true);
          setTimeout(() => {
            setNotEnoughGold(false);
          }, 3000);
        }
        if (pass == true) {
          setAllGold(allGold - element.cost_gold);
          setEarningsGold(earningsGold + element.add_gold);
        }
      }
    });
  }

  return (
    <div className="castle_open" onClick={() => setShowCastle(false)}>
      <div
        className="castle_open_in"
        onClick={(event) => event.stopPropagation()}
      >
        <img className="background_img" src="/city/castle/castle.png" alt="" />
        <h1>Твоя репутация {allFavor}</h1>
        {notEnoughGold && <p className="error">Недостаточно золота!</p>}
        {notEnoughFavor && <p className="error">Недостаточно репутации!</p>}
        <div>
          {canBeBuyCastle !== undefined &&
            canBeBuyCastle.map((item) => (
              <CastleBlock item={item} buyFunc={buyFunc} />
            ))}
        </div>
      </div>
    </div>
  );
}
