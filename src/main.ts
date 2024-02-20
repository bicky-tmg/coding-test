import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    <h1>Check the console for answers</h1>
    
  </div>
`;

// 1. Create a function that takes an array of strings and returns an array with only the
// strings that have numbers in them. If there are no strings containing numbers, return an
// empty array.

function hasNumber(str: string) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return numbers.some((number) => str.includes(number));
}

function numInStr(strings: string[]) {
  return strings.filter(hasNumber);
}

console.log("numInStr: ", numInStr(["1a", "a", "2b", "b"]));
console.log("numInStr: ", numInStr(["abc", "abc10"]));
console.log("numInStr: ", numInStr(["abc", "ab10c", "a10bc", "bcd"]));
console.log("numInStr: ", numInStr(["this is a test", "test1"]));
console.log("numInStr: ", numInStr(["this is a test"]));

// 2. Fiscal Code (Codice Fiscale)
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = ALPHABET.filter((letter) => !VOWELS.includes(letter));
const MONTH_CODE = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "H",
  7: "L",
  8: "M",
  9: "P",
  10: "R",
  11: "S",
  12: "T",
};

function generateSurnameCode(surname: string) {
  const surnameArr = surname.toLowerCase().split("");
  const arrOfConsonantsInSurname = surnameArr.filter((letter) =>
    CONSONANTS.includes(letter)
  );
  const arrOfVowelsInSurname = surnameArr.filter((letter) =>
    VOWELS.includes(letter)
  );

  if (arrOfConsonantsInSurname.length >= 3) {
    return arrOfConsonantsInSurname.slice(0, 3).join("").toUpperCase();
  }

  const surnameCode = `${arrOfConsonantsInSurname.join(
    ""
  )}${arrOfVowelsInSurname
    .slice(0, 3 - arrOfConsonantsInSurname.length)
    .join("")}`;

  if (surnameCode.length < 3) {
    return `${surnameCode.toUpperCase()}${"X".repeat(3 - surnameCode.length)}`;
  }

  return surnameCode.toUpperCase();
}

// console.log(generateSurnameCode("Newman"));
// console.log(generateSurnameCode("Fox"));
// console.log(generateSurnameCode("Hope"));
// console.log(generateSurnameCode("Yu"));

function generateNameCode(name: string) {
  const nameArr = name.toLowerCase().split("");
  const arrOfConsonantsInName = nameArr.filter((letter) =>
    CONSONANTS.includes(letter)
  );
  const arrOfVowelsInName = nameArr.filter((letter) => VOWELS.includes(letter));

  if (arrOfConsonantsInName.length === 3) {
    return arrOfConsonantsInName.join("").toUpperCase();
  }

  if (arrOfConsonantsInName.length > 3) {
    return (
      arrOfConsonantsInName[0] +
      arrOfConsonantsInName[2] +
      arrOfConsonantsInName[3]
    ).toUpperCase();
  }

  const nameCode = `${arrOfConsonantsInName.join("")}${arrOfVowelsInName
    .slice(0, 3 - arrOfConsonantsInName.length)
    .join("")}`;

  if (nameCode.length < 3) {
    return `${nameCode.toUpperCase()}${"X".repeat(3 - nameCode.length)}`;
  }

  return nameCode.toUpperCase();
}

// console.log(generateNameCode("Matt"));
// console.log(generateNameCode("Samantha"));
// console.log(generateNameCode("Thomas"));
// console.log(generateNameCode("Bob"));
// console.log(generateNameCode("Paula"));
// console.log(generateNameCode("Al"));

function generateDOBAndGenderCode(dob: string, gender: "M" | "F") {
  const dobArr = dob.split("/");
  const [day, month, year] = dobArr;
  const yearCode = year.slice(-2);
  let dayCode;
  switch (gender) {
    case "M":
      dayCode = +day < 10 ? day.padStart(2, "0") : day;
      break;
    case "F":
      dayCode = +day + 40;
      break;
  }
  const monthCode: string =
    MONTH_CODE[month as unknown as keyof typeof MONTH_CODE];

  return `${yearCode}${monthCode}${dayCode}`;
}

// console.log(generateDOBAndGenderCode("1/1/1900", "M"));

function fiscalCode(person: {
  name: string;
  surname: string;
  gender: "M" | "F";
  dob: string;
}) {
  const surnameCode = generateSurnameCode(person.surname);
  const nameCode = generateNameCode(person.name);
  const dobAndGenderCode = generateDOBAndGenderCode(person.dob, person.gender);

  return `${surnameCode}${nameCode}${dobAndGenderCode}`;
}

console.log(
  "fiscalCode: ",
  fiscalCode({
    name: "Matt",
    surname: "Edabit",
    gender: "M",
    dob: "1/1/1900",
  })
);

console.log(
  "fiscalCode: ",
  fiscalCode({
    name: "Helen",
    surname: "Yu",
    gender: "F",
    dob: "1/12/1950",
  })
);

console.log(
  "fiscalCode: ",
  fiscalCode({
    name: "Mickey",
    surname: "Mouse",
    gender: "M",
    dob: "16/1/1928",
  })
);

// 3. Longest non-repeating substring
function longestNonrepeatingSubstring(str: string) {
  const strArr = str.split("");
  let longestSubString = "";
  let currentSubString = "";

  for (let i = 0; i < strArr.length; i++) {
    const letter = strArr[i];
    if (!currentSubString.includes(letter)) {
      currentSubString += letter;
      if (currentSubString.length > longestSubString.length) {
        longestSubString = currentSubString;
      }
    } else {
      currentSubString = currentSubString.slice(
        currentSubString.indexOf(letter) + 1
      );

      currentSubString += letter;
    }
  }

  return longestSubString;
}

console.log(
  "longestNonrepeatingSubstring: ",
  longestNonrepeatingSubstring("abcabcb")
);
console.log(
  "longestNonrepeatingSubstring: ",
  longestNonrepeatingSubstring("aaaaaa")
);
console.log(
  "longestNonrepeatingSubstring: ",
  longestNonrepeatingSubstring("abcde")
);
console.log(
  "longestNonrepeatingSubstring: ",
  longestNonrepeatingSubstring("abcda")
);

// 4. Transform top three longest words into hashtags
function getHashTags(sentence: string) {
  const sentenceArr = sentence
    .toLowerCase()
    .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
    .split(" ")
    .sort((a, b) => b.length - a.length);

  if (sentenceArr.length < 3) {
    return sentenceArr.map((word) => `#${word}`);
  }

  return sentenceArr.slice(0, 3).map((word) => `#${word}`);
}

