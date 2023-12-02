import fs from "node:fs";

function main1() {
  const data = fs.readFileSync("day1-data.txt").toString("utf-8").split("\n");

  const result = data
    .map((line) => {
      const digitsOnly = line.match(/\d/g);
      const rtn = parseInt(
        `${digitsOnly[0]}${digitsOnly[digitsOnly.length - 1]}`
      );
      return rtn;
    })
    .reduce((prev, curr) => (prev += curr));
}

function main2() {
  const data = fs.readFileSync("day1-data.txt").toString("utf-8").split("\n");

  const result = data
    .map((line) => {
      const numberMap = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
      };
      function getDigit(s) {
        if (isNaN(parseInt(s))) {
          return numberMap[s];
        }
        return s;
      }
      const toDetect = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
      let firstDigit = "";
      let lastDigit = "";
      let done = false;

      for (let i = 1; i < line.length + 1; i++) {
        const substr = line.substring(0, i);
        for (let digit of toDetect) {
          const idx = substr.indexOf(digit);
          //console.log(line, idx, substr);
          if (idx > -1) {
            firstDigit = getDigit(digit);
            done = true;
            break;
          }
        }
        if (done) break;
      }
      done = false;
      for (let i = line.length; i >= 0; i--) {
        const substr = line.substring(i);
        for (let digit of toDetect) {
          const idx = substr.indexOf(digit);
          //console.log(line, idx, substr);
          if (idx > -1) {
            lastDigit = getDigit(digit);
            done = true;
            break;
          }
        }
        if (done) break;
      }
      const numberAsStr = firstDigit + lastDigit;
      const rtn = parseInt(numberAsStr);
      console.log(
        line,
        "first digit: " + firstDigit,
        ", last digit: " + lastDigit,
        ", number = ",
        rtn
      );
      return rtn;
    })
    .reduce((prev, curr) => (prev += curr));
  console.log(result);
}

main1();
main2();
