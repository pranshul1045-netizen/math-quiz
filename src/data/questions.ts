/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, MathQuestion, ClassLevel } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "factors_multiples",
    name: "Factors & Multiples",
    classLevel: 5,
    description: "Discover prime numbers, composites, HCF, and LCM using blocks and groupings.",
    color: "from-emerald-500 to-teal-600",
    skills: ["Primes vs Composites", "Finding Factors", "HCF", "LCM"]
  },
  {
    id: "fractions",
    name: "Fraction Playground",
    classLevel: 5,
    description: "Explore equal parts of shapes, equivalent fractions, mixed numbers, and slice sums.",
    color: "from-orange-500 to-amber-600",
    skills: ["Simplest Form", "Equivalent Fractions", "Addition of Fractions", "Mixed Fractions"]
  },
  {
    id: "decimals",
    name: "Decimals Explorer",
    classLevel: 5,
    description: "Understand tenths, hundredths, round numbers, and perform simple decimal calculations.",
    color: "from-blue-500 to-indigo-600",
    skills: ["Comparing Decimals", "Place Values", "Decimal Addition", "Rounding Off"]
  },
  {
    id: "integers",
    name: "Integers Voyage",
    classLevel: 6,
    description: "Voyage below ground zero! Navigate negative numbers, elevations, and number line logic.",
    color: "from-fuchsia-500 to-rose-600",
    skills: ["Below Zero Concept", "Negative vs Positive", "Integer Subtraction/Addition", "Compass Comparison"]
  },
  {
    id: "algebra",
    name: "Intro to Algebra",
    classLevel: 6,
    description: "Balance equations on scales, use magic variables (x, y) to find mystery values.",
    color: "from-violet-500 to-purple-600",
    skills: ["Variables as Mystery Boxes", "One-Step Addition", "One-Step Multiplication", "Equilibrium Rules"]
  },
  {
    id: "geometry",
    name: "Shapes & Geometry",
    classLevel: 6,
    description: "Measure angles, map perimeter paths, count tile floor areas, and solve angle rules.",
    color: "from-cyan-500 to-sky-600",
    skills: ["Angle Classification", "Triangle Angle Sum", "Rect Perimeter Paths", "Floor Tile Areas"]
  },
  {
    id: "ratios",
    name: "Ratio & Proportion",
    classLevel: 6,
    description: "Compare groups of items, discover proportions, and master the unitary recipe method.",
    color: "from-pink-500 to-rose-500",
    skills: ["Simplifying Ratios", "Proportion Checks", "Unitary Recipe Method", "Equivalent Comparisons"]
  }
];

// Helper to check prime
function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Find GCF / HCF
function findHCF(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Find LCM
function findLCM(a: number, b: number): number {
  return (a * b) / findHCF(a, b);
}

// Get factors of a number
function getFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) factors.push(i);
  }
  return factors;
}

