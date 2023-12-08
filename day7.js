import fs from "node:fs";

function loadData() {
  return fs.readFileSync("day7-data.txt").toString("utf-8").split("\n");
}

const orderOfStrength = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

function cardCounts(hand) {
  const count = {};
  for (let i = 0; i < hand.length; i++) {
    count[hand[i]] = (count[hand[i]] || 0) + 1;
  }
  return count;
}

function isHand1Better(hand1, hand2) {
  let i = 0;

  while (
    i < 5 &&
    orderOfStrength.indexOf(hand1[i]) === orderOfStrength.indexOf(hand2[i])
  ) {
    i++;
  }
  return orderOfStrength.indexOf(hand1[i]) < orderOfStrength.indexOf(hand2[i]);
}

const detector = {
  fiveOfAKind: (hand) =>
    hand[0] === hand[1] &&
    hand[0] === hand[2] &&
    hand[0] === hand[3] &&
    hand[0] === hand[4],
  fourOfAKind: (hand) =>
    Object.values(cardCounts(hand)).findIndex((count) => count === 4) > -1,
  fullHouse: (hand) => {
    const countValues = Object.values(cardCounts(hand));
    return countValues.length === 2 && countValues[0] < 4 && countValues[1] < 4;
  },
  threeOfAKind: (hand) =>
    Object.values(cardCounts(hand)).findIndex((count) => count === 3) > -1,
  twoPair: (hand) => {
    const countValues = Object.values(cardCounts(hand));
    return (
      countValues.length === 3 &&
      countValues[0] < 3 &&
      countValues[1] < 3 &&
      countValues[2] < 3
    );
  },
  onePair: (hand) =>
    Object.values(cardCounts(hand)).findIndex((count) => count === 2) > -1,
  highestCard: (hand) => true,
};

function main1() {
  const handsTypeRanked = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPair: [],
    onePair: [],
    highestCard: [],
  };
  const data = loadData();
  for (let line of data) {
    const split = line.split(" ");
    const play = { hand: split[0], bid: parseInt(split[1]) };
    const detectors = Object.entries(detector);
    for (let i = 0; i < detectors.length; i++) {
      if (detectors[i][1](play.hand)) {
        const handsType = handsTypeRanked[detectors[i][0]];
        if (handsType.length === 0) {
          handsType.push(play);
          break;
        }
        let j = 0;
        while (
          j < handsType.length &&
          !isHand1Better(play.hand, handsType[j].hand)
        ) {
          j++;
        }
        handsType.splice(j, 0, play);
        break;
      }
    }
  }
  let result = 0;
  let i = data.length;
  for (let handsType of Object.values(handsTypeRanked)) {
    for (let play of handsType) {
      result += play.bid * i;
      i--;
    }
  }
  return result;
}

function main2() {
  return 0;
}

console.log("Solution to problem 1:", main1());
console.log("Solution to problem 2:", main2());
