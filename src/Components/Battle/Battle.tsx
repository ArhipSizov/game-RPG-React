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
  crit?: number;
  health?: boolean;
}

interface Character {
  id: string;
  lv: number;
  exp: number;
  name: string;
  hp: number;
  maxHp: number;
  description: string;
  difficult: number;
  skills: Ability[];
}

export default function Battle({ difficult }: tipe) {
  const [turn, setTurn] = useState<number>(0);
  const [round, setRound] = useState<number>(0);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function selectedAlly() {
    return allAlly[Number(ally[0]) - 5];
  }

  //level up

  function levelUpAlly(chooseEnemy: Character) {
    selectedAlly().exp += chooseEnemy.exp;
    while (selectedAlly().exp > selectedAlly().lv) {
      Object.values(AllAllyDB).forEach((allyArr) => {
        if (
          allyArr.name == selectedAlly().name &&
          allyArr.skills[selectedAlly().skills.length] != undefined
        ) {
          selectedAlly().skills[selectedAlly().skills.length] =
            allyArr.skills[selectedAlly().skills.length];
        }
      });
      console.log(selectedAlly());
      selectedAlly().exp -= selectedAlly().lv;
      selectedAlly().lv += 1;
      selectedAlly().maxHp += 2;
      selectedAlly().hp = selectedAlly().maxHp;
      changeAbilityActive(Number(ability[0]));
    }
  }

  //declare ally
  const [Ally5, setAlly5] = useState<Character>({
    id: "1",
    lv: 0,
    exp: 0,
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
        crit: 0,
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
      const firstSkill = allyTrue.skills[0];
      allyTrue.id = i.toString();
      allyTrue.skills = [];
      allyTrue.skills[0] = firstSkill;
      setAllyTrue(allyTrue);
    }
  }

  const [allAlly, setAllAlly] = useState<Character[]>([Ally5]);

  //declare enemy
  const [Enemy1, setEnemy1] = useState<Character>({
    id: "1",
    lv: 0,
    exp: 0,
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
        crit: 0,
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
    setEnemy(["1", "persone active_persone", "persone", "persone", "persone"]);
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

  //Crit view

  const [critView, setCritView] = useState<boolean>(true);
  function critViewChange(allyNum: number, abilityNum: number) {
    if (
      allAlly[Number(allyNum) - 5].skills[Number(abilityNum) - 1].crit !=
      undefined
    ) {
      setCritView(true);
    } else {
      setCritView(false);
    }
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
    for (let i = 0; i < selectedAlly().skills.length + 1; i++) {
      newArrAbility[0] = numString;
      newArrAbility[i] = "ability_persone";
    }
    newArrAbility[num] = "ability_persone active_ability";
    critViewChange(Number(ally[0]), num);
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
    critViewChange(num, 1);
    setAlly(newArr);
  }

  //atack

  const [addAtackViewEnemy] = useState<string[]>(["0", "0", "false"]);
  const [addAtackViewAlly] = useState<string[]>(["0", "0", "false"]);
  const [addHealthViewEnemy] = useState<string[]>(["0", "0", "false"]);
  const [addHealthViewAlly] = useState<string[]>(["0", "0", "false"]);

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
            const skill = element.skills[Number(ability[0]) - 1];
            damage =
              getRandomInt(skill.max_damage - skill.min_damage + 1) +
              skill.min_damage;
            if (critView == true) {
              if (skill.crit) {
                if (getRandomInt(100 / skill.crit) == 0) {
                  damage = Math.round(damage * 1.5);
                  if (elem.health === true) {
                    addHealthViewAlly[2] = "true";
                  } else {
                    addAtackViewEnemy[2] = "true";
                  }
                }
              }
            }

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
      levelUpAlly(chooseEnemy);
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
      let randomEnemySkillNumber = getRandomInt(randomEnemy.skills.length);
      let randomEnemySkill = randomEnemy.skills[randomEnemySkillNumber];
      while (
        randomEnemySkill.health == true &&
        randomEnemy.hp == randomEnemy.maxHp
      ) {
        randomEnemySkillNumber = getRandomInt(randomEnemy.skills.length);
        randomEnemySkill = randomEnemy.skills[randomEnemySkillNumber];
      }
      let damage =
        getRandomInt(
          randomEnemySkill.max_damage - randomEnemySkill.min_damage + 1
        ) + randomEnemySkill.min_damage;
      if (randomEnemySkill.crit != undefined) {
        if (getRandomInt(100 / randomEnemySkill.crit) == 0) {
          damage = Math.round(damage * 1.5);
          if (randomEnemySkill.health === true) {
            addHealthViewEnemy[2] = "true";
          } else {
            addAtackViewAlly[2] = "true";
          }
        }
      }
      if (randomEnemySkill.health == true) {
        addHealthViewEnemy[0] = randomEnemy.id;
        addHealthViewEnemy[1] = damage;
        randomEnemy.hp += damage;
        if (randomEnemy.hp > randomEnemy.maxHp) {
          randomEnemy.hp = randomEnemy.maxHp;
        }
        damage = 0;
      }
      let randomAllyNum = getRandomInt(4);
      let randAlly = allAlly[randomAllyNum];
      while (randAlly.hp <= 0) {
        randomAllyNum = getRandomInt(4);
        randAlly = allAlly[randomAllyNum];
      }
      randAlly.hp -= damage;
      addAtackViewAlly[0] = randAlly.id;
      addAtackViewAlly[1] = damage;

      console.log(selectedAlly());

      console.log(Object.values(AllAllyDB));
      if (chooseEnemy.hp <= 0) {
        levelUpAlly(chooseEnemy);
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
      if (randAlly.hp <= 0) {
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
          if (selectedAlly().hp <= 0) {
            let randomAllyNumNewChoise = getRandomInt(4);
            while (allAlly[randomAllyNumNewChoise].hp <= 0) {
              randomAllyNumNewChoise = getRandomInt(4);
            }
            randomAllyNumNewChoise += 5;
            newArr[0] = randomAllyNumNewChoise.toString();
          }
          newArr[Number(randAlly.id)] = "none_true";
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
            {selectedAlly().skills[Number(ability[0]) - 1].name}
          </p>
          <p className="description">
            {selectedAlly().skills[Number(ability[0]) - 1].description}
          </p>
          <p className="damage">
            {(selectedAlly().skills[Number(ability[0]) - 1].health &&
              "Лечение ") ||
              "Урон "}
            {selectedAlly().skills[Number(ability[0]) - 1].min_damage}-
            {selectedAlly().skills[Number(ability[0]) - 1].max_damage}
          </p>
          <p className="crit">
            {critView && "Крит "}
            {selectedAlly().skills[Number(ability[0]) - 1].crit}
            {critView && "%"}
          </p>
        </div>
        <div onClick={() => atack()} className="and_turn">
          <p>Завершить ход</p>
        </div>
      </div>
    </div>
  );
}
