import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day2-data.txt").toString("utf-8").split("\n");
}

function main1() {
  const RED_CUBES_LIMIT = 12;
  const GREEN_CUBES_LIMIT = 13;
  const BLUE_CUBES_LIMIT = 14;

  const possibleGameIds = [];

  function gameIsPossible(gameRounds) {
    for (let play of gameRounds) {
      play = play.split(", ");
      for (let cube of play) {
        cube = cube.split(" ");
        const colorNumber = cube[0];
        const color = cube[1];
        //console.log(colorNumber, color);

        if (color === "red" && colorNumber > RED_CUBES_LIMIT) {
          return false;
        }
        if (color === "green" && colorNumber > GREEN_CUBES_LIMIT) {
          return false;
        }
        if (color === "blue" && colorNumber > BLUE_CUBES_LIMIT) {
          return false;
        }
      }
    }
    return true;
  }

  for (let line of loadData()) {
    const separateGameIdStr = line.split(":");
    // get game id
    const gameId = parseInt(separateGameIdStr[0].substring(4));
    // separate game rounds
    const gameRounds = separateGameIdStr[1].split(";").map((s) => s.trim());

    if (gameIsPossible(gameRounds)) {
      console.log(gameId, gameRounds, "is possible");
      possibleGameIds.push(gameId);
    }
  }
  console.log(possibleGameIds.reduce((prev, curr) => (prev += curr)));
}

function main2() {
  const powerOfSets = loadData().map((line) => {
    const separateGameIdStr = line.split(":");
    // get game id
    const gameId = parseInt(separateGameIdStr[0].substring(4));
    // separate game rounds
    const gameRounds = separateGameIdStr[1].split(";").map((s) => s.trim());

    let leastReds = 0;
    let leastGreens = 0;
    let leastBlues = 0;

    for (let play of gameRounds) {
      play = play.split(", ");
      for (let cube of play) {
        cube = cube.split(" ");
        const colorNumber = parseInt(cube[0]);
        const color = cube[1];
        if (color === "red" && colorNumber > leastReds) {
          leastReds = colorNumber;
        }
        if (color === "green" && colorNumber > leastGreens) {
          leastGreens = colorNumber;
        }
        if (color === "blue" && colorNumber > leastBlues) {
          leastBlues = colorNumber;
        }
      }
    }

    const powerOfSet = leastReds * leastGreens * leastBlues;
    console.log(
      "GameID:",
      gameId,
      "leasts:",
      leastReds,
      leastGreens,
      leastBlues,
      "powerOfSets:",
      powerOfSet
    );
    return powerOfSet;
  });
  console.log(
    "Power Of Sets:",
    powerOfSets.reduce((prev, curr) => (prev += curr))
  );
}

main1();
main2();
