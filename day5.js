import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day5-data.txt").toString("utf-8").split("\n");
}

function main1() {
  const data = loadData();

  let seeds = data[0]
    .substring(data[0].indexOf(":") + 2)
    .split(" ")
    .map((s) => parseInt(s));

  let i = 1;
  while (i < data.length) {
    // get next map
    const map = [];
    while (data[i] !== "" && i < data.length) {
      map.push(data[i].split(" ").map((s) => parseInt(s)));
      i += 1;
    }
    // apply map based on
    seeds = seeds.map((seed) => {
      for (const mapEntry of map) {
        const destinationStart = mapEntry[0];
        const sourceStart = mapEntry[1];
        const range = mapEntry[2];

        if (seed >= sourceStart && seed < sourceStart + range) {
          return seed + (destinationStart - sourceStart);
        }
      }
      return seed;
    });
    i += 2;
  }
  return Math.min(...seeds);
}

function main2() {
  const data = loadData();

  const seedsLine = data[0]
    .substring(data[0].indexOf(":") + 2)
    .split(" ")
    .map((s) => parseInt(s));

  let seeds = [];
  let i = 1;
  for (let i = 1; i < seedsLine.length; i += 2) {
    const baseNumber = seedsLine[i - 1];
    const range = seedsLine[i];
    for (let j = 0; j < range; j++) {
      seeds.push(baseNumber + j);
    }
  }
  console.log(seeds);

  i = 1;
  while (i < data.length) {
    const map = [];
    while (data[i] !== "" && i < data.length) {
      map.push(data[i].split(" ").map((s) => parseInt(s)));
      i += 1;
    }
    seeds = seeds.map((seed) => {
      for (const mapEntry of map) {
        const destinationStart = mapEntry[0];
        const sourceStart = mapEntry[1];
        const range = mapEntry[2];

        if (seed >= sourceStart && seed < sourceStart + range) {
          return seed + (destinationStart - sourceStart);
        }
      }
      return seed;
    });
    i += 2;
  }
  console.log(seeds);
  return Math.min(...seeds);
}

console.log("Solution to problem 1:", main1());
console.log("Solution to problem 2:", main2());