console.log(
  "getHashTags: ",
  getHashTags("How the Avocado Became the Fruit of the Global Trade")
);
console.log(
  "getHashTags: ",
  getHashTags(
    "Why You Will Probably Pay More for Your Christmas Tree This Year"
  )
);
console.log(
  "getHashTags: ",
  getHashTags("Hey Parents, Surprise, Fruit Juice Is Not Fruit")
);
console.log("getHashTags: ", getHashTags("Visualizing Science"));

// 5. Additive persistence and Multiplicative persistence
// Additive persistence
function additivePersistence(num: number): number {
  if (num.toString().length === 1) return 0;

  const numArr = num.toString().split("");

  const newNumArgument = numArr.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );

  return 1 + additivePersistence(newNumArgument);
}

console.log("additivePersistence: ", additivePersistence(1679583));
console.log("additivePersistence: ", additivePersistence(123456));
console.log("additivePersistence: ", additivePersistence(4));

// Multiplicative persistence
function multiplicativePersistence(num: number): number {
  if (num.toString().length === 1) return 0;

  const numArr = num.toString().split("");

  const newNumArgument = numArr.reduce(
    (accumulator, currentValue) => accumulator * Number(currentValue),
    1
  );

  return 1 + multiplicativePersistence(newNumArgument);
}

console.log("multiplicativePersistence: ", multiplicativePersistence(77));
console.log("multiplicativePersistence: ", multiplicativePersistence(123456));
console.log("multiplicativePersistence: ", multiplicativePersistence(4));
