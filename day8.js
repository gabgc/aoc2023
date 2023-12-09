import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day8-data.txt").toString("utf-8").split("\n");
}

function buildNodeMap(data) {
  const nodeMap = {};
  for (let i = 2; i < data.length; i++) {
    const line = data[i];
    const node = line.substring(0, 3);
    const directions = line.substring(7, 15).split(", ");
    const left = directions[0];
    const right = directions[1];
    nodeMap[node] = { L: left, R: right };
  }
  return nodeMap;
}

// LCM algo from: https://www.30secondsofcode.org/js/s/lcm/
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

function main1() {
  const data = loadData();
  const directionArr = data[0];
  const nodeMap = buildNodeMap(data);

  let numberOfSteps = 0;
  let currentNode = "AAA";
  while (currentNode !== "ZZZ") {
    const currentDirection = directionArr[numberOfSteps % directionArr.length];
    currentNode = nodeMap[currentNode][currentDirection];
    numberOfSteps++;
  }
  return numberOfSteps;
}

function main2() {
  const data = loadData();
  const directionArr = data[0];
  const nodeMap = buildNodeMap(data);
  const currentNodes = Object.keys(nodeMap).filter((key) => key[2] === "A");
  const cycleLengthOfNodes = currentNodes.map(() => 0); // assume each cycle starts at step = 0
  for (let i = 0; i < currentNodes.length; i++) {
    let numberOfSteps = 0;
    while (currentNodes[i][2] !== "Z") {
      const currentDirection =
        directionArr[numberOfSteps % directionArr.length];
      currentNodes.splice(i, 1, nodeMap[currentNodes[i]][currentDirection]);
      numberOfSteps++;
    }
    cycleLengthOfNodes.splice(i, 1, numberOfSteps);
  }

  return lcm(...cycleLengthOfNodes);
}

console.log("Solution to problem 1:", main1());
console.log("Solution to problem 2:", main2());
