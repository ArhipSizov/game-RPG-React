import "./CastleBlock.scss";

import type { castleType } from "../CastleType";

interface type {
  buyFunc: (string: string) => void;
  item: castleType;
}

export default function CastleBlock({ item, buyFunc }: type) {
  return (
    <div onClick={() => buyFunc(item.name)} className="CastleBlock">
      <p className="Name">{item.name}</p>
      <p>
        Стоимость {item.cost_gold} золота и нужна {item.cost_favor} репутации
      </p>
      <p>Доход {item.add_gold} золота/дн</p>
    </div>
  );
}
