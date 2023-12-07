import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day6-data.txt").toString("utf-8").split("\n");
}

const file = loadData();

function main1(file) {
  const timeArr = file[0].match(/\d+/g).map((s) => parseInt(s));
  const recordDistanceArr = file[1].match(/\d+/g).map((s) => parseInt(s));
  const data = timeArr.map((s, i) => ({
    time: s,
    recordDistance: recordDistanceArr[i],
  }));

  return data
    .map((e) => {
      let marginOfError = 0;
      for (let i = 0; i < e.time + 1; i++) {
        if (i * (e.time - i) > e.recordDistance) {
          marginOfError += 1;
        }
      }
      return marginOfError;
    })
    .reduce((prev, curr) => prev * curr);
}

function main2(file) {
  const time = parseInt(file[0].match(/\d+/g).reduce((p, c) => (p += c)));
  const recordDistance = parseInt(
    file[1].match(/\d+/g).reduce((p, c) => (p += c))
  );
  let marginOfError = 0;
  for (let i = 0; i < time + 1; i++) {
    if (i * (time - i) > recordDistance) {
      marginOfError += 1;
    }
  }
  return marginOfError;
}

console.log("Solution for p1:", main1(file));
console.log("Solution for p2:", main2(file));
