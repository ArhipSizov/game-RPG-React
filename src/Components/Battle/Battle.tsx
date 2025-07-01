import "./Battle.scss";
import { useEffect, useState } from "react";

import AllEnemyDB from "./DataBase/AllEnemy.json";
import AllAllyDB from "./DataBase/AllAlly.json";
import EffectsDB from "./DataBase/Effects.json";
import Persone from "./Persone/Persone.tsx";
import SkillTree from "./SkillTree/SkillTree.tsx";

import getRandomInt from "../../Utils/Random.ts";

interface tipe {
  difficult: number;
}

interface Effects {
  id: string;
  img: string;
  name: string;
  type: string;
  count: number;
  countTime: number;
}

interface Ability {
  id: string;
  name: string;
  position: string[];
  min_damage: number;
  max_damage: number;
  description: string;
  mass?: true;
  effect?: string[];
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
  defaultDamage: number;
  description: string;
  difficult: number;
  skills: Ability[];
  effect?: Effects[];
}

export default function Battle({ difficult }: tipe) {
  const [turn, setTurn] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [defaultDifficult, setDefaultDifficult] = useState<number>(1);

  function selectedAlly() {
    return allAlly[Number(ally[0]) - 5];
  }

  //Difficult up

  useEffect(() => {
    if (round % 3 == 2) {
      if (defaultDifficult !== 5) {
        setDefaultDifficult(defaultDifficult + 1);
      }
    }
  }, [round]);

  //level up

  const [showSkillTree, setShowSkillTree] = useState<boolean>(false);
  const [notLearnSkill, setNotLearnSkill] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<Ability>();

  useEffect(() => {
    if (newSkill) {
      selectedAlly().skills[selectedAlly().skills.length] = newSkill;
    }
    changeAbilityActive(Number(ability[0]));
  }, [newSkill]);

  function levelUpAlly(chooseEnemy: Character) {
    selectedAlly().exp += chooseEnemy.exp;
    while (
      selectedAlly().exp >=
      selectedAlly().lv * selectedAlly().lv - selectedAlly().lv + 1
    ) {
      Object.values(AllAllyDB).forEach((allyArr) => {
        if (
          allyArr.name == selectedAlly().name &&
          allyArr.skills[selectedAlly().skills.length] != undefined &&
          ability[4] !== "ability_persone"
        ) {
          const newArr = [];
          setShowSkillTree(true);
          newArr[0] = selectedAlly().name;
          for (let i = 0; i < allyArr.skills.length; i++) {
            newArr[i + 1] = (i + 1).toString();
          }
          for (let i = 0; i < allyArr.skills.length; i++) {
            if (selectedAlly().skills[i] !== undefined) {
              newArr.forEach(function (element) {
                if (element !== selectedAlly().skills[i].id) {
                  newArr[Number(selectedAlly().skills[i].id)] = undefined;
                }
              });
            }
          }
          setNotLearnSkill(newArr);
        }
      });
      selectedAlly().exp -=
        selectedAlly().lv * selectedAlly().lv - selectedAlly().lv + 1;
      selectedAlly().lv += 1;
      selectedAlly().maxHp += selectedAlly().lv;
      selectedAlly().defaultDamage += 1;
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
    defaultDamage: 0,
    description: "",
    difficult: 0,
    effect: [],
    skills: [
      {
        id: "1",
        name: "Firebol",
        position: ["1"],
        effect: ["1"],
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
    defaultDamage: 0,
    description: "",
    difficult: 0,
    effect: [],
    skills: [
      {
        id: "1",
        name: "nothin",
        position: ["1"],
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
      const difficultTrue = Math.round((difficult * defaultDifficult) / 2);
      while (enemyTrue.difficult != difficultTrue) {
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
    "0",
    "persone",
    "persone",
    "persone",
    "persone",
  ]);

  function changeEnemyActive(num: number) {
    if (!selectedAlly().skills[Number(ability[0]) - 1].health) {
      function trueElems(element: string) {
        let elemNum = Number(element);
        elemNum += defaultAdd;
        return elemNum.toString();
      }
      function changeEnemyActiveMainFunc(number: string) {
        const newArr = [number, "persone", "persone", "persone", "persone"];
        defaultAdd = 0;
        for (let i = 1; i < 5; i++) {
          let allElements;
          while (enemy[i + defaultAdd] == "none_true") {
            defaultAdd += 1;
          }

          if (
            selectedAlly().skills[Number(ability[0]) - 1].position[
              i - 1 - howRange
            ]
          ) {
            allElements = trueElems(
              selectedAlly().skills[Number(ability[0]) - 1].position[
                i - 1 - howRange
              ]
            );
          }
          if (Number(allElements) > 4) {
            allElements = "4";
          }
          if (Number(allElements)) {
            if (selectedAlly().skills[Number(ability[0]) - 1].mass) {
              newArr[Number(allElements)] = "persone active_persone";
            } else {
              newArr[Number(allElements)] = "persone can_be_active_persone";
            }
          }
          if (enemy[i] == "none_true") {
            if (Number(number) == i) {
              let numNumber = Number(number);
              numNumber += 1;
              number = numNumber.toString();
              newArr[0] = number;
            }
            newArr[i] = "none_true";
          }
        }

        newArr[Number(number)] = "persone active_persone";
        setEnemy(newArr);
      }

      const numString = num.toString();
      let defaultAdd = 0;
      let lastElement = "0";
      let doFunc = false;
      let howRange = 0;
      while (
        Number(selectedAlly().skills[Number(ability[0]) - 1].position[0]) -
          howRange !=
        1
      ) {
        howRange += 1;
      }
      for (let i = 1; i < 5; i++) {
        while (enemy[i + defaultAdd] == "none_true") {
          defaultAdd += 1;
        }
        const allElements = trueElems(
          selectedAlly().skills[Number(ability[0]) - 1].position[i - 1]
        );
        if (lastElement == "0") {
          lastElement = allElements;
        }

        if (allElements == numString) {
          doFunc = true;
          changeEnemyActiveMainFunc(allElements);
        }
      }
      if (doFunc == false) {
        changeEnemyActiveMainFunc(lastElement);
      }

      const newArrAlly = [
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
      newArrAlly[Number(ally[0])] = "persone active_persone";
      for (let i = 5; i < 9; i++) {
        if (ally[i] == "none_true") {
          newArrAlly[i] = "none_true";
        }
      }
      setAlly(newArrAlly);
    } else {
      const newArrEnemy = ["0", "persone", "persone", "persone", "persone"];
      for (let i = 1; i < 5; i++) {
        if (enemy[i] == "none_true") {
          newArrEnemy[i] = "none_true";
        }
      }
      setEnemy(newArrEnemy);
      if (selectedAlly().skills[Number(ability[0]) - 1].mass) {
        const newArrAlly = [
          ally[0],
          "",
          "",
          "",
          "",
          "persone persone_health",
          "persone persone_health",
          "persone persone_health",
          "persone persone_health",
        ];
        newArrAlly[Number(ally[0])] = "persone active_persone";
        for (let i = 5; i < 9; i++) {
          if (ally[i] == "none_true") {
            newArrAlly[i] = "none_true";
          }
        }
        setAlly(newArrAlly);
      }
    }
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
    changeAllyActive(Number(ally[0]));
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

  //\

  useEffect(() => {
    changeEnemyActive(Number(enemy[0]));
  }, [ally[0], enemy[0], ability[0]]);

  //atack

  const [addAtackViewEnemy] = useState<string[]>(["0", "0", "false"]);
  const [addAtackViewAlly] = useState<string[]>(["0", "0", "false"]);
  const [addHealthViewEnemy] = useState<string[]>(["0", "0", "false"]);
  const [addHealthViewAlly] = useState<string[]>(["0", "0", "false"]);

  function atack() {
    function killEnemy(enemyChoose: Character, isEffect?: boolean) {
      enemyChoose.effect = undefined;
      newArrEnemy[Number(enemyChoose.id)] = "none_true";
      for (let i = 1; i < 5; i++) {
        if (enemy[i] == "none_true") {
          newArrEnemy[i] = "none_true";
        }
      }
      setEnemy(newArrEnemy);
      if (!isEffect) {
        levelUpAlly(enemyChoose);
      }
    }
    let chooseEnemy!: Character;
    let damage: number = 0;
    const newArrEnemy = [
      (Number(enemy[0]) + 1).toString(),
      "persone",
      "persone",
      "persone",
      "persone",
    ];

    for (let i = 1; i < 5; i++) {
      const enemyTrue = "Enemy" + i;
      if (eval(enemyTrue + ".id") == enemy[0]) {
        chooseEnemy = eval(enemyTrue);
        addAtackViewEnemy[0] = i.toString();
      }
    }

    let skillAlly!: Ability;
    allAlly.forEach((element) => {
      if (ally[0] == element.id) {
        element.skills.forEach((elem, index) => {
          if (ability[0] == (index + 1).toString()) {
            skillAlly = element.skills[Number(ability[0]) - 1];
            damage =
              getRandomInt(skillAlly.max_damage - skillAlly.min_damage + 1) +
              skillAlly.min_damage +
              element.defaultDamage;
            if (critView == true) {
              if (skillAlly.crit) {
                if (getRandomInt(100 / skillAlly.crit) == 0) {
                  damage = Math.round(damage * 1.5);
                  if (elem.health === true) {
                    addHealthViewAlly[2] = "true";
                  } else {
                    addAtackViewEnemy[2] = "true";
                  }
                }
              }
            }
            if (chooseEnemy?.effect) {
              chooseEnemy.effect.forEach((element) => {
                if (element.type == "damage_buff") {
                  damage = Math.round(damage * element.count);
                  element.countTime -= 1;
                }
              });
            }

            if (elem.health === true) {
              if (elem.mass === true) {
                for (let i = 0; i < 4; i++) {
                  damage =
                    getRandomInt(
                      skillAlly.max_damage - skillAlly.min_damage + 1
                    ) +
                    skillAlly.min_damage +
                    selectedAlly().defaultDamage;
                  allAlly[i].hp += damage;
                  if (allAlly[i].hp > allAlly[i].maxHp) {
                    allAlly[i].hp = allAlly[i].maxHp;
                  }
                }
              } else {
                element.hp += damage;
                addHealthViewAlly[0] = element.id;
                addHealthViewAlly[1] = damage.toString();
                if (element.hp > element.maxHp) {
                  element.hp = element.maxHp;
                }
              }
              damage = 0;
            }
          }
        });
      }
    });

    if (!damage) {
      damage = 0;
    }

    let defaultAdd = 0;
    if (skillAlly.mass) {
      let howRange = 0;
      while (
        Number(selectedAlly().skills[Number(ability[0]) - 1].position[0]) -
          howRange !=
        1
      ) {
        howRange += 1;
      }
      for (let i = 1; i < 5; i++) {
        if (!skillAlly.health) {
          damage =
            getRandomInt(skillAlly.max_damage - skillAlly.min_damage + 1) +
            skillAlly.min_damage +
            selectedAlly().defaultDamage;
        }
        while (enemy[i + defaultAdd] == "none_true") {
          defaultAdd += 1;
        }

        if (
          allEnemy[
            Number(skillAlly.position[i - 1 - howRange]) - 1 + defaultAdd
          ]
        ) {
          allEnemy[
            Number(skillAlly.position[i - 1 - howRange]) - 1 + defaultAdd
          ].hp -= damage;
          if (
            allEnemy[
              Number(skillAlly.position[i - 1 - howRange]) - 1 + defaultAdd
            ].hp <= 0
          ) {
            killEnemy(
              allEnemy[
                Number(skillAlly.position[i - 1 - howRange]) - 1 + defaultAdd
              ]
            );
          }
        }
      }
    } else {
      if (damage) {
        chooseEnemy.hp -= damage;
      }
    }

    //effects
    function checkDamageEffect(element: Character) {
      if (element.effect) {
        if (element.effect[0]) {
          element.effect.forEach((effect) => {
            if (effect.type == "damage") {
              element.hp -= effect.count;
              effect.countTime -= 1;
              if (effect.countTime <= 0) {
                if (element.effect) {
                  const filteredArr = element.effect.filter(function (eff) {
                    return eff !== effect;
                  });
                  element.effect = filteredArr;
                }
              }
              if (element.hp <= 0) {
                killEnemy(element, true);
              }
            }
          });
        }
        if (element.hp > element.maxHp) {
          element.hp = element.maxHp;
        }
      }
    }

    allEnemy.forEach((element) => {
      checkDamageEffect(element);
    });
    allAlly.forEach((element) => {
      checkDamageEffect(element);
    });

    if (skillAlly.effect) {
      function addEffect(element: Effects, enemyChoose: Character) {
        if (enemyChoose.effect) {
          if (element.type != "damage" && enemyChoose.effect?.length > 0) {
            enemyChoose.effect?.forEach((element) => {
              if (skillAlly.effect) {
                element.countTime +=
                  getRandomInt(
                    Number(skillAlly.effect[2]) -
                      Number(skillAlly.effect[1]) +
                      1
                  ) + Number(skillAlly.effect[1]);
              }
            });
          } else if (skillAlly.effect) {
            let newArr: Effects[] = [...enemyChoose.effect] as Effects[];
            if (enemyChoose.effect?.length !== 0) {
              newArr.push(element);
              newArr[newArr.length - 1].countTime +=
                getRandomInt(
                  Number(skillAlly.effect[2]) - Number(skillAlly.effect[1]) + 1
                ) + Number(skillAlly.effect[1]);
            } else {
              newArr = [];
              newArr[0] = element;
              newArr[0].countTime +=
                getRandomInt(
                  Number(skillAlly.effect[2]) - Number(skillAlly.effect[1]) + 1
                ) + Number(skillAlly.effect[1]);
            }
            enemyChoose.effect = newArr;
          }
        }
      }
      Object.values(EffectsDB).forEach(({ ...element }) => {
        if (skillAlly.effect) {
          if (element.id == skillAlly.effect[0]) {
            let allPersone = allEnemy;
            let persone = chooseEnemy;
            if (skillAlly.health) {
              allPersone = allAlly;
              persone = selectedAlly();
            }
            if (skillAlly.mass) {
              const seveDefaultAdd = defaultAdd;
              if (allPersone == allAlly) {
                defaultAdd = 0;
              }
              skillAlly.position.forEach((elementPosition) => {
                const trueEffect = { ...element };
                if (allPersone[Number(elementPosition) - 1 + defaultAdd]) {
                  addEffect(
                    trueEffect,
                    allPersone[Number(elementPosition) - 1 + defaultAdd]
                  );
                }
              });
              defaultAdd = seveDefaultAdd;
            } else {
              addEffect(element, persone);
            }
          }
        }
      });
    }

    addAtackViewEnemy[1] = damage.toString();

    setTurn(turn + 1);
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
      if (randAlly?.effect) {
        randAlly.effect.forEach((element) => {
          if (element.type == "damage_buff") {
            damage = Math.round(damage * element.count);
            element.countTime -= 1;
          }
        });
      }
      randAlly.hp -= damage;
      addAtackViewAlly[0] = randAlly.id;
      addAtackViewAlly[1] = damage;

      if (chooseEnemy) {
        if (chooseEnemy.hp <= 0) {
          chooseEnemy.effect = [];
          let randomEnemyNumNewChoise = getRandomInt(4);
          while (allEnemy[randomEnemyNumNewChoise].hp <= 0) {
            randomEnemyNumNewChoise = getRandomInt(4);
          }
          randomEnemyNumNewChoise += 1;
          killEnemy(chooseEnemy);
          newArrEnemy[0] = randomEnemyNumNewChoise.toString();
        }
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
      {showSkillTree && (
        <SkillTree
          notLearnSkill={notLearnSkill}
          setShowSkillTree={setShowSkillTree}
          setNewSkill={setNewSkill}
        />
      )}
      <img
        className="backround_img"
        src={"/map/" + difficult + ".png"}
        alt=""
      />
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
          <p className="position">
            Возможно действие на -
            {selectedAlly().skills[Number(ability[0]) - 1].position.map(
              (item, index) => (
                <b key={index}>{item}, </b>
              )
            )}
            {selectedAlly().skills[Number(ability[0]) - 1].mass && "массовая"}
          </p>
          <p className="damage">
            {(selectedAlly().skills[Number(ability[0]) - 1].health &&
              "Лечение ") ||
              "Урон "}
            {selectedAlly().skills[Number(ability[0]) - 1].min_damage}-
            {selectedAlly().skills[Number(ability[0]) - 1].max_damage}
            {" + "}
            {selectedAlly().defaultDamage}
          </p>
          <div className="effects">
            {selectedAlly().skills[Number(ability[0]) - 1].effect &&
              [
                Object.values(
                  Object.values(EffectsDB)[
                    Number(
                      selectedAlly().skills[Number(ability[0]) - 1].effect![0]
                    ) - 1
                  ]
                ),
              ].map((item) => (
                <div key={item && item[0]}>
                  <p>
                    {item && item[2]} на{" "}
                    {selectedAlly().skills[Number(ability[0]) - 1].effect![1]}
                    {selectedAlly().skills[Number(ability[0]) - 1]
                      .effect![2] !==
                      selectedAlly().skills[Number(ability[0]) - 1]
                        .effect![1] &&
                      "-" +
                        selectedAlly().skills[Number(ability[0]) - 1]
                          .effect![2]}
                    ход/а
                  </p>
                </div>
              ))}
          </div>
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
