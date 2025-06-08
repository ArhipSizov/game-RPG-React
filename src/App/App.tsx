import { useEffect, useState } from "react";
import "./App.css";

interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  position: number;
  // skills: Skill[];
}

interface Ability {
  id: string;
  name: string;
  damage: number;
  // skills: Skill[];
}
function App() {
  const [turn, setTurn] = useState<number>(0);

  //declare ability
  const [Firebol] = useState<Ability>({
    id: "1",
    name: "Firebol",
    damage: 4,
  });
  const [Kick] = useState<Ability>({
    id: "2",
    name: "Kick",
    damage: 2,
  });
  const [Fire] = useState<Ability>({
    id: "3",
    name: "Fire",
    damage: 1,
  });

  //declare enemy
  const [Goblin0] = useState<Character>({
    id: "1",
    name: "goblin",
    hp: 12,
    maxHp: 12,
    position: 1,
  });
  const [Goblin1] = useState<Character>({
    id: "2",
    name: "goblin",
    hp: 12,
    maxHp: 12,
    position: 1,
  });
  const [Goblin2] = useState<Character>({
    id: "3",
    name: "goblin",
    hp: 12,
    maxHp: 12,
    position: 1,
  });
  const [Goblin3] = useState<Character>({
    id: "4",
    name: "goblin",
    hp: 12,
    maxHp: 12,
    position: 1,
  });
  console.log(Goblin0, Goblin1, Goblin2, Goblin3);
  
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
    const arrAbility = [Firebol, Kick, Fire];
    let chooseEnemy;
    let damage;

    for (let i = 0; i < 4; i++) {
      const enemyTrue = "Goblin" + i;
      if (eval(enemyTrue + ".id") == enemy[0]) {
        chooseEnemy = eval(enemyTrue);
      }
    }

    arrAbility.forEach((elem) => {
      if (ability[0] == elem.id) {
        damage = elem.damage;
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
  useEffect(() => {
    const idEnemyName = "enemy" + enemy[0];
    const idEnemy = document.getElementById(idEnemyName);
    const enemyName = eval("Goblin" + (Number(enemy[0]) - 1));
    const maxHp = enemyName.maxHp;
    const hp = enemyName.hp;
    const width = (hp / maxHp) * 100;
    if (idEnemy) {
      idEnemy.style.width = width + "%";
    }
    console.log(1);
  }, [turn]);

  //site
  return (
    <div className="app">
      <div className="sqare">
        <div className="ally">
          <div className="persone none"></div>
          <div className="persone none"></div>
          <div className="persone none"></div>
          <div className="persone"></div>
        </div>
        <div className="enemy">
          <div onClick={() => changeEnemyActive(1)} className={enemy[1]}>
            <hr className="choose" />
            <hr id="enemy1" className="hp_bar" />
          </div>
          <div onClick={() => changeEnemyActive(2)} className={enemy[2]}>
            <hr className="choose" />
            <hr id="enemy2" className="hp_bar" />
          </div>
          <div onClick={() => changeEnemyActive(3)} className={enemy[3]}>
            <hr className="choose" />
            <hr id="enemy3" className="hp_bar" />
          </div>
          <div onClick={() => changeEnemyActive(4)} className={enemy[4]}>
            <hr className="choose" />
            <hr id="enemy4" className="hp_bar" />
          </div>
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
        <div onClick={() => atack()} className="and_turn"></div>
      </div>
    </div>
  );
}

export default App;
