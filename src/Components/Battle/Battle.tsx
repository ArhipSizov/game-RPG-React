import "./Battle.scss";
import { useEffect, useState } from "react";

import AllEnemyDB from "./DataBase/AllEnemy.json";
import AllAllyDB from "./DataBase/AllAlly.json";
import Persone from "./Persone/Persone.tsx";

interface tipe {
  difficult: number;
}

interface Ability {
  id: string;
  name: string;
  min_damage: number;
  max_damage: number;
  description: string;
  health: boolean;
}

interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  description: string;
  difficult: number;
  skills: [Ability];
}

export default function Battle({ difficult }: tipe) {
  const [turn, setTurn] = useState<number>(0);
  const [round, setRound] = useState<number>(0);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  //declare ally
  const [Ally5, setAlly5] = useState<Character>({
    id: "1",
    name: "none",
    hp: 20,
    maxHp: 20,
    description: "",
    difficult: 0,
    skills: [
      {
        id: "1",
        name: "Firebol",
        min_damage: 1,
        max_damage: 1,
        description:
          "very long textvery long textvery long textvery long textvery long textvery long text",
        health: false,
      },
    ],
  });
  const [Ally6, setAlly6] = useState<Character | undefined>();
  const [Ally7, setAlly7] = useState<Character | undefined>();
  const [Ally8, setAlly8] = useState<Character | undefined>();
  if (Ally5.name === "none") {
    for (let i = 5; i < 9; i++) {
      const ArrAllyTrue = Object.values(AllAllyDB);
      const allyTrue = { ...ArrAllyTrue[getRandomInt(ArrAllyTrue.length)] };
      const setAllyTrue = eval("setAlly" + i);
      allyTrue.id = i.toString();
      setAllyTrue(allyTrue);
    }
  }

  const [allAlly, setAllAlly] = useState<Character[]>([Ally5]);

  //declare enemy
  const [Enemy1, setEnemy1] = useState<Character>({
    id: "1",
    name: "none",
    hp: 1,
    maxHp: 1,
    description: "",
    difficult: 0,
    skills: [
      {
        id: "1",
        name: "nothin",
        min_damage: 1,
        max_damage: 1,
        description: "none",
        health: false,
      },
    ],
  });
  const [Enemy2, setEnemy2] = useState<Character | undefined>();
  const [Enemy3, setEnemy3] = useState<Character | undefined>();
  const [Enemy4, setEnemy4] = useState<Character | undefined>();

  const [allEnemy, setAllEnemy] = useState<Character[]>([Enemy1]);

  function addEnemy() {
    for (let i = 1; i < 5; i++) {
      const ArrAllEnemys = Object.values(AllEnemyDB);
      let enemyTrue = { ...ArrAllEnemys[getRandomInt(ArrAllEnemys.length)] };
      while (enemyTrue.difficult != difficult) {
        enemyTrue = { ...ArrAllEnemys[getRandomInt(ArrAllEnemys.length)] };
      }
      const setEnemyTrue = eval("setEnemy" + i);
      enemyTrue.id = i.toString();
      setEnemyTrue(enemyTrue);
    }
  }

  if (Enemy1.name === "none") {
    addEnemy();
  }
  useEffect(() => {
    addEnemy();
  }, [difficult]);

  //fix TS bug with uncorrect error, for deploy
  useEffect(() => {
    console.log(
      "\n!!!fix TS bug with uncorrect error, for deploy!!!\n\n\n",
      setEnemy1,
      setEnemy2,
      setEnemy3,
      setEnemy4,
      setAlly5,
      setAlly6,
      setAlly7,
      setAlly8
    );
  }, []);
  // end fix

  //update persone

  useEffect(() => {
    if (Enemy2 != undefined && Enemy3 != undefined && Enemy4 != undefined) {
      setAllEnemy([Enemy1, Enemy2, Enemy3, Enemy4]);
    }
    if (Ally6 != undefined && Ally7 != undefined && Ally8 != undefined) {
      setAllAlly([Ally5, Ally6, Ally7, Ally8]);
    }
  }, [Enemy1, Enemy2, Enemy3, Enemy4, Ally5, Ally6, Ally7, Ally8]);

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
    "ability_persone",
  ]);
  const [ally, setAlly] = useState<string[]>([
    "5",
    "",
    "",
    "",
    "",
    "persone active_persone",
    "persone",
    "persone",
    "persone",
  ]);

  function changeAbilityActive(num: number) {
    const numString = num.toString();
    const newArrAbility = [];
    for (let i = 0; i < allAlly[Number(ally[0]) - 5].skills.length + 1; i++) {
      newArrAbility[0] = numString;
      newArrAbility[i] = "ability_persone";
    }
    newArrAbility[num] = "ability_persone active_ability";
    setAbility(newArrAbility);
  }

  useEffect(() => {
    changeAllyActive(5);
  }, [allAlly]);

  //ally active

  function changeAllyActive(num: number) {
    const numString = num.toString();
    const newArr = [
      numString,
      "",
      "",
      "",
      "",
      "persone",
      "persone",
      "persone",
      "persone",
    ];
    const newArrAbility = [];
    for (let i = 0; i < allAlly[num - 5].skills.length + 1; i++) {
      newArrAbility[0] = "1";
      newArrAbility[i] = "ability_persone";
    }
    newArrAbility[1] = "ability_persone active_ability";
    setAbility(newArrAbility);
    newArr[num] = "persone active_persone";
    for (let i = 5; i < 9; i++) {
      if (ally[i] == "none_true") {
        newArr[i] = "none_true";
      }
    }
    setAlly(newArr);
  }

  //atack

  const [addAtackViewEnemy] = useState<string[]>(["0", "0"]);
  const [addAtackViewAlly] = useState<string[]>(["0", "0"]);
  const [addHealthViewEnemy] = useState<string[]>(["0", "0"]);
  const [addHealthViewAlly] = useState<string[]>(["0", "0"]);

  function atack() {
    setTurn(turn + 1);
    let chooseEnemy;
    let damage;

    for (let i = 1; i < 5; i++) {
      const enemyTrue = "Enemy" + i;
      if (eval(enemyTrue + ".id") == enemy[0]) {
        chooseEnemy = eval(enemyTrue);
        addAtackViewEnemy[0] = i.toString();
      }
    }

    allAlly.forEach((element) => {
      if (ally[0] == element.id) {
        element.skills.forEach((elem) => {
          if (ability[0] == elem.id) {
            damage =
              getRandomInt(
                element.skills[Number(ability[0]) - 1].max_damage -
                  element.skills[Number(ability[0]) - 1].min_damage +
                  1
              ) + element.skills[Number(ability[0]) - 1].min_damage;
            if (elem.health === true) {
              element.hp += damage;
              addHealthViewAlly[0] = element.id;
              addHealthViewAlly[1] = damage.toString();
              damage = 0;
              if (element.hp > element.maxHp) {
                element.hp = element.maxHp;
              }
            }
          }
        });
      }
    });

    if (!damage) {
      damage = 0;
    }
    chooseEnemy.hp -= damage;
    addAtackViewEnemy[1] = damage.toString();

    if (
      allEnemy[0].hp <= 0 &&
      allEnemy[1].hp <= 0 &&
      allEnemy[2].hp <= 0 &&
      allEnemy[3].hp <= 0
    ) {
      //and round
      addEnemy();
      setEnemy([
        "1",
        "persone active_persone",
        "persone",
        "persone",
        "persone",
      ]);
      setRound(round + 1);
    } else {
      let randomEnemy = eval("Enemy" + (getRandomInt(4) + 1));
      while (randomEnemy.hp <= 0) {
        randomEnemy = eval("Enemy" + (getRandomInt(4) + 1));
      }
      let randomEnemySkill = getRandomInt(randomEnemy.skills.length);
      while (
        randomEnemy.skills[randomEnemySkill].health == true &&
        randomEnemy.hp == randomEnemy.maxHp
      ) {
        randomEnemySkill = getRandomInt(randomEnemy.skills.length);
      }
      let damage =
        getRandomInt(
          randomEnemy.skills[randomEnemySkill].max_damage -
            randomEnemy.skills[randomEnemySkill].min_damage +
            1
        ) + randomEnemy.skills[randomEnemySkill].min_damage;
      if (randomEnemy.skills[randomEnemySkill].health == true) {
        addHealthViewEnemy[0] = randomEnemy.id;
        addHealthViewEnemy[1] = damage;
        randomEnemy.hp += damage;
        if (randomEnemy.hp > randomEnemy.maxHp) {
          randomEnemy.hp = randomEnemy.maxHp;
        }
        damage = 0;
      }
      let randomAllyNum = getRandomInt(4);
      while (allAlly[randomAllyNum].hp <= 0) {
        randomAllyNum = getRandomInt(4);
      }
      allAlly[randomAllyNum].hp -= damage;
      addAtackViewAlly[0] = allAlly[randomAllyNum].id;
      addAtackViewAlly[1] = damage;
      if (chooseEnemy.hp <= 0) {
        let randomEnemyNumNewChoise = getRandomInt(4);
        while (allEnemy[randomEnemyNumNewChoise].hp <= 0) {
          randomEnemyNumNewChoise = getRandomInt(4);
        }
        randomEnemyNumNewChoise += 1;
        const newArr = [
          randomEnemyNumNewChoise.toString(),
          "persone",
          "persone",
          "persone",
          "persone",
        ];
        newArr[chooseEnemy.id] = "none_true";
        for (let i = 1; i < 5; i++) {
          if (enemy[i] == "none_true") {
            newArr[i] = "none_true";
          }
        }
        setEnemy(newArr);
      }
      if (allAlly[randomAllyNum].hp <= 0) {
        if (
          allAlly[0].hp <= 0 &&
          allAlly[1].hp <= 0 &&
          allAlly[2].hp <= 0 &&
          allAlly[3].hp <= 0
        ) {
          alert("Проиграл спустя " + turn + " ходов и " + round + " раунд");
          location.reload();
        } else {
          const newArr = [
            ally[0],
            "",
            "",
            "",
            "",
            "persone",
            "persone",
            "persone",
            "persone",
          ];
          if (allAlly[Number(ally[0]) - 5].hp <= 0) {
            let randomAllyNumNewChoise = getRandomInt(4);
            while (allAlly[randomAllyNumNewChoise].hp <= 0) {
              randomAllyNumNewChoise = getRandomInt(4);
            }
            randomAllyNumNewChoise += 5;
            newArr[0] = randomAllyNumNewChoise.toString();
          }
          newArr[Number(allAlly[randomAllyNum].id)] = "none_true";
          for (let i = 5; i < 9; i++) {
            if (ally[i] == "none_true") {
              newArr[i] = "none_true";
            }
          }
          setAlly(newArr);
        }
      }
    }
  }

  //site
  return (
    <div className="battle">
      <p className="turn">Раунд {turn}</p>
      <div className="sqare">
        <div className="ally">
          {allAlly.map((item) => (
            <Persone
              {...item}
              changeEnemyActive={changeAllyActive}
              persone={ally}
              turn={turn}
              who={"ally"}
              addAtackView={addAtackViewAlly}
              addHealthView={addHealthViewAlly}
              round={round}
              key={item.id}
            ></Persone>
          ))}
        </div>
        <div className="enemy">
          {allEnemy.map((item) => (
            <Persone
              {...item}
              changeEnemyActive={changeEnemyActive}
              persone={enemy}
              turn={turn}
              who={"enemy"}
              addAtackView={addAtackViewEnemy}
              addHealthView={addHealthViewEnemy}
              round={round}
              key={item.id}
            ></Persone>
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
          <div
            onClick={() => changeAbilityActive(4)}
            className={ability[4]}
          ></div>
        </div>
        <div className="ability_description">
          <p className="name">
            {allAlly[Number(ally[0]) - 5].skills[Number(ability[0]) - 1].name}
          </p>
          <p className="description">
            {
              allAlly[Number(ally[0]) - 5].skills[Number(ability[0]) - 1]
                .description
            }
          </p>
          <p className="damage">
            {(allAlly[Number(ally[0]) - 5].skills[Number(ability[0]) - 1]
              .health &&
              "Лечение ") ||
              "Урон "}
            {
              allAlly[Number(ally[0]) - 5].skills[Number(ability[0]) - 1]
                .min_damage
            }
            -
            {
              allAlly[Number(ally[0]) - 5].skills[Number(ability[0]) - 1]
                .max_damage
            }
          </p>
        </div>
        <div onClick={() => atack()} className="and_turn">
          <p>Завершить ход</p>
        </div>
      </div>
    </div>
  );
}
