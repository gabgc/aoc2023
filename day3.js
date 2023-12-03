import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day3-data.txt").toString("utf-8").split("\n");
}

function main1() {
  const data = loadData();

  const partNumbers = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const char = data[i][j];
      if (char !== "." && isNaN(parseInt(char))) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          let currY = i + yOffset;
          if (currY < 0 || currY > data[i].length) {
            continue;
          }
          let xOffset = -1;
          while (xOffset <= 1) {
            let currX = j + xOffset;
            let maybeNumber = "";
            while (currX >= 0 && !isNaN(parseInt(data[currY][currX]))) {
              // walk left
              maybeNumber = data[currY][currX] + maybeNumber;
              currX = currX - 1;
            }
            currX = j + xOffset + 1;
            if (maybeNumber === "" && xOffset === 1) break;
            while (
              currX < data[i].length &&
              !isNaN(parseInt(data[currY][currX]))
            ) {
              // walk right
              maybeNumber = maybeNumber + data[currY][currX];
              xOffset += 1;
              currX = currX + 1;
            }
            if (maybeNumber !== "") {
              partNumbers.push(parseInt(maybeNumber));
            }
            xOffset += 1;
          }
        }
      }
    }
  }
  console.log(partNumbers.reduce((prev, curr) => (prev += curr)));
}

main1();