// Procedural generator to create endless questions
export function generateQuestion(chapterId: string, level: "easy" | "medium" | "hard", classLevel: ClassLevel): MathQuestion {
  const rand = Math.random();
  const id = `q_${chapterId}_${classLevel}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  switch (chapterId) {
    case "factors_multiples": {
      if (rand < 0.33) {
        // Prime vs Composite
        const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30];
        
        const isPrimeQuestion = Math.random() > 0.5;
        if (isPrimeQuestion) {
          const correct = primes[Math.floor(Math.random() * primes.length)];
          // select 3 composites
          const rComposites: number[] = [];
          while (rComposites.length < 3) {
            const temp = composites[Math.floor(Math.random() * composites.length)];
            if (!rComposites.includes(temp)) rComposites.push(temp);
          }
          const options = [...rComposites, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following belongs to the "Prime Number" family (has exactly 2 factors: 1 and itself)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "Try dividing each number by small primes like 2, 3, or 5. If it cannot be divided by anything else, it's prime!",
            explanation: `Let's analyze the properties of the options:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors) - ${isPrime(num) ? "PRIME" : "COMPOSITE"}.`;
              }).join("\n") + `\n\nTherefore, ${correct} is the only prime number because it only has 1 and itself as factors.`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: true }
          };
        } else {
          const correct = composites[Math.floor(Math.random() * composites.length)];
          const rPrimes: number[] = [];
          while (rPrimes.length < 3) {
            const temp = primes[Math.floor(Math.random() * primes.length)];
            if (!rPrimes.includes(temp)) rPrimes.push(temp);
          }
          const options = [...rPrimes, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following is a "Composite Number" (has more than 2 factors)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "A composite number is divisible by numbers other than 1 and itself. Find the one that can be divided evenly!",
            explanation: `Let's break down each number and see their factors:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors).`;
              }).join("\n") + `\n\nSince **${correct}** has factors ${getFactors(correct).join(", ")}, which are more than 2, it is a composite number!`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: false }
          };
        }
      } else if (rand < 0.66) {
        // HCF Question
        const sets = [
          [12, 18, 6], [8, 12, 4], [15, 20, 5], [18, 24, 6], [20, 30, 10], [9, 15, 3], [14, 21, 7], [16, 24, 8]
        ];
        const choice = sets[Math.floor(Math.random() * sets.length)];
        const [a, b, hcf] = choice;
        const potentialWrong = [hcf + 2, Math.max(1, hcf - 1), hcf * 2, hcf + 3].filter(x => x !== hcf);
        const uniqueWrong = Array.from(new Set(potentialWrong)).slice(0, 3);
        const options = [...uniqueWrong, hcf].sort(() => Math.random() - 0.5).map(String);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Socrates the Owl wants to divide two logs of lengths ${a} meters and ${b} meters into pieces of equal max possible length with no wood wasted. What is the Highest Common Factor (HCF) of ${a} and ${b}?`,
          type: "choice",
          options,
          correctAnswer: String(hcf),
          hint: "List the factors of both numbers. Choose the largest factor that appears in both lists!",
          explanation: `Let's find the factors step-by-step:\n\n` +
            `1. Factors of **${a}** are: ${getFactors(a).join(", ")}\n` +
            `2. Factors of **${b}** are: ${getFactors(b).join(", ")}\n\n` +
            `Common factors in both lists are: ${getFactors(a).filter(x => getFactors(b).includes(x)).join(", ")}.\n` +
            `The greatest (highest) common factor is **${hcf}**. Thus, the maximum length of each piece must be ${hcf} meters!`,
          visualType: "factor_tree",
          visualData: { numA: a, numB: b, hcf }
        };
      } else {
        // LCM Question
        const sets = [
          [4, 6, 12], [3, 5, 15], [6, 8, 24], [5, 10, 10], [6, 9, 18], [4, 5, 20], [8, 12, 24]
        ];
        const choice = sets[Math.floor(Math.random() * sets.length)];
        const [a, b, lcm] = choice;
        const potentialWrong = [lcm + 6, lcm - 2, lcm * 2, lcm + 4].filter(x => x !== lcm && x > 0);
        const uniqueWrong = Array.from(new Set(potentialWrong)).slice(0, 3);
        const options = [...uniqueWrong, lcm].sort(() => Math.random() - 0.5).map(String);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Two green frogs jump at different spacings. Frog A jumps every ${a} steps, and Frog B jumps every ${b} steps. If they start at the same point, at what step will they land on the same spot again (Lowest Common Multiple)?`,
          type: "choice",
          options,
          correctAnswer: String(lcm),
          hint: "Write down the multiples of both numbers. Find the smallest multiple that exists in both series!",
          explanation: `Let's list the first few multiples:\n\n` +
            `• Multiples of **${a}**: ${[a, a*2, a*3, a*4, a*5, a*6].join(", ")}...\n` +
            `• Multiples of **${b}**: ${[b, b*2, b*3, b*4, b*5, b*6].join(", ")}...\n\n` +
            `The common multiples are numbers in both lines. The very first (lowest) common multiple they share is **${lcm}**!`,
          visualType: "factor_tree",
          visualData: { numA: a, numB: b, lcm }
        };
      }
    }

    case "fractions": {
      if (rand < 0.33) {
        // Simplest form
        const fractions = [
          { num: 4, den: 8, rNum: 1, rDen: 2 },
          { num: 6, den: 9, rNum: 2, rDen: 3 },
          { num: 10, den: 15, rNum: 2, rDen: 3 },
          { num: 8, den: 12, rNum: 2, rDen: 3 },
          { num: 9, den: 12, rNum: 3, rDen: 4 },
          { num: 5, den: 20, rNum: 1, rDen: 4 },
          { num: 12, den: 16, rNum: 3, rDen: 4 },
          { num: 14, den: 21, rNum: 2, rDen: 3 }
        ];
        const item = fractions[Math.floor(Math.random() * fractions.length)];
        const correct = `${item.rNum}/${item.rDen}`;
        const wr1 = `${item.rNum + 1}/${item.rDen}`;
        const wr2 = `${item.rNum}/${item.rDen + 1}`;
        const wr3 = `${item.num - 1}/${item.den}`;
        const options = Array.from(new Set([wr1, wr2, wr3, correct])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Simplify the fraction ${item.num}/${item.den} to its lowest (simplest) form by dividing both parts by their HCF.`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Identify the Highest Common Factor (HCF) of the numerator and denominator, then divide both numbers by it!",
          explanation: `Let's simplify **${item.num}/${item.den}**:\n\n` +
            `1. The factors of numerator **${item.num}** are: ${getFactors(item.num).join(", ")}\n` +
            `2. The factors of denominator **${item.den}** are: ${getFactors(item.den).join(", ")}\n` +
            `3. Their HCF (Highest Common Factor) is **${findHCF(item.num, item.den)}**.\n\n` +
            `Divide the top and bottom by ${findHCF(item.num, item.den)}:\n` +
            `• Top: ${item.num} ÷ ${findHCF(item.num, item.den)} = ${item.rNum}\n` +
            `• Bottom: ${item.den} ÷ ${findHCF(item.num, item.den)} = ${item.rDen}\n\n` +
            `So, the simplified fraction is **${correct}**!`,
          visualType: "fraction_pizza",
          visualData: { numerator: item.num, denominator: item.den, simplifiedNumerator: item.rNum, simplifiedDenominator: item.rDen }
        };
      } else if (rand < 0.66) {
        // Equivalent fraction filled blank
        const items = [
          { baseN: 2, baseD: 3, multiplier: 4, missing: "num", prompt: "2/3 = ?/12", correct: "8" },
          { baseN: 3, baseD: 4, multiplier: 3, missing: "num", prompt: "3/4 = ?/12", correct: "9" },
          { baseN: 1, baseD: 2, multiplier: 6, missing: "den", prompt: "1/2 = 6/?", correct: "12" },
          { baseN: 3, baseD: 5, multiplier: 2, missing: "den", prompt: "3/5 = 6/?", correct: "10" },
          { baseN: 4, baseD: 5, multiplier: 4, missing: "num", prompt: "4/5 = ?/20", correct: "16" }
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        const correctVal = item.correct;
        const valNum = parseInt(correctVal);
        const options = [String(valNum), String(valNum + 2), String(valNum - 2 || valNum + 4), String(valNum + 3)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Solve the equivalent fraction riddle! What number goes in place of the question mark in: **${item.prompt}**?`,
          type: "choice",
          options,
          correctAnswer: correctVal,
          hint: "See what number we multiplied the given numerator or denominator by to get the other part. Multiply the missing part by the same number!",
          explanation: `Let's look at the relation between fractions:\n\n` +
            `In **${item.prompt}**:\n` +
            `• To go from ${item.missing === 'num' ? `denominator ${item.baseD} to ${item.baseD * item.multiplier}` : `numerator ${item.baseN} to ${item.baseN * item.multiplier}`}, ` +
            `we multiplied by **${item.multiplier}**.\n` +
            `• To keep the fraction equivalent, we must multiply the other part by **${item.multiplier}** as well!\n\n` +
            `${item.missing === 'num' ? `• Numerator: ${item.baseN} × ${item.multiplier} = ${valNum}` : `• Denominator: ${item.baseD} × ${item.multiplier} = ${valNum}`}.\n\n` +
            `The missing value is indeed **${correctVal}**!`,
          visualType: "fraction_pizza",
          visualData: { numerator: item.baseN, denominator: item.baseD, scaleFactor: item.multiplier }
        };
      } else {
        // Sum of like fractions
        const dens = [5, 6, 8, 10, 12];
        const den = dens[Math.floor(Math.random() * dens.length)];
        const n1 = Math.floor(Math.random() * (den / 2)) + 1;
        const n2 = Math.floor(Math.random() * (den / 2 - 1)) + 1;
        const sumNum = n1 + n2;
        const correct = `${sumNum}/${den}`;
        
        const options = [
          `${sumNum}/${den}`,
          `${n1 + n2}/${n1 + n2}`,
          `${Math.max(1, sumNum - 1)}/${den}`,
          `${sumNum}/${den * 2}`
        ].map(String).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `If Euler eats ${n1}/${den} of a round blueberry cake and Sophia eats ${n2}/${den} of the same cake, how much cake have they eaten altogether?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "When denominators are the same, just add the numerators together and keep the denominator unchanged!",
          explanation: `Let's write the addition equation:\n\n` +
            `$$\\frac{${n1}}{${den}} + \\frac{${n2}}{${den}} = \\frac{${n1} + ${n2}}{${den}} = \\frac{${sumNum}}{${den}}$$\n\n` +
            `Since the cake slices are of equal size (both denominators are ${den}), we only add the top parts together. Complete sum is **${correct}**!`,
          visualType: "fraction_pizza",
          visualData: { numA: n1, numB: n2, denominator: den }
        };
      }
    }

    case "decimals": {
      if (rand < 0.33) {
        // Compare Decimals
        const pairs = [
          { a: "0.4", b: "0.35", correct: "0.4", why: "0.4 is equal to 0.40, which is larger than 0.35! Do not be fooled by the number of digits." },
          { a: "0.08", b: "0.1", correct: "0.1", why: "0.1 has 1 tenth, whereas 0.08 has 0 tenths (only 8 hundredths). So 0.1 is larger!" },
          { a: "0.75", b: "0.8", correct: "0.8", why: "0.8 is equal to 0.80. Since 80 hundredths is bigger than 75 hundredths, 0.8 is larger." },
          { a: "1.23", b: "1.2", correct: "1.23", why: "1.23 is equivalent to 1 and 23/100, while 1.2 is 1.20 which is 1 and 20/100." }
        ];
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const correct = pair.correct;
        const options = [pair.a, pair.b, "Equal"].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Which decimal number is greater: **${pair.a}** or **${pair.b}**?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Add trailing zeros to make both decimals have the same number of decimal places, then compare directly!",
          explanation: `Let's compare them column-by-column:\n\n` +
            `• Let's write them both with two decimal places:\n` +
            `  - **${pair.a}** becomes **${pair.a.indexOf('.') === pair.a.length - 2 ? pair.a + "0" : pair.a}**\n` +
            `  - **${pair.b}** becomes **${pair.b.indexOf('.') === pair.b.length - 2 ? pair.b + "0" : pair.b}**\n\n` +
            `${pair.why}\n\nTherefore, the larger number is **${correct}**!`,
          visualType: "place_value",
          visualData: { valA: parseFloat(pair.a), valB: parseFloat(pair.b) }
        };
      } else if (rand < 0.66) {
        // Place value identification
        const numbers = [
          { num: "4.73", digit: "7", value: "Tenths", why: "The first digit to the right of the decimal point always represents Tenths (1/10)." },
          { num: "4.73", digit: "3", value: "Hundredths", why: "The second digit to the right of the decimal point represents Hundredths (1/100)." },
          { num: "0.285", digit: "5", value: "Thousandths", why: "The third digit to the right of the decimal point represents Thousandths (1/1000)." },
          { num: "12.3", digit: "2", value: "Ones", why: "The digit immediately to the left of the decimal point represents the traditional Ones place." }
        ];
        const item = numbers[Math.floor(Math.random() * numbers.length)];
        const correct = item.value;
        const options = ["Tens", "Ones", "Tenths", "Hundredths", "Thousandths"].filter((v, i, self) => self.indexOf(v) === i);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `In the decimal number **${item.num}**, what is the place value of the digit **${item.digit}**?`,
          type: "choice",
          options: options.slice(0, 4).sort(() => Math.random() - 0.5),
          correctAnswer: correct,
          hint: "The columns from left to right around the decimal are: ... Tens | Ones (decimal) Tenths | Hundredths | Thousandths ...",
          explanation: `Let's break down the decimal places of **${item.num}**:\n\n` +
            `• The digit before decimal is local whole numbers (Ones, Tens etc.)\n` +
            `• Index 1 right (tenths column): ${item.num.split('.')[1]?.[0] || 'none'}\n` +
            `• Index 2 right (hundredths column): ${item.num.split('.')[1]?.[1] || 'none'}\n` +
            `• Index 3 right (thousandths column): ${item.num.split('.')[1]?.[2] || 'none'}\n\n` +
            `${item.why} So, the answer is **${correct}**!`,
          visualType: "place_value",
          visualData: { number: parseFloat(item.num), highlightDigit: item.digit }
        };
      } else {
        // Decimal Addition
        const terms = [
          { a: 0.4, b: 0.15, correct: "0.55" },
          { a: 1.2, b: 0.45, correct: "1.65" },
          { a: 0.7, b: 0.8, correct: "1.5" },
          { a: 2.55, b: 1.3, correct: "3.85" }
        ];
        const term = terms[Math.floor(Math.random() * terms.length)];
        const corr = term.correct;
        const numeric = parseFloat(corr);
        const options = [corr, String(numeric + 0.1), String(numeric - 0.05), String(numeric + 1.0)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Add the decimal numbers: **${term.a} + ${term.b}**. Be careful to line up the decimal points!`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Align the decimal points vertically, append zeroes to empty columns, and add normally like whole numbers!",
          explanation: `Let's align the numbers vertically of **${term.a} + ${term.b}**:\n\n` +
            `\`\`\`\n` +
            `  ${term.a.toFixed(2).padStart(5)}\n` +
            `+ ${term.b.toFixed(2).padStart(5)}\n` +
            `---------\n` +
            `  ${numeric.toFixed(2).padStart(5)}\n` +
            `\`\`\`\n\n` +
            `Make sure to carry over numbers to the left just like regular addition. The sum is **${corr}**!`,
          visualType: "place_value",
          visualData: { numA: term.a, numB: term.b, val: numeric }
        };
      }
    }

    case "integers": {
      if (rand < 0.33) {
        // Temperature/Altitude integer interpretation
        const prompts = [
          { text: "A submarine is swimming 150 meters below sea level. Which integer represents this situation?", correct: "-150", label: "meters" },
          { text: "Sophia deposited $45 into her bank account. Which integer represents her deposit?", correct: "45", label: "dollars" },
          { text: "The temperature in Kashmir is 7 degrees below freezing point (0°C). Which integer represents this temperature?", correct: "-7", label: "degrees" },
          { text: "An airplane climbs to a height of 2500 meters. Which integer represents its climb?", correct: "2500", label: "meters" }
        ];
        const prompt = prompts[Math.floor(Math.random() * prompts.length)];
        const corr = prompt.correct;
        const val = parseInt(corr);
        const options = [corr, String(-val), "0", String(Math.abs(val) + 12)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: prompt.text,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Recall: words like 'below', 'loss', 'decrease', or 'subsurface' map to NEGATIVE numbers. Words like 'above', 'gain', 'deposit' map to POSITIVE numbers.",
          explanation: `Let's examine the key directional keywords:\n\n` +
            `• If a value goes downwards or below a baseline reference (like 0°C or sea level), we express it as a **Negative Integer** (using a minus '-' sign).\n` +
            `• If it goes upwards or adds to a value (like bank deposits or elevation), we express it as a **Positive Integer**.\n\n` +
            `Since the statement represents a direction corresponding to "${val < 0 ? 'below / down' : 'above / up'}", we write it mathematically as **${corr}**!`,
          visualType: "number_line",
          visualData: { activeValue: val, markerLabel: prompt.label }
        };
      } else if (rand < 0.66) {
        // Negative Number Comparison
        const cases = [
          { a: -5, b: -2, greater: -2, explain: "On a number line, -2 is on the right side of -5. Closer to zero/positive numbers means greater!" },
          { a: -1, b: -10, greater: -1, explain: "-1 is much higher up the temperature scale than -10. -1°C is cold, but -10°C is congelation cold!" },
          { a: 0, b: -4, greater: 0, explain: "0 is always greater than any negative number. It is better to have 0 debt than to owe $4!" },
          { a: -8, b: -6, greater: -6, explain: "-6 is greater because it sits further right on the number line than -8." }
        ];
        const item = cases[Math.floor(Math.random() * cases.length)];
        const corr = String(item.greater);
        const options = [String(item.a), String(item.b), "Equal"].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Which integer is larger (greater): **${item.a}** or **${item.b}**?`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Picture a number line. The number that is further to the RIGHT is always the larger number!",
          explanation: `Let's visualize the relative position on the number line:\n\n` +
            `\`\`\`\n` +
            `<- -10 ... -8 ... -6 ... -4 ... -2 ... -1 ... 0 ... 1 ->\n` +
            `\`\`\`\n` +
            `• Siting positions: **${item.a}** and **${item.b}**.\n` +
            `• **${item.greater}** sits further to the right.\n\n` +
            `${item.explain}\n\nTherefore, **${corr}** is indeed greater than ${item.greater === item.a ? item.b : item.a}!`,
          visualType: "number_line",
          visualData: { valA: item.a, valB: item.b, greater: item.greater }
        };
      } else {
        // Simple line math
        const mathSets = [
          { a: 2, b: -5, math: "2 + (-5)", ans: -3, step: "Start at 2 on the numberline. Moving +(-5) means jumping 5 steps to the LEFT. We pass 1, 0, -1, -2 and land on -3." },
          { a: -3, b: 4, math: "-3 + 4", ans: 1, step: "Start at -3. Moving +4 means jumping 4 steps to the RIGHT. We pass -2, -1, 0 and land on 1." },
          { a: -1, b: -2, math: "-1 - 2", ans: -3, step: "Start at -1. Subtracting 2 means jumping 2 steps to the LEFT. We land on -3." },
          { a: 3, b: -3, math: "3 - 3", ans: 0, step: "Start at 3. Subtracting 3 means hopping 3 steps to the Left, landing exactly on 0." }
        ];
        const set = mathSets[Math.floor(Math.random() * mathSets.length)];
        const corr = String(set.ans);
        const options = [corr, String(set.ans + 3), String(set.ans - 3), String(-set.ans)].filter((v, i, self) => self.indexOf(v) === i);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Work out the integer expression on the numberline: **${set.math}**.`,
          type: "choice",
          options: options.slice(0, 4).sort(() => Math.random() - 0.5),
          correctAnswer: corr,
          hint: "Adding positive or moving right goes positive. Adding negative or subtracting goes left!",
          explanation: `Let's trace this step-by-step on the number line:\n\n` +
            `${set.step}\n\n` +
            `Equation: **${set.math} = ${set.ans}**!`,
          visualType: "number_line",
          visualData: { start: set.a, jump: set.b, result: set.ans }
        };
      }
    }

    case "algebra": {
      const names = ["Sophia", "Socrates", "Euler", "Leo", "Mia"];
      const n = names[Math.floor(Math.random() * names.length)];
      if (rand < 0.33) {
        // x + a = b
        const coeff = Math.floor(Math.random() * 8) + 3; // a
        const ans = Math.floor(Math.random() * 8) + 2; // x
        const total = coeff + ans; // b
        const corr = String(ans);
        const options = [corr, String(ans + 2), String(ans - 1 || ans + 4), String(total)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `${n} puts a mystery token pack $x$ on a balance scale. Adding ${coeff} single marbles on the left side balances exactly with ${total} marbles on the right side. Solve **$x + ${coeff} = ${total}$** to find the mystery pack content!`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "To balance the scale, you can subtract the same number from both sides. Subtract the companion whole number from the total!",
          explanation: `Let's solve the equation step-by-step using balance rules:\n\n` +
            `$$x + ${coeff} = ${total}$$\n\n` +
            `To isolate the mystery box **$x$**, we must do the opposite operation:\n` +
            `• Subtract **${coeff}** from both sides of the balance scale:\n` +
            `  $$x + ${coeff} - ${coeff} = ${total} - ${coeff}$$\n` +
            `  $$x = ${ans}$$\n\n` +
            `There are exactly **${ans}** marbles inside the mystery box!`,
          visualType: "balance_scale",
          visualData: { leftExpr: "x + " + coeff, rightExpr: String(total), xValue: ans }
        };
      } else if (rand < 0.66) {
        // ax = b
        const coeff = [2, 3, 4, 5][Math.floor(Math.random() * 4)]; // a
        const ans = [3, 4, 5, 6, 7][Math.floor(Math.random() * 5)]; // x
        const total = coeff * ans; // b
        const corr = String(ans);
        const options = [corr, String(ans + 1), String(ans - 1 || ans + 3), String(coeff)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Solve the mystery multiplier equation: **$${coeff}x = ${total}$**. (If ${coeff} copies of a box hold ${total} gold coins together, how many coins are in one box?)`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Since $x$ is multiplied by a coefficient, do the inverse operation: divide both sides by that coefficient!",
          explanation: `Let's solve the multiplication equation:\n\n` +
            `$$${coeff}x = ${total}$$\n\n` +
            `To find the content of one single box **$x$**, do the opposite of multiplication (division):\n` +
            `• Divide both sides by **${coeff}**:\n` +
            `  $$\\frac{${coeff}x}{${coeff}} = \\frac{${total}}{${coeff}}$$\n` +
            `  $$x = ${ans}$$\n\n` +
            `So, one mystery box contains **${ans}** coins.`,
          visualType: "balance_scale",
          visualData: { leftExpr: coeff + "x", rightExpr: String(total), xValue: ans }
        };
      } else {
        // Word expression
        const cases = [
          { text: "7 more than a number z", correct: "z + 7", wrong: ["7z", "z - 7", "7 - z"] },
          { text: "4 times a number y", correct: "4y", wrong: ["y + 4", "4 - y", "y/4"] },
          { text: "5 less than a number x", correct: "x - 5", wrong: ["5 - x", "x + 5", "5x"] }
        ];
        const item = cases[Math.floor(Math.random() * cases.length)];
        const corr = item.correct;
        const options = [corr, ...item.wrong].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Translate this word problem into a clean mathematical algebraic expression: **"${item.text}"**`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Look closely at the keywords: 'more than' maps to +, 'times' maps to multiplication, 'less than' maps to subtraction (where you subtract FROM the variable).",
          explanation: `Let's break down the mathematical words:\n\n` +
            `• The phrase "${item.text}" tells us we start with the variable.\n` +
            `• ${item.text.includes("more") ? "Adding 7 is written as `+ 7` after the letter." : item.text.includes("times") ? "Multiplying by 4 is written as `4y` (no multiplication symbol needed in algebra!)." : "Subtracting 5 FROM x means we write `x - 5` (writing `5 - x` is wrong because that means x subtracted from 5!)."}\n\n` +
            `Thus, the correct expression is **${corr}**!`,
          visualType: "balance_scale",
          visualData: { leftExpr: item.text, rightExpr: corr }
        };
      }
    }

    case "geometry": {
      if (rand < 0.33) {
        // Missing triangle angle
        const a1 = Math.floor(Math.random() * 40) + 40; // 40-80
        const a2 = Math.floor(Math.random() * 40) + 30; // 30-70
        const a3 = 180 - (a1 + a2);
        const corr = String(a3);
        const options = [corr, String(a3 + 15), String(a3 - 10), String(180 - a1)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `In a colorful triangle, two of the interior angles measure **${a1}°** and **${a2}°**. What is the measure of the third angle?`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "The sum of all three interior angles in ANY triangle is always exactly 180°! Subtract the sum of the known angles from 180.",
          explanation: `Let's calculate step-by-step using the **Triangle Angle Sum Theorem**:\n\n` +
            `1. Sum of known angles: $$${a1}° + ${a2}° = ${a1 + a2}°$$\n` +
            `2. Since all three angles add up to $$180°$$, we subtract the known sum from 180:\n` +
            `   $$180° - ${a1 + a2}° = ${a3}°$$\n\n` +
            `So, the third angle must measure exactly **${a3}°**!`,
          visualType: "shape_geometry",
          visualData: { shape: "triangle", angleA: a1, angleB: a2, angleC: a3 }
        };
      } else if (rand < 0.66) {
        // Area of Rect
        const l = Math.floor(Math.random() * 6) + 6; // 6-11
        const w = Math.floor(Math.random() * 4) + 3; // 3-6
        const isArea = Math.random() > 0.5;
        const ans = isArea ? l * w : 2 * (l + w);
        const corr = String(ans);
        const label = isArea ? "sq cm" : "cm";
        const options = [
          corr, 
          String(isArea ? 2*(l+w) : l*w), // opposite formula
          String(ans + 4), 
          String(ans - 2)
        ].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Euler wants to find the **${isArea ? "Area (surface space)" : "Perimeter (border length)"}** of a rectangular drawing board with length **${l} cm** and width **${w} cm**. Can you help him calculate it?`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: `${isArea ? "Area = Length × Width." : "Perimeter = 2 × (Length + Width) or add all 4 sides together: Length + Width + Length + Width!"}`,
          explanation: `Let's look at the formulas for a rectangle:\n\n` +
            `• Given: Length = **${l} cm**, Width = **${w} cm**.\n` +
            `${isArea ? `• **Area Formula**: $Area = Length \\times Width$\n  $$Area = ${l} \\times ${w} = ${ans}\\text{ sq cm}$$` : `• **Perimeter Formula**: $Perimeter = 2 \\times (Length + Width)$\n  $$Perimeter = 2 \\times (${l} + ${w}) = 2 \\times ${l + w} = ${ans}\\text{ cm}$$`}\n\n` +
            `The rectangular board's ${isArea ? "area is " : "perimeter is "} **${ans} ${label}**!`,
          visualType: "shape_geometry",
          visualData: { shape: "rectangle", length: l, width: w, label: isArea ? "Area" : "Perimeter" }
        };
      } else {
        // Angle classification
        const angles = [
          { val: 45, name: "Acute", desc: "less than 90° (small and sharp!)" },
          { val: 90, name: "Right", desc: "exactly 90° (perfect corner like an L!)" },
          { val: 135, name: "Obtuse", desc: "greater than 90° but less than 180° (wide and open!)" },
          { val: 180, name: "Straight", desc: "exactly 180° (a flat straight horizontal line!)" }
        ];
        const item = angles[Math.floor(Math.random() * angles.length)];
        const corr = item.name;
        const options = ["Acute", "Right", "Obtuse", "Straight", "Reflex"].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Let's classify angles! An angle that measures exactly **${item.val}°** is classified as a(n) _________ angle.`,
          type: "choice",
          options: options.slice(0, 4).sort(() => Math.random() - 0.5),
          correctAnswer: corr,
          hint: "Remember: Acute is cute (<90°), Right is correct (90°), Obtuse is big (90°-180°), and Straight is a line (180°).",
          explanation: `Let's compare the angle of **${item.val}°** to the baseline dividers:\n\n` +
            `• Angle is **${item.val}°**.\n` +
            `• Classification rule: ${item.desc}.\n\n` +
            `So, this angle is called a **${corr} Angle**!`,
          visualType: "shape_geometry",
          visualData: { shape: "angle", angleDegree: item.val }
        };
      }
    }

    case "ratios": {
      if (rand < 0.33) {
        // Simplest Form
        const items = [
          { a: 10, b: 15, hcf: 5, rA: 2, rB: 3 },
          { a: 8, b: 24, hcf: 8, rA: 1, rB: 3 },
          { a: 12, b: 16, hcf: 4, rA: 3, rB: 4 },
          { a: 6, b: 18, hcf: 6, rA: 1, rB: 3 },
          { a: 14, b: 20, hcf: 2, rA: 7, rB: 10 }
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        const corr = `${item.rA}:${item.rB}`;
        const options = [corr, `${item.rB}:${item.rA}`, `${item.rA + 1}:${item.rB}`, `${item.a - 2}:${item.b - 2}`].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Express the ratio of **${item.a} : ${item.b}** in its simplest form.`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Write the ratio as a fraction, find the Highest Common Factor (HCF) of both numbers, and divide them by it!",
          explanation: `Let's simplify the ratio **${item.a} to ${item.b}**:\n\n` +
            `1. Write as fraction: $$\\frac{${item.a}}{${item.b}}$$\n` +
            `2. The Highest Common Factor of ${item.a} and ${item.b} is **${item.hcf}**.\n` +
            `3. Divide both numbers by ${item.hcf}:\n` +
            `   • ${item.a} ÷ ${item.hcf} = ${item.rA}\n` +
            `   • ${item.b} ÷ ${item.hcf} = ${item.rB}\n\n` +
            `So, the ratio in its simplest form is **${corr}**!`,
          visualType: "ratio_grid",
          visualData: { leftCount: item.a, rightCount: item.b, leftSimp: item.rA, rightSimp: item.rB }
        };
      } else if (rand < 0.66) {
        // Proportion check
        const sets = [
          { label: "2:3 and 4:6", correct: "Yes", why: "Both ratios simplify to 2:3. Since they are equivalent, they are in PROPORTION!" },
          { label: "1:4 and 3:12", correct: "Yes", why: "The second ratio 3:12 simplifies to 1:4 by dividing by 3. They are equivalent!" },
          { label: "3:5 and 6:8", correct: "No", why: "3:5 is simplified. 6:8 simplifies to 3:4. Since 3:5 is not equal to 3:4, they are NOT in proportion." },
          { label: "2:5 and 6:15", correct: "Yes", why: "6:15 simplifies to 2:5 by dividing both by 3. They are in proportion!" },
          { label: "4:5 and 8:12", correct: "No", why: "4:5 is simplified. 8:12 simplifies to 2:3. They are not equivalent!" }
        ];
        const set = sets[Math.floor(Math.random() * sets.length)];
        const corr = set.correct;
        const options = ["Yes", "No"];

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Are the two ratios **${set.label}** in proportion (meaning they represent equal fractions)?`,
          type: "choice",
          options,
          correctAnswer: corr,
          hint: "Simplify both ratios to their lowest forms. If the simplified ratios are identical, they are in proportion!",
          explanation: `Let's test proportional equality:\n\n` +
            `Ratios: **${set.label}**\n\n` +
            `${set.why}\n\nSo the answer is **${corr}**!`,
          visualType: "ratio_grid",
          visualData: { label: set.label, isProportion: corr === "Yes" }
        };
      } else {
        // Unitary Method recipe
        const recipes = [
          { items: 5, cost: 20, target: 8, targetCost: 32, noun: "apples" },
          { items: 3, cost: 15, target: 5, targetCost: 25, noun: "pencil packs" },
          { items: 4, cost: 120, target: 6, targetCost: 180, noun: "toy cars" },
          { items: 8, cost: 40, target: 12, targetCost: 60, noun: "cupcakes" }
        ];
        const recipe = recipes[Math.floor(Math.random() * recipes.length)];
        const corrCost = String(recipe.targetCost);
        const options = [corrCost, String(recipe.targetCost + 10), String(recipe.targetCost - 5), String(Math.floor(recipe.cost * recipe.target))].slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Using the unitary method: If **${recipe.items}** ${recipe.noun} cost **$${recipe.cost}**, how much will **${recipe.target}** of the same ${recipe.noun} cost?`,
          type: "choice",
          options,
          correctAnswer: corrCost,
          hint: "First find the cost of ONE single item (divide total cost by number of items). Then multiply that single unit cost by the target count!",
          explanation: `Let's solve this using the **Unitary Method** which has 2 easy steps:\n\n` +
            `1. **Find cost of 1 item** (Unit Cost):\n` +
            `   $$Cost\\text{ of 1 unit} = \\frac{\\text{Total Cost}}{\\text{Total Units}} = \\frac{\\$${recipe.cost}}{${recipe.items}} = \\$${recipe.cost / recipe.items}$$\n\n` +
            `2. **Find cost of ${recipe.target} items**:\n` +
            `   $$Cost\\text{ of } ${recipe.target} \\text{ units} = \\text{Unit Cost} \\times \\text{Target Units}$$\n` +
            `   $$Cost = \\$${recipe.cost / recipe.items} \\times ${recipe.target} = \\$${recipe.targetCost}$$\n\n` +
            `So, ${recipe.target} ${recipe.noun} will cost **$${recipe.targetCost}**!`,
          visualType: "ratio_grid",
          visualData: { unitValue: recipe.cost / recipe.items, originalCount: recipe.items, targetCount: recipe.target }
        };
      }
    }

    default:
      throw new Error("Invalid chapter");
  }
}

