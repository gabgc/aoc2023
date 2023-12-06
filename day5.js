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

  const maps = [];
  let i = 3;
  while (i < data.length) {
    const map = [];
    while (data[i] !== "" && i < data.length) {
      map.push(data[i].split(" ").map((s) => parseInt(s)));
      i += 1;
    }
    maps.push(map);
    i += 2;
  }

  let minimum = Number.MAX_SAFE_INTEGER;
  for (let idx = 1; idx < seedsLine.length; idx += 2) {
    const baseNumber = seedsLine[idx - 1];
    const range = seedsLine[idx];
    console.log("Starting with seed", baseNumber, "until", baseNumber + range);
    for (let offset = 0; offset < range; offset++) {
      let seed = baseNumber + offset;
      const temp = seed;
      for (let x = 0; x < maps.length; x++) {
        const mapEntry = maps[x];
        for (let y = 0; y < mapEntry.length; y++) {
          const destinationStart = mapEntry[y][0];
          const sourceStart = mapEntry[y][1];
          const range = mapEntry[y][2];
          if (seed >= sourceStart && seed < sourceStart + range) {
            seed = seed + (destinationStart - sourceStart);
            break;
          }
        }
      }
      minimum = Math.min(minimum, seed);
    }
    console.log(minimum);
  }
  return minimum;
}

console.log("Solution to problem 1:", main1());
console.log("Solution to problem 2:", main2());
