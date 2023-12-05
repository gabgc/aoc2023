import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day4-data.txt").toString("utf-8").split("\n");
}

function main1() {
  return loadData()
    .map((card) => {
      let points = 0;
      const winningNumbers = card
        .substring(card.indexOf(":") + 2, card.indexOf("|") - 1)
        .match(/\d+/g);
      const cardNumbers = card.substring(card.indexOf("|") + 2).match(/\d+/g);
      for (let num of cardNumbers) {
        if (winningNumbers.includes(num)) {
          points += 1;
        }
      }
      return points === 0 ? 0 : Math.pow(2, points - 1);
    })
    .reduce((prev, curr) => (prev += curr));
}

console.log("Solution to problem 1:", main1());
