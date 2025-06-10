import { useEffect, useState } from "react";

import AllEnemyDB from "../Components/AllEnemy.json"
import Enemy from "../Components/Enemy/Enemy";


import "./App.scss";

interface Ability {
  id: string;
  name: string;
  damage: number;
  description: string;
}

interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: number;
  skills: [Ability, Ability, Ability];
}

function App() {
  console.log(AllEnemyDB);
  
  const [turn, setTurn] = useState<number>(0);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  //declare ally
  const [Mage] = useState<Character>({
    id: "1",
    name: "маг",
    hp: 20,
    maxHp: 20,
    position: 1,
    skills: [
      {
        id: "1",
        name: "Firebol",
        damage: 4,
        description:
          "very long textvery long textvery long textvery long textvery long textvery long text",
      },
      {
        id: "2",
        name: "Kick",
        damage: 2,
        description: "ewrewrew",
      },
      {
        id: "3",
        name: "Fire",
        damage: 1,
        description: "fdshhgkjjg",
      },
    ],
  });

  //declare enemy
  const [Enemy1, setEnemy1] = useState<Character>({
    id: "1",
    name: "none",
    hp: 1,
    maxHp: 1,
    position: 1,
    skills: [
      {
        id: "1",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "2",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "3",
        name: "nothin",
        damage: 0,
        description: "none",
      },
    ],
  });
  const [Enemy2, setEnemy2] = useState<Character>({
    id: "2",
    name: "none",
    hp: 1,
    maxHp: 1,
    position: 1,
    skills: [
      {
        id: "1",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "2",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "3",
        name: "nothin",
        damage: 0,
        description: "none",
      },
    ],
  });
  const [Enemy3, setEnemy3] = useState<Character>({
    id: "3",
    name: "none",
    hp: 1,
    maxHp: 1,
    position: 1,
    skills: [
      {
        id: "1",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "2",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "3",
        name: "nothin",
        damage: 0,
        description: "none",
      },
    ],
  });
  const [Enemy4, setEnemy4] = useState<Character>({
    id: "4",
    name: "none",
    hp: 1,
    maxHp: 1,
    position: 1,
    skills: [
      {
        id: "1",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "2",
        name: "nothin",
        damage: 0,
        description: "none",
      },
      {
        id: "3",
        name: "nothin",
        damage: 0,
        description: "none",
      },
    ],
  });
  const [allEnemy, setAllEnemy] = useState<Character[]>([Enemy1, Enemy2, Enemy3, Enemy4]);
  useEffect(() => {
    setAllEnemy([Enemy1, Enemy2, Enemy3, Enemy4])
  }, [Enemy1, Enemy2, Enemy3, Enemy4]);
  console.log(allEnemy);
  if (Enemy1.name === "none") {
    for (let i = 1; i < 5; i++) {
      let enemyTrue;
      if (getRandomInt(2) == 0) {
        enemyTrue = { ...AllEnemyDB.StrongGoblin };
      } else {
        enemyTrue = { ...AllEnemyDB.Goblin };
      }
      const setEnemyTrue = eval("setEnemy" + i);
      enemyTrue.id = i.toString();
      setEnemyTrue(enemyTrue);
    }
  }
  

  //enemy active
  const [enemy, setEnemy] = useState<string[]>([
    "1",
    "persone active_persone",
    "persone",
    "persone",
    "persone",
  ]);
  function changeEnemyActive(num: number) {
    const numString = num.toString();
    const newArr = [numString, "persone", "persone", "persone", "persone"];
    newArr[num] = "persone active_persone";
    for (let i = 1; i < 5; i++) {
      if (enemy[i] == "none_true") {
        newArr[i] = "none_true";
      }
    }
    setEnemy(newArr);
  }

  //abilites active
  const [ability, setAbility] = useState<string[]>([
    "1",
    "ability_persone active_ability",
    "ability_persone",
    "ability_persone",
  ]);
  function changeAbilityActive(num: number) {
    const numString = num.toString();
    const newArr = [
      numString,
      "ability_persone",
      "ability_persone",
      "ability_persone",
    ];
    newArr[num] = "ability_persone active_ability";
    setAbility(newArr);
  }

  //atack
  function atack() {
    setTurn(turn + 1);
    let chooseEnemy;
    let damage;

    for (let i = 1; i < 5; i++) {
      const enemyTrue = "Enemy" + i;
      if (eval(enemyTrue + ".id") == enemy[0]) {
        chooseEnemy = eval(enemyTrue);
      }
    }

    Mage.skills.forEach((elem) => {
      if (ability[0] == elem.id) {
        damage = Mage.skills[Number(ability[0]) - 1].damage;
      }
    });

    if (damage) {
      chooseEnemy.hp -= damage;
    }

    if (chooseEnemy.hp <= 0) {
      const newArr = ["1", "persone", "persone", "persone", "persone"];
      newArr[chooseEnemy.id] = "none_true";
      for (let i = 1; i < 5; i++) {
        if (enemy[i] == "none_true") {
          newArr[i] = "none_true";
        }
      }
      setEnemy(newArr);
    }
  }

  //hp bar
  // useEffect(() => {
  //   const idEnemyName = "enemy" + enemy[0];
  //   const idEnemy = document.getElementById(idEnemyName);
  //   const ally = document.getElementById("ally");
  //   const enemyName = eval("Enemy" + Number(enemy[0]));
  //   let maxHp = enemyName.maxHp;
  //   let hp = enemyName.hp;
  //   let width = (hp / maxHp) * 100;
  //   if (idEnemy) {
  //     idEnemy.style.width = width + "%";
  //   }
  //   maxHp = Mage.maxHp;
  //   hp = Mage.hp;
  //   width = (hp / maxHp) * 100;
  //   if (ally) {
  //     ally.style.width = width + "%";
  //   }
  // }, [turn]);

  //site
  return (
    <div className="app">
      <div className="sqare">
        <div className="ally">
          <div className="persone none"></div>
          <div className="persone none"></div>
          <div className="persone none"></div>
          <div className="persone">
            <hr id="ally" className="hp_bar" />
          </div>
        </div>
        <div className="enemy">
              {allEnemy.map((item) => (
                <Enemy
                  {...item}
                  changeEnemyActive={changeEnemyActive}
                  enemy={enemy}
                  turn={turn}
                  key={item.id}
                ></Enemy>
              ))}
        </div>
      </div>
      <div className="ability_all">
        <div className="ability_persone_all">
          <div
            onClick={() => changeAbilityActive(1)}
            className={ability[1]}
          ></div>
          <div
            onClick={() => changeAbilityActive(2)}
            className={ability[2]}
          ></div>
          <div
            onClick={() => changeAbilityActive(3)}
            className={ability[3]}
          ></div>
        </div>
        <div className="ability_description">
          <p className="name">{Mage.skills[Number(ability[0]) - 1].name}</p>
          <p className="description">
            {Mage.skills[Number(ability[0]) - 1].description}
          </p>
          <p className="damage">
            Урон - {Mage.skills[Number(ability[0]) - 1].damage}
          </p>
        </div>
        <div onClick={() => atack()} className="and_turn">
          <p>Завершить ход</p>
        </div>
      </div>
    </div>
  );
}

export default App;