// Initial achievements list
export const ACHIEVEMENTS = [
  {
    id: "apprentice",
    title: "Math Apprentice",
    description: "Welcome to the academy! Complete your first question.",
    iconName: "Compass",
    colorClass: "bg-stone-100 text-stone-800 border-stone-200",
    xpThreshold: 50
  },
  {
    id: "factor_master",
    title: "Factor Ninja",
    description: "Earn 150 XP playing Factors and Multiples.",
    iconName: "ShieldAlert",
    colorClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    xpThreshold: 150
  },
  {
    id: "fraction_master",
    title: "Pizza Slice Champion",
    description: "Master Fraction Playground chapters.",
    iconName: "PieChart",
    colorClass: "bg-orange-50 text-orange-800 border-orange-200",
    xpThreshold: 300
  },
  {
    id: "dec_master",
    title: "Decimal Detective",
    description: "Solve multiple decimal block puzzles perfectly.",
    iconName: "Eye",
    colorClass: "bg-blue-50 text-blue-800 border-blue-200",
    xpThreshold: 500
  },
  {
    id: "algebra_sage",
    title: "Algebra Balance Sage",
    description: "Establish perfect equilibrium in Algebra scales.",
    iconName: "Scale",
    colorClass: "bg-violet-50 text-violet-800 border-violet-200",
    xpThreshold: 750
  },
  {
    id: "math_genius",
    title: "Math Prodigy",
    description: "Reach elite levels (1000+ XP) of excellence!",
    iconName: "Award",
    colorClass: "bg-yellow-50 text-yellow-800 border-yellow-200",
    xpThreshold: 1000
  }
];

// Calculate player level based on XP
export function calculateLevel(xp: number): number {
  // Level formula: Level 1 starts at 0XP, Level 2 at 100XP, Level 3 at 250XP, Level 4 at 450XP, etc.
  // We can do a simpler formula: Level = Math.floor(Math.sqrt(xp / 50)) + 1
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

// Get title based on Level
export function getLevelTitle(level: number): string {
  if (level <= 1) return "Novice Thinker";
  if (level === 2) return "Number Explorer";
  if (level === 3) return "Equation Climber";
  if (level === 4) return "Shape Navigator";
  if (level === 5) return "Ratio Ranger";
  if (level === 6) return "Theorem Captain";
  return "Grand Mathematician";
}
