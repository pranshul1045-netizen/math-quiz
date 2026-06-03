/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, MathQuestion, ClassLevel } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "number_system",
    name: "NUMBER AND NUMERIC SYSTEM",
    classLevel: 5,
    description: "Discover prime/composite numbers, place values, equivalent fractions, and decimal comparisons.",
    color: "from-emerald-500 to-teal-600",
    skills: ["Primes vs Composites", "Place Values", "Equivalent Fractions", "Comparing Decimals"]
  },
  {
    id: "simplification",
    name: "SIMPLIFICATION OF NUMERICAL EXPRESSIONS",
    classLevel: 5,
    description: "Simplify arithmetic expressions containing brackets and multiple operators using BODMAS / PEMDAS rules.",
    color: "from-violet-500 to-indigo-600",
    skills: ["Simple Brackets", "Multi-Operator Order", "BODMAS Step-by-Step", "Multiplication & Division"]
  },
  {
    id: "ratio",
    name: "RATIO",
    classLevel: 5,
    description: "Compare groups of items, discover proportions, and master the unitary recipe method.",
    color: "from-pink-500 to-rose-500",
    skills: ["Simplifying Ratios", "Proportion Checks", "Unitary Recipe Method", "Equivalent Comparisons"]
  },
  {
    id: "average",
    name: "AVERAGE",
    classLevel: 5,
    description: "Understand central tendencies and compute the average/mean value for various quantities.",
    color: "from-amber-500 to-orange-600",
    skills: ["Calculating Mean", "Sum of Data Series", "Average from Total Sum", "Average Word Problems"]
  },
  {
    id: "profit_loss",
    name: "PROFIT AND LOSS",
    classLevel: 6,
    description: "Master financial math logic. Compute Profit, Loss, Cost Price, Selling Price and percentages.",
    color: "from-fuchsia-500 to-rose-600",
    skills: ["Selling Price vs Cost Price", "Calculating Profit & Loss", "Profit / Loss Percentages"]
  },
  {
    id: "area_perimeter",
    name: "AREA AND PERIMETER",
    classLevel: 6,
    description: "Measure boundaries and regions. Calculate perimeters and areas of rectangles and squares.",
    color: "from-cyan-500 to-sky-600",
    skills: ["Perimeter Paths", "Rectangular Areas", "Square Floor Areas", "Composite Boundary Walks"]
  },
  {
    id: "measurements",
    name: "MEASUREMENTS",
    classLevel: 6,
    description: "Convert units of length, mass, and capacity. Compute weights, volumes, and distances.",
    color: "from-blue-500 to-teal-600",
    skills: ["Length (km/m/cm)", "Weight (kg/g/mg)", "Capacity (L/mL)", "Measurement Converts"]
  },
  {
    id: "data_analysis",
    name: "DATA ANALYSIS",
    classLevel: 6,
    description: "Examine datasets, interpret bar graphs, read tally charts, and solve frequency puzzles.",
    color: "from-indigo-600 to-purple-600",
    skills: ["Tally Counts", "Bar Graph Reading", "Comparing Frequencies", "Frequency Interpretation"]
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
  let tempA = a;
  let tempB = b;
  while (tempB !== 0) {
    const temp = tempB;
    tempB = tempA % tempB;
    tempA = temp;
  }
  return tempA;
}

// Get factors of a number
function getFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) factors.push(i);
  }
  return factors;
}

function generateOlympiadQuestion(chapterId: string, classLevel: ClassLevel, id: string): MathQuestion {
  const rand = Math.random();

  switch (chapterId) {
    case "number_system": {
      if (rand < 0.33) {
        // Olympiad sum of prime factors
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nFind the sum of all the distinct prime factors of the composite number **210**.",
          type: "choice",
          options: ["15", "17", "21", "24"],
          correctAnswer: "17",
          hint: "Perform a prime factorization of 210. Identify all base prime numbers and add them.",
          explanation: "Let's perform the prime factorization of 210 step-by-step:\n\n" +
            "• Step 1: 210 is even, so divide by 2: $$210 = 2 \\times 105$$\n" +
            "• Step 2: 105 ends in 5, so divide by 5: $$105 = 5 \\times 21$$\n" +
            "• Step 3: 21 is divisible by 3: $$21 = 3 \\times 7$$\n\n" +
            "Now all factors are prime numbers: **2, 3, 5, and 7**.\n\n" +
            "• Step 4: Sum of these distinct prime factors: \n" +
            "  $$2 + 3 + 5 + 7 = 17$$\n\n" +
            "Therefore, the sum is **17**!",
          visualType: "factor_tree",
          visualData: { number: 210, isPrime: false }
        };
      } else if (rand < 0.66) {
        // Olympiad AB + BA puzzle
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nIn the cryptarithm ledger equation **AB + BA = 143**, where A and B represent distinct, non-zero whole-number digits, what is the maximum possible product value of **A × B**?",
          type: "choice",
          options: ["36", "40", "42", "45"],
          correctAnswer: "42",
          hint: "Write AB as 10A + B and BA as 10B + A. Solve for A + B first, then find the digit pair that maximizes the product!",
          explanation: "Let's solve this Digit Logic Cryptarithm:\n\n" +
            "1. Express the place values:\n" +
            "   $$AB = 10A + B$$\n" +
            "   $$BA = 10B + A$$\n\n" +
            "2. Sum them together:\n" +
            "   $$AB + BA = (10A + B) + (10B + A) = 11 A + 11 B = 11(A + B) = 143$$\n\n" +
            "3. Divide by 11 to solve for A + B:\n" +
            "   $$A + B = 143 \\div 11 = 13$$\n\n" +
            "4. List matching sets of distinct, non-zero single digits (A, B) that sum up to 13:\n" +
            "   • Pairs: (9, 4), (8, 5), (7, 6)\n" +
            "   • Products ($A \\times B$):\n" +
            "     - $$9 \\times 4 = 36$$\n" +
            "     - $$8 \\times 5 = 40$$\n" +
            "     - $$7 \\times 6 = 42$$\n\n" +
            "The largest possible product is **42** (achieved when the digits are 7 and 6)!",
          visualType: "balance_scale",
          visualData: { leftExpr: "11 × (A + B)", rightExpr: "143" }
        };
      } else {
        // Olympiad Nested Fractions
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nSimplify the nested fraction equation to find its value:\n\n $$1 + \\frac{1}{1 + \\frac{1}{1 + \\frac{1}{2}}}$$",
          type: "choice",
          options: ["5/3", "8/5", "13/8", "7/5"],
          correctAnswer: "8/5",
          hint: "Work from the bottommost fraction upwards! Solve 1 + 1/2 first, then reciprocal, and repeat.",
          explanation: "Let's unravel this nested fraction stage by stage from the bottom up:\n\n" +
            "• Step 1 (Bottom fraction):\n" +
            "  $$1 + \\frac{1}{2} = \\frac{3}{2}$$\n\n" +
            "• Step 2 (Take reciprocal of 3/2):\n" +
            "  $$\\frac{1}{3/2} = \\frac{2}{3}$$\n\n" +
            "• Step 3 (Add 1 to 2/3):\n" +
            "  $$1 + \\frac{2}{3} = \\frac{5}{3}$$\n\n" +
            "• Step 4 (Take reciprocal of 5/3):\n" +
            "  $$\\frac{1}{5/3} = \\frac{3}{5}$$\n\n" +
            "• Step 5 (Final addition):\n" +
            "  $$1 + \\frac{3}{5} = \\frac{8}{5}$$\n\n" +
            "So, the simplified form is **8/5**!",
          visualType: "fraction_pizza",
          visualData: { numerator: 8, denominator: 5, simplifiedNumerator: 8, simplifiedDenominator: 5 }
        };
      }
    }

    case "simplification": {
      if (rand < 0.5) {
        // Olympiad division/multiplication chain
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nDetermine the exact value of the telescoping multiplication sequence:\n\n$$\\left(1 - \\frac{1}{2}\\right) \\times \\left(1 - \\frac{1}{3}\\right) \\times \\left(1 - \\frac{1}{4}\\right) \\times \\dots \\times \\left(1 - \\frac{1}{50}\\right)$$",
          type: "choice",
          options: ["1/2", "1/50", "49/50", "1/100"],
          correctAnswer: "1/50",
          hint: "Rewrite each term inside the brackets as a simple fraction, then look at which numerators and denominators cancel out!",
          explanation: "Let's simplify each bracket term and observe the multiplication pattern:\n\n" +
            "• Bracket 1: $1 - 1/2 = 1/2$\n" +
            "• Bracket 2: $1 - 1/3 = 2/3$\n" +
            "• Bracket 3: $1 - 1/4 = 3/4$\n" +
            "• ...\n" +
            "• Bracket 49: $1 - 1/50 = 49/50$\n\n" +
            "Write the product sequence:\n" +
            "  $$\\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} \\times \\dots \\times \\frac{49}{50}$$\n\n" +
            "Notice how the denominator of each fraction cancels out with the numerator of the next fraction:\n" +
            "We have $1/2 \\times 2/3 \\times 3/4 ... \\times 49/50$.\n\n" +
            "Only the very first numerator (**1**) and the very last denominator (**50**) remain uncanceled!\n\n" +
            "Thus, the final telescoping fraction yields **1/50**!",
          visualType: "balance_scale",
          visualData: { leftExpr: "Product Sequence", rightExpr: "1/50" }
        };
      } else {
        // Nested brackets
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nEvaluate the highly-ordered numerical expression using BODMAS priority order:\n\n $$120 \\div [ 18 - \\{ 6 \\times (10 - 2 \\times 4) + 2 \\} ]$$",
          type: "choice",
          options: ["10", "15", "30", "60"],
          correctAnswer: "30",
          hint: "Deal with brackets innermost first: () parentheses first, then curly {}, and lastly square brackets [].",
          explanation: "Let's perform the operations layer by layer:\n\n" +
            "• Step 1: Inside the parentheses `(10 - 2 × 4)`:\n" +
            "  Execute multiply first: $$10 - 8 = 2$$\n\n" +
            "• Step 2: Inside the curly braces `\\{ 6 × 2 + 2 \\}`:\n" +
            "  Execute multiply first: $$12 + 2 = 14$$\n\n" +
            "• Step 3: Inside the square brackets `[ 18 - 14 ]`:\n" +
            "  Execute subtraction: $$18 - 14 = 4$$\n\n" +
            "• Step 4: Final outer division:\n" +
            "  $$120 \\div 4 = 30$$\n\n" +
            "Thus, the simplified result of the expression is **30**!",
          visualType: "balance_scale",
          visualData: { leftExpr: "120 ÷ [ 18 - 14 ]", rightExpr: "30" }
        };
      }
    }

    case "ratio": {
      if (rand < 0.5) {
        // Changing Ratio Red to Green
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nIn a local classroom, the ratio of the number of boys to girls is **3 : 2**. After **6 more girls** register in the class, the new ratio of boys to girls becomes **1 : 1**. How many boys are registered in this class?",
          type: "choice",
          options: ["12", "15", "18", "24"],
          correctAnswer: "18",
          hint: "Set the initial number of boys as 3X and girls as 2X. Add 6 to the girls, set the ratio to 1/1, and solve for X!",
          explanation: "Let's solve using algebra ratio equations:\n\n" +
            "• Step 1: Let the number of boys initially be **3X** and girls initially be **2X**.\n" +
            "• Step 2: After 6 girls register, the count of girls is $$2X + 6$$.\n" +
            "• Step 3: The new ratio becomes 1 : 1, which means the count of boys and girls is equal:\n" +
            "  $$3X = 2X + 6$$\n" +
            "• Step 4: Subtract 2X from both sides to find X:\n" +
            "  $$X = 6$$\n\n" +
            "• Step 5: Now calculate the total boys:\n" +
            "  $$Boys = 3X = 3 \\times 6 = 18$$\n\n" +
            "Hence, there are **18 boys** in the class!",
          visualType: "ratio_grid",
          visualData: { leftCount: 18, rightCount: 18, leftSimp: 1, rightSimp: 1 }
        };
      } else {
        // David Age Shifting Ratio
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nFour years ago, the ratio of David's age to Ethan's age was **3 : 4**. Five years from now, the combined sum of their ages will be **39**. How old is David now?",
          type: "choice",
          options: ["10", "13", "16", "20"],
          correctAnswer: "13",
          hint: "Let David and Ethan's ages 4 years ago be 3X and 4X. Express their current ages and their ages in 5 years, then sum them to 39!",
          explanation: "Let's trace their ages step-by-step:\n\n" +
            "• **4 Years Ago**: Let David's age be $$3X$$ and Ethan's age be $$4X$$.\n" +
            "• **Current Ages**: David is $$3X + 4$$; Ethan is $$4X + 4$$.\n" +
            "• **5 Years from Now**: David will be $$3X + 9$$; Ethan will be $$4X + 9$$.\n\n" +
            "Given that in 5 years, their combined age is 39:\n" +
            "  $$(3X + 9) + (4X + 9) = 39$$\n" +
            "  $$7X + 18 = 39$$\n" +
            "  $$7X = 21 \\implies X = 3$$\n\n" +
            "• David's current age is:\n" +
            "  $$3X + 4 = 3(3) + 4 = 13 \\text{ years old}$$.\n\n" +
            "So David is currently **13** years old!",
          visualType: "ratio_grid",
          visualData: { leftCount: 13, rightCount: 16 }
        };
      }
    }

    case "average": {
      if (rand < 0.5) {
        // Teacher average weight
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nThe average weight of a group of **9 students** is **30 kg**. When their class teacher joins the room, the average weight of the entire group increases by **2 kg**. What is the weight of the class teacher?",
          type: "choice",
          options: ["40 kg", "45 kg", "50 kg", "52 kg"],
          correctAnswer: "50 kg",
          hint: "Find the total weight of the 9 students first. Then find the new total weight of 10 people with the new average!",
          explanation: "Let's use the sum of average formulae:\n\n" +
            "• Step 1: Initial sum of weights of 9 students:\n" +
            "  $$Total\\_Weight\\_{9} = 9 \\times 30 = 270\\text{ kg}$$\n\n" +
            "• Step 2: The teacher joins, making the count **10** people. The average increases by 2, so the new average is $$30 + 2 = 32\\text{ kg}$$.\n" +
            "• Step 3: Total weight of all 10 people:\n" +
            "  $$Total\\_Weight\\_{10} = 10 \\times 32 = 320\\text{ kg}$$\n\n" +
            "• Step 4: Subtract the student sum from the total sum to find the teacher's weight:\n" +
            "  $$Teacher\\text{'s Weight} = 320 - 270 = 50\\text{ kg}$$\n\n" +
            "Hence, the teacher weighs **50 kg**!",
          visualType: "balance_scale",
          visualData: { leftExpr: "Total 10 people (320kg)", rightExpr: "Teacher (50kg) + Students" }
        };
      } else {
        // Consecutive numbers product
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nThe average value of five consecutive integers is **24**. What is the product of the smallest and largest of these five integers?",
          type: "choice",
          options: ["480", "528", "572", "600"],
          correctAnswer: "572",
          hint: "For consecutive numbers, the median/middle number is equal to their average! Find the two numbers before 24 and two after.",
          explanation: "Let's find the five consecutive integers:\n\n" +
            "1. Because they are consecutive, the average value (24) is exactly the middle integer (3rd number).\n" +
            "2. Therefore, the five consecutive numbers are: **22, 23, 24, 25, 26**.\n" +
            "3. Identify the parameters:\n" +
            "   • Smallest integer = **22**\n" +
            "   • Largest integer = **26**\n\n" +
            "4. Calculate their numerical product:\n" +
            "   $$Product = 22 \\times 26 = 572$$\n\n" +
            "So, the product of the bounds is **572**!",
          visualType: "number_line",
          visualData: { activeValue: 24, start: 22, jump: 4, result: 26 }
        };
      }
    }

    case "profit_loss": {
      if (rand < 0.5) {
        // CP of 15 is SP of 12
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nIf the Cost Price of **15 craft boxes** is exactly equal to the Selling Price of **12 craft boxes**, what is the exact Profit Percentage incurred?",
          type: "choice",
          options: ["15%", "20%", "25%", "33.3%"],
          correctAnswer: "25%",
          hint: "Assume Cost Price of 1 box is $1. Calculate the Profit earned upon selling 12 boxes, then compute Profit % over the cost price of those 12 boxes!",
          explanation: "Let's perform the derivation step-by-step:\n\n" +
            "• Step 1: Let the Cost Price (CP) of 1 craft box be **$1**.\n" +
            "• Step 2: Then, CP of 15 craft boxes = **$15**.\n" +
            "• Step 3: By the given statement, Selling Price (SP) of 12 craft boxes = CP of 15 craft boxes = **$15**.\n" +
            "• Step 4: Now find the actual Cost Price of those 12 sold boxes:\n" +
            "  $$CP\\text{ of 12 boxes} = \\$12$$\n" +
            "• Step 5: Profit on selling 12 boxes:\n" +
            "  $$Profit = SP - CP = \\$15 - \\$12 = \\$3$$\n" +
            "• Step 6: Solve for Profit Percentage:\n" +
            "  $$Profit\\% = \\left( \\frac{\\text{Profit}}{\\text{Cost Price}} \\right) \\times 100\\% = \\left( \\frac{3}{12} \\right) \\times 100\\% = 25\\%$$\n\n" +
            "Thus, the profit percentage is **25%**!",
          visualType: "balance_scale",
          visualData: { leftExpr: "Profit $3", rightExpr: "25% of cost" }
        };
      } else {
        // Double successive discount
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nAn exquisite mathematical calculator is offered with two successive discounts: first **20%**, followed by an additional **10%** discount on top of the reduced price. What is the equivalent single discount percentage?",
          type: "choice",
          options: ["30%", "28%", "25%", "27%"],
          correctAnswer: "28%",
          hint: "Do not just add 20% and 10%! Apply 20% discount on a base price of $100 first, then apply 10% on that intermediate value.",
          explanation: "Let's map successive discount rates starting with an assumed original price of **$100**:\n\n" +
            "• Step 1: Apply the first discount of 20%:\n" +
            "  $$Discount\\_1 = 20\\% \\text{ of } 100 = \\$20$$\n" +
            "  $$Intermediate\\_Price = 100 - 20 = \\$80$$\n\n" +
            "• Step 2: Apply the second discount of 10% on the new price ($80):\n" +
            "  $$Discount\\_2 = 10\\% \\text{ of } 80 = \\$8$$\n" +
            "  $$Final\\_Price = 80 - 8 = \\$72$$\n\n" +
            "• Step 3: Calculate the total discount value from initial price:\n" +
            "  $$Total\\_Discount = 100 - 72 = \\$28\\text{ (which is 28% of $100)}$$\n\n" +
            "So, the dual discounts are equivalent to a single **28%** discount!",
          visualType: "balance_scale",
          visualData: { leftExpr: "100 → 80 → 72", rightExpr: "28% Discount" }
        };
      }
    }

    case "area_perimeter": {
      if (rand < 0.5) {
        // Path Area around Square
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nA square mathematical sandbox garden has sides of **10 meters**. A flat path of uniform width **2 meters** is paved all around the OUTSIDE of the garden. What is the area of this path?",
          type: "choice",
          options: ["40 sq m", "80 sq m", "96 sq m", "144 sq m"],
          correctAnswer: "96 sq m",
          hint: "Determine the area of the small garden first. Then calculate the size of the larger square (including the path of 2m on BOTH sides).",
          explanation: "Let's calculate the areas nested inside each other:\n\n" +
            "• Step 1: Area of the inner garden:\n" +
            "  $$Inner\\_Area = 10 \\times 10 = 100\\text{ sq meters}$$\n\n" +
            "• Step 2: Determine length of outer boundary. The path is 2m wide on ALL sides, so add 2m twice to the side length:\n" +
            "  $$Outer\\_Side = 10 + 2 + 2 = 14\\text{ meters}$$\n\n" +
            "• Step 3: Area of the large outer boundary square:\n" +
            "  $$Outer\\_Area = 14 \\times 14 = 196\\text{ sq meters}$$\n\n" +
            "• Step 4: Subtract to isolate path area:\n" +
            "  $$Path\\_Area = Outer\\_Area - Inner\\_Area = 196 - 100 = 96\\text{ sq meters}$$\n\n" +
            "Hence, the area of the paved path is **96 sq m**!",
          visualType: "shape_geometry",
          visualData: { shape: "rectangle", length: 14, width: 14, label: "Area" }
        };
      } else {
        // Perimeter cross shaped paper
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nA large rectangular sheet of paper has dimensions **20 cm by 12 cm**. Out of each of its four corners, a small square of side **3 cm** is cut off. What is the **Perimeter** of the remaining cross-shaped sheet?",
          type: "choice",
          options: ["40 cm", "52 cm", "64 cm", "88 cm"],
          correctAnswer: "64 cm",
          hint: "When you cut out a corner square, the boundaries are just pushed inward but remain identical in length! The outer perimeter doesn't change.",
          explanation: "Let's analyze the geometry boundary path of the cut-out corners:\n\n" +
            "• When a square of side 3cm is cut from a corner, the horizontal cut and vertical cut replace the outer edges of the corner.\n" +
            "• More specifically, the two cut lines 'fold' inward. The length of the boundary pushed in is identical to the length of the edge removed!\n\n" +
            "Therefore, the perimeter remains exactly the same as the original, uncut rectangle:\n" +
            "  $$Perimeter = 2 \\times (Length + Width) = 2 \\times (20 + 12) = 2 \\times 32 = 64\\text{ cm}$$\n\n" +
            "So, the cross-shape perimeter is **64 cm**!",
          visualType: "shape_geometry",
          visualData: { shape: "rectangle", length: 20, width: 12, label: "Perimeter" }
        };
      }
    }

    case "measurements": {
      if (rand < 0.5) {
        // Wooden blocks packing
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nHow many solid wooden cubes of side **5 cm** can be completely packed inside a large rectangular toy chest of dimensions **1 meter long, 30 cm wide, and 20 cm high**?",
          type: "choice",
          options: ["240", "400", "480", "600"],
          correctAnswer: "480",
          hint: "First convert 1 meter to centimeters (100 cm). Then, divide each chest dimension by the 5 cm side of the cube to see how many cubes fit in each direction!",
          explanation: "Let's pack the chest along each physical dimension axis:\n\n" +
            "1. **Convert units**: Length is 1 meter = **100 cm**.\n" +
            "2. **Cubes along Length**: $$100\\text{ cm} \\div 5\\text{ cm} = 20\\text{ cubes}$$\n" +
            "3. **Cubes along Width**: $$30\\text{ cm} \\div 5\\text{ cm} = 6\\text{ cubes}$$\n" +
            "4. **Cubes along Height**: $$20\\text{ cm} \\div 5\\text{ cm} = 4\\text{ cubes}$$\n\n" +
            "5. Multiply these distributions together for total volume fit:\n" +
            "   $$Total\\_Cubes = 20 \\times 6 \\times 4 = 480\\text{ cubes}$$\n\n" +
            "So, exactly **480** cubes can fit inside!",
          visualType: "balance_scale",
          visualData: { leftExpr: "Chest volume (60k)", rightExpr: "480 Cubes fit" }
        };
      } else {
        // Liters flow conversion
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nLemonade juice is leaking from an industrial pipe at a constant rate of **1.2 Liters per minute**. How many Liters of lemonade will leak outward in exactly **2.5 hours**?",
          type: "choice",
          options: ["150 L", "180 L", "210 L", "300 L"],
          correctAnswer: "180 L",
          hint: "Convert 2.5 hours into minutes by multiplying by 60 first. Then multiply those minutes by the leak rate of 1.2 L per minute!",
          explanation: "Let's perform the time and rate calculation:\n\n" +
            "• Step 1: Convert hours to minutes:\n" +
            "  $$2.5\\text{ hours} \\times 60\\text{ min/hour} = 150\\text{ minutes}$$\n\n" +
            "• Step 2: Multiply minutes by flow rate:\n" +
            "  $$Total\\_Leaked = 150\\text{ minutes} \\times 1.2\\text{ L/minute} = 180\\text{ Liters}$$\n\n" +
            "Therefore, the pipe leaks **180 L** of juice!",
          visualType: "balance_scale",
          visualData: { leftExpr: "1.2 L / min for 150m", rightExpr: "180 Liters" }
        };
      }
    }

    case "data_analysis": {
      if (rand < 0.5) {
        // Venn Diagram playing games
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nIn an elite mathematics summer camp of **40 students**, **24 play chess** and **18 play Scrabble**. If **6 students play neither** game, how many students play BOTH chess and Scrabble?",
          type: "choice",
          options: ["4", "6", "8", "12"],
          correctAnswer: "8",
          hint: "Determine the total count of students playing at least one game (40 - 6). Then use the addition rule: (Chess + Scrabble) - Both = At least one.",
          explanation: "Let's solve chess/scrabble double-counts using Venn Sets:\n\n" +
            "• Step 1: Find candidates playing at least one game:\n" +
            "  $$At\\_Least\\_One = 40\\text{ (total)} - 6\\text{ (neither)} = 34\\text{ students}$$\n\n" +
            "• Step 2: Let X be students playing BOTH chess and Scrabble:\n" +
            "  $$Chess + Scrabble - X = 34$$\n" +
            "  $$24 + 18 - X = 34$$\n" +
            "  $$42 - X = 34$$\n" +
            "  $$X = 42 - 34 = 8\\text{ students}$$\n\n" +
            "So, exactly **8 students** play both games!",
          visualType: "ratio_grid",
          visualData: { leftCount: 24, rightCount: 18 }
        };
      } else {
        // Stats integers: Mode 5, Median 6, Avg 7
        return {
          id,
          chapterId,
          classLevel,
          questionText: "⭐ Olympiad Challenge ⭐\n\nA sorted set of four positive integers has a unique mode of **5**, a median of **6**, and an average of **7**. What is the value of the largest integer in this set?",
          type: "choice",
          options: ["9", "10", "11", "12"],
          correctAnswer: "11",
          hint: "Set numbers as A, B, C, D in ascending order. Mode 5 means A = B = 5. Median 6 gives C. Sum gives D!",
          explanation: "Let's solve for the four integers (A, B, C, D) in ascending order:\n\n" +
            "1. **Unique Mode is 5**: The common number appearing most is 5, meaning at least two must be 5. Since median is 6: $$A = 5, B = 5$$\n\n" +
            "2. **Median is 6**: The median is the average of B and C:\n" +
            "   $$\\frac{B + C}{2} = 6 \\implies \\frac{5 + C}{2} = 6 \\implies C = 7$$\n\n" +
            "3. **Average is 7**: The sum of all four integers is $$4 \\times 7 = 28$$:\n" +
            "   $$A + B + C + D = 28$$\n" +
            "   $$5 + 5 + 7 + D = 28$$\n" +
            "   $$17 + D = 28 \\implies D = 11$$\n\n" +
            "The set is [5, 5, 7, 11]. The largest integer in the set is indeed **11**!",
          visualType: "ratio_grid",
          visualData: { leftCount: 5, rightCount: 11 }
        };
      }
    }

    default:
      throw new Error(`Invalid chapterId in Olympiad: ${chapterId}`);
  }
}

// Procedural generator to create endless questions for all 8 syllabus chapters
export function generateQuestion(chapterId: string, level: "easy" | "medium" | "hard", classLevel: ClassLevel): MathQuestion {
  const rand = Math.random();
  const id = `q_${chapterId}_${classLevel}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  if (chapterId === "olympiad_arena") {
    const chaptersPool = [
      "number_system",
      "simplification",
      "ratio",
      "average",
      "profit_loss",
      "area_perimeter",
      "measurements",
      "data_analysis"
    ];
    const chosenChapter = chaptersPool[Math.floor(Math.random() * chaptersPool.length)];
    const q = generateOlympiadQuestion(chosenChapter, classLevel, id);
    q.chapterId = "olympiad_arena";
    return q;
  }

  if (level === "hard") {
    return generateOlympiadQuestion(chapterId, classLevel, id);
  }

  switch (chapterId) {
    case "number_system": {
      // 1. Prime vs Composite, 2. Simplifying Fractions, 3. Comparing Decimals
      if (rand < 0.33) {
        // Prime vs Composite Question
        const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
        const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32];
        const askPrime = Math.random() > 0.5;

        if (askPrime) {
          const correct = primes[Math.floor(Math.random() * primes.length)];
          const wrongs: number[] = [];
          while (wrongs.length < 3) {
            const temp = composites[Math.floor(Math.random() * composites.length)];
            if (!wrongs.includes(temp)) wrongs.push(temp);
          }
          const options = [...wrongs, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following belongs to the "Prime Number" family (has exactly 2 factors: 1 and itself)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "Prime numbers cannot be divided evenly by other numbers like 2, 3, or 5.",
            explanation: `Let's inspect the factors of each number:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors) - ${isPrime(num) ? "PRIME" : "COMPOSITE"}.`;
              }).join("\n") + `\n\nTherefore, **${correct}** is a Prime Number because it only has factors 1 and itself.`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: true }
          };
        } else {
          const correct = composites[Math.floor(Math.random() * composites.length)];
          const wrongs: number[] = [];
          while (wrongs.length < 3) {
            const temp = primes[Math.floor(Math.random() * primes.length)];
            if (!wrongs.includes(temp)) wrongs.push(temp);
          }
          const options = [...wrongs, correct].sort(() => Math.random() - 0.5).map(String);
          return {
            id,
            chapterId,
            classLevel,
            questionText: `Which of the following is a "Composite Number" (has more than 2 factors, meaning it can be split into smaller groups)?`,
            type: "choice",
            options,
            correctAnswer: String(correct),
            hint: "A composite number is divisible by numbers other than 1 and itself.",
            explanation: `Let's break down each option and count their factors:\n` +
              options.map(o => {
                const num = parseInt(o);
                const facts = getFactors(num);
                return `• **${num}** has factors: ${facts.join(", ")} (${facts.length} factors).`;
              }).join("\n") + `\n\nSince **${correct}** has more than 2 factors, it is a Composite Number!`,
            visualType: "factor_tree",
            visualData: { number: correct, isPrime: false }
          };
        }
      } else if (rand < 0.66) {
        // Fraction Simplest Form
        const fractions = [
          { num: 4, den: 8, rNum: 1, rDen: 2 },
          { num: 6, den: 9, rNum: 2, rDen: 3 },
          { num: 10, den: 15, rNum: 2, rDen: 3 },
          { num: 8, den: 12, rNum: 2, rDen: 3 },
          { num: 9, den: 12, rNum: 3, rDen: 4 },
          { num: 5, den: 20, rNum: 1, rDen: 4 },
          { num: 12, den: 16, rNum: 3, rDen: 4 }
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
          questionText: `Simplify the fraction **${item.num}/${item.den}** to its simplest form by dividing both the top and bottom by their HCF.`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Find the Largest common factor of the numerator and denominator and divide both by it.",
          explanation: `Let's simplify **${item.num}/${item.den}**:\n\n` +
            `1. Factors of numerator ${item.num}: ${getFactors(item.num).join(", ")}\n` +
            `2. Factors of denominator ${item.den}: ${getFactors(item.den).join(", ")}\n` +
            `3. Their Highest Common Factor (HCF) is **${findHCF(item.num, item.den)}**.\n\n` +
            `Divide the top and bottom by ${findHCF(item.num, item.den)}:\n` +
            `• ${item.num} ÷ ${findHCF(item.num, item.den)} = ${item.rNum}\n` +
            `• ${item.den} ÷ ${findHCF(item.num, item.den)} = ${item.rDen}\n\n` +
            `So, the simplest form is **${correct}**!`,
          visualType: "fraction_pizza",
          visualData: { numerator: item.num, denominator: item.den, simplifiedNumerator: item.rNum, simplifiedDenominator: item.rDen }
        };
      } else {
        // Decimal Comparison
        const sets = [
          { val1: 0.45, val2: 0.5, desc: "0.50 is greater than 0.45 because 50 hundredths is more than 45 hundredths!" },
          { val1: 0.72, val2: 0.7, desc: "0.72 is greater because 72 hundredths is more than 70 hundredths!" },
          { val1: 0.09, val2: 0.1, desc: "0.10 is greater than 0.09 because 10 hundredths is more than 9 hundredths!" },
          { val1: 0.3, val2: 0.28, desc: "0.30 is greater because 30 hundredths is more than 28 hundredths!" }
        ];
        const item = sets[Math.floor(Math.random() * sets.length)];
        const correct = item.val1 > item.val2 ? ">" : "<";
        const options = [">", "<", "="];

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Which symbol makes this mathematical comparison statement true? \n\n **${item.val1}  ____  ${item.val2}**`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Prefix or suffix zeroes to match decimal places! Compare 0.30 and 0.28 directly.",
          explanation: `Let's line up the decimals using trailing zeros to compare their values:\n\n` +
            `• Number A: **${item.val1.toFixed(2)}** (${Math.round(item.val1 * 100)} hundredths)\n` +
            `• Number B: **${item.val2.toFixed(2)}** (${Math.round(item.val2 * 100)} hundredths)\n\n` +
            `Comparing them: ${item.desc}. Thus, the statement is **${item.val1} ${correct} ${item.val2}**!`,
          visualType: "place_value",
          visualData: { valA: item.val1, valB: item.val2 }
        };
      }
    }

    case "simplification": {
      // BODMAS rule expressions
      const sets = [
        { expr: "5 + 3 × 4", steps: "Multiply first: 3 × 4 = 12. Then add: 5 + 12 = 17.", ans: "17" },
        { expr: "24 ÷ (8 - 2)", steps: "Solve inside the brackets first: 8 - 2 = 6. Then divide: 24 ÷ 6 = 4.", ans: "4" },
        { expr: "10 - 4 ÷ 2 + 3", steps: "Divide first: 4 ÷ 2 = 2. Then perform subtraction and addition left-to-right: 10 - 2 + 3 = 8 + 3 = 11.", ans: "11" },
        { expr: "(6 + 4) × 5 - 12", steps: "Solve brackets first: 6 + 4 = 10. Then multiply: 10 × 5 = 50. Lastly subtract: 50 - 12 = 38.", ans: "38" },
        { expr: "15 - 3 × 4 + 2", steps: "Multiply first: 3 × 4 = 12. Then subtract and add left-to-right: 15 - 12 + 2 = 3 + 2 = 5.", ans: "5" }
      ];
      const item = sets[Math.floor(Math.random() * sets.length)];
      const correct = item.ans;
      const parsedAns = parseInt(correct);
      const options = [correct, String(parsedAns + 4), String(parsedAns - 2 || parsedAns + 8), String(parsedAns * 2 || 20)].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Solve using the **BODMAS / PEMDAS** order of operations: \n\n What is the value of **${item.expr}**?`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: "Remember the priority levels: Brackets first, then Orders/Exponents, then Division & Multiplication (left-to-right), and finally Addition & Subtraction (left-to-right)!",
        explanation: `Let's break down the execution steps according to the **BODMAS** rules:\n\n` +
          `Expression: **${item.expr}**\n\n` +
          `${item.steps}\n\n` +
          `Hence, the final simplified value is **${correct}**!`,
        visualType: "balance_scale",
        visualData: { leftExpr: item.expr, rightExpr: correct }
      };
    }

    case "ratio": {
      // Comparison, simplification, and unitary method
      if (rand < 0.33) {
        // Simplify ratio
        const items = [
          { a: 12, b: 18, hcf: 6, rA: 2, rB: 3 },
          { a: 8, b: 20, hcf: 4, rA: 2, rB: 5 },
          { a: 15, b: 25, hcf: 5, rA: 3, rB: 5 },
          { a: 9, b: 27, hcf: 9, rA: 1, rB: 3 },
          { a: 14, b: 21, hcf: 7, rA: 2, rB: 3 }
        ];
        const item = items[Math.floor(Math.random() * items.length)];
        const correct = `${item.rA}:${item.rB}`;
        const wr1 = `${item.rB}:${item.rA}`;
        const wr2 = `${item.rA + 1}:${item.rB}`;
        const wr3 = `${item.a - 2}:${item.b - 2}`;
        const options = Array.from(new Set([correct, wr1, wr2, wr3])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Express the ratio of red counters to blue counters **${item.a} : ${item.b}** in its simplest form.`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Find the HCF of both quantities and divide them out just like narrowing down a fraction!",
          explanation: `Let's find the simplest ratio for **${item.a} : ${item.b}**:\n\n` +
            `1. Write as a fraction: $$\\frac{${item.a}}{${item.b}}$$\n` +
            `2. The Highest Common Factor (HCF) of ${item.a} and ${item.b} is **${item.hcf}**.\n` +
            `3. Divide both values by ${item.hcf}:\n` +
            `   • Red side: ${item.a} ÷ ${item.hcf} = ${item.rA}\n` +
            `   • Blue side: ${item.b} ÷ ${item.hcf} = ${item.rB}\n\n` +
            `Thus, the simplified ratio is **${correct}**!`,
          visualType: "ratio_grid",
          visualData: { leftCount: item.a, rightCount: item.b, leftSimp: item.rA, rightSimp: item.rB }
        };
      } else if (rand < 0.66) {
        // Unitary Method
        const recipes = [
          { items: 4, cost: 20, target: 6, targetCost: 30, noun: "notebooks" },
          { items: 3, cost: 15, target: 8, targetCost: 40, noun: "pens" },
          { items: 5, cost: 250, target: 7, targetCost: 350, noun: "toy kits" },
          { items: 6, cost: 12, target: 10, targetCost: 20, noun: "donuts" }
        ];
        const item = recipes[Math.floor(Math.random() * recipes.length)];
        const correct = String(item.targetCost);
        const options = [correct, String(item.targetCost + 10), String(item.targetCost - 5), String(item.cost * 2)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `If **${item.items} ${item.noun}** cost **$${item.cost}**, how much will **${item.target} ${item.noun}** cost using the unitary method?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "First find the cost of 1 notebook/pen by dividing. Then multiply that unit price by the target quantity!",
          explanation: `Let's do the Unitary Method calculation step-by-step:\n\n` +
            `• **Step 1**: Find the cost of ONE item (Unit Price):\n` +
            `  $$Cost\\text{ of 1 unit} = \\frac{\\$${item.cost}}{${item.items}} = \\$${item.cost / item.items} \\text{ each}$$\n\n` +
            `• **Step 2**: Multiply by the target amount **${item.target}**:\n` +
            `  $$Cost\\text{ of } ${item.target} \\text{ units} = \\$${item.cost / item.items} \\times ${item.target} = \\$${correct}$$\n\n` +
            `So, the total cost for ${item.target} ${item.noun} is **$${correct}**!`,
          visualType: "ratio_grid",
          visualData: { unitValue: item.cost / item.items, originalCount: item.items, targetCount: item.target }
        };
      } else {
        // Equivalence ratios (proportion)
        const proportions = [
          { label: "3:4 and 9:12", corr: "Yes", desc: "9:12 simplifies to 3:4 by dividing both elements by 3. They are equivalent!" },
          { label: "2:5 and 4:15", corr: "No", desc: "4:15 cannot be simplified further. 2:5 is not equal to 4:15, so they are not equivalent." },
          { label: "1:3 and 5:15", corr: "Yes", desc: "5:15 simplifies to 1:3 by dividing both elements by 5. They are equivalent!" }
        ];
        const item = proportions[Math.floor(Math.random() * proportions.length)];
        const options = ["Yes", "No"];

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Are the ratios **${item.label}** equivalent (meaning they are in proportion)?`,
          type: "choice",
          options,
          correctAnswer: item.corr,
          hint: "Reduce the larger ratio by dividing. See if it becomes identical to the smaller ratio!",
          explanation: `Let's analyze the ratios:\n\n` +
            `Ratios to check: **${item.label}**\n\n` +
            `${item.desc}\n\nHence, the correct answer is **${item.corr}**!`,
          visualType: "ratio_grid",
          visualData: { label: item.label, isProportion: item.corr === "Yes" }
        };
      }
    }

    case "average": {
      // Calculating mean of values
      if (rand < 0.5) {
        // Average of three numbers
        const numbers = [
          { set: [10, 15, 20], sum: 45, count: 3, avg: 15 },
          { set: [8, 12, 16], sum: 36, count: 3, avg: 12 },
          { set: [5, 15, 25], sum: 45, count: 3, avg: 15 },
          { set: [20, 30, 40], sum: 90, count: 3, avg: 30 },
          { set: [12, 14, 16], sum: 42, count: 3, avg: 14 }
        ];
        const item = numbers[Math.floor(Math.random() * numbers.length)];
        const correct = String(item.avg);
        const options = [correct, String(item.avg + 4), String(item.avg - 3), String(item.sum)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `Solve for the central average: What is the **Average** of the following list of numbers: **${item.set.join(", ")}**?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Sum all the numbers together, and then divide that total sum by the count of numbers (which is 3)!",
          explanation: `Let's compute the mathematical Average (Mean) of the numbers:\n\n` +
            `1. **Sum up all the numbers**:\n` +
            `   $$Sum = ${item.set.join(" + ")} = ${item.sum}$$\n\n` +
            `2. **Divide the Sum by Count** (3):\n` +
            `   $$Average = \\frac{\\text{Total Sum}}{\\text{Total Count}} = \\frac{${item.sum}}{3} = ${correct}$$\n\n` +
            `Thus, the Average is exactly **${correct}**!`,
          visualType: "number_line",
          visualData: { activeValue: item.avg, start: Math.min(...item.set) - 2, jump: 2, result: item.avg }
        };
      } else {
        // Sum given find average / word problem
        const wordProblems = [
          { text: "A young baker made 4 cakes. The total weight of all 4 cakes is 16 kg. What is the average weight of a cake?", sum: 16, count: 4, avg: 4, label: "kg" },
          { text: "A cricket player scores a total of 150 runs in 5 matches. What is his average runs per match?", sum: 150, count: 5, avg: 30, label: "runs" },
          { text: "Leo reads for a total of 90 minutes over 3 days. What is the average minutes he read per day?", sum: 90, count: 3, avg: 30, label: "minutes" }
        ];
        const item = wordProblems[Math.floor(Math.random() * wordProblems.length)];
        const correct = String(item.avg);
        const options = [correct, String(item.avg + 5), String(item.avg - 2), String(item.sum / 2)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `${item.text}`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Average = (Total Sum) ÷ (Number of Items/Days). Directly divide the given total by the count!",
          explanation: `Let's solve this Average word problem:\n\n` +
            `• Sum / Total accumulated = **${item.sum}**\n` +
            `• Count of units / items = **${item.count}**\n\n` +
            `Applying the Average equation:\n` +
            `  $$Average = \\frac{Total}{Count} = \\frac{${item.sum}}{${item.count}} = ${correct} \\text{ ${item.label}}$$\n\n` +
            `So, the average is **${correct} ${item.label}**!`,
          visualType: "balance_scale",
          visualData: { leftExpr: `${item.sum} ÷ ${item.count}`, rightExpr: correct }
        };
      }
    }

    case "profit_loss": {
      // Cost price vs Selling price
      const isProfit = Math.random() > 0.5;
      if (isProfit) {
        const cp = Math.floor(Math.random() * 5 + 3) * 10; // 30-70
        const gain = Math.floor(Math.random() * 3 + 1) * 5; // 5-15
        const sp = cp + gain;
        const askPct = Math.random() > 0.5;

        if (askPct) {
          // Profit percentage = (gain/cp) * 100
          // make clean factors: e.g. cp = 50, gain = 10 (20%) or cp = 40, gain = 10 (25%)
          const cleanCp = 50;
          const cleanGain = 10;
          const pct = 20;
          const options = [String(pct) + "%", "15%", "25%", "10%"].sort(() => Math.random() - 0.5);

          return {
            id,
            chapterId,
            classLevel,
            questionText: `A shopkeeper buys an educational board game for **$${cleanCp}** (Cost Price). He sells it for **$${cleanCp + cleanGain}** (Selling Price). What is his **Profit Percentage**?`,
            type: "choice",
            options,
            correctAnswer: String(pct) + "%",
            hint: "Profit % = (Profit ÷ Cost Price) × 100%. Don't divide by Selling Price!",
            explanation: `Let's compute the financial profit percentage:\n\n` +
              `1. **Find Profit**: \n` +
              `   $$Profit = SP - CP = \\$${cleanCp + cleanGain} - \\$${cleanCp} = \\$${cleanGain}$$\n\n` +
              `2. **Find Profit Percentage**:\n` +
              `   $$Profit\\% = \\left( \\frac{\\text{Profit}}{\\text{Cost Price}} \\right) \\times 100\\%$$\n` +
              `   $$Profit\\% = \\left( \\frac{${cleanGain}}{${cleanCp}} \\right) \\times 100\\% = 0.20 \\times 100\\% = ${pct}\\%$$\n\n` +
              `So, the shopkeeper made a **${pct}% Profit**!`,
            visualType: "balance_scale",
            visualData: { leftExpr: `(10 ÷ 50) × 100`, rightExpr: "20" }
          };
        } else {
          const correct = String(gain);
          const options = [correct, String(gain + 5), String(gain + 10), String(sp)].sort(() => Math.random() - 0.5);

          return {
            id,
            chapterId,
            classLevel,
            questionText: `Mia buys a box of chalks for **$${cp}** and sells it to her classmate for **$${sp}**. Calculate the exact **Profit** she made.`,
            type: "choice",
            options,
            correctAnswer: correct,
            hint: "Since Selling Price ($" + sp + ") is higher than Cost Price ($" + cp + "), subtract Cost Price from Selling Price to find the Gain!",
            explanation: `Let's check the financial formula for Profit:\n\n` +
              `• Cost Price (CP) = **$${cp}**\n` +
              `• Selling Price (SP) = **$${sp}**\n\n` +
              `Since SP is greater than CP, we have a profit:\n` +
              `  $$Profit = SP - CP = \\$${sp} - \\$${cp} = \\$${correct}$$\n\n` +
              `Therefore, Mia made a profit of **$${correct}**!`,
            visualType: "balance_scale",
            visualData: { leftExpr: `${sp} - ${cp}`, rightExpr: correct }
          };
        }
      } else {
        // Loss calculating
        const cp = Math.floor(Math.random() * 5 + 4) * 10; // 40-80
        const lossAmt = Math.floor(Math.random() * 3 + 1) * 5; // 5-15
        const sp = cp - lossAmt;
        const correct = String(lossAmt);
        const options = [correct, String(lossAmt + 5), String(lossAmt + 10), String(sp)].sort(() => Math.random() - 0.5);

        return {
          id,
          chapterId,
          classLevel,
          questionText: `A local bookstore bought journal notebooks containing maps for **$${cp}** each. Because the cover got slightly wet, they had to self-sell them at **$${sp}** each. What is the net financial **Loss** per notebook?`,
          type: "choice",
          options,
          correctAnswer: correct,
          hint: "Since Cost Price ($" + cp + ") is higher than the Selling Price ($" + sp + "), a Loss is incurred. Subtract SP from CP!",
          explanation: `Let's calculate the financial loss amount:\n\n` +
            `• Cost Price (CP) = **$${cp}**\n` +
            `• Selling Price (SP) = **$${sp}**\n\n` +
            `Since CP > SP, a Loss occurred:\n` +
            `  $$Loss = CP - SP = \\$${cp} - \\$${sp} = \\$${correct}$$\n\n` +
            `Thus, they incurred a loss of **$${correct}** on each journal notebook.`,
          visualType: "balance_scale",
          visualData: { leftExpr: `${cp} - ${sp}`, rightExpr: correct }
        };
      }
    }

    case "area_perimeter": {
      // Rectangle or square boundaries or tiles
      const isArea = Math.random() > 0.5;
      const l = Math.floor(Math.random() * 5) + 6; // 6-10
      const w = Math.floor(Math.random() * 4) + 3; // 3-6
      const ans = isArea ? l * w : 2 * (l + w);
      const correct = String(ans);
      const label = isArea ? "sq cm" : "cm";
      const options = [
        correct,
        String(isArea ? 2 * (l + w) : l * w), // inverted formula
        String(ans + 6),
        String(ans - 2)
      ].filter((v, i, self) => self.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Calculate the **${isArea ? "Area (total flat space inside)" : "Perimeter (total boundary distance around)"}** of a rectangular cardboard piece with length **${l} cm** and width **${w} cm**.`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: isArea ? "Area formula: Length × Width" : "Perimeter formula: 2 × (Length + Width) or add all 4 sides!",
        explanation: `Let's solve for the rectangle's boundary properties:\n\n` +
          `• Length = **${l} cm**, Width = **${w} cm**.\n\n` +
          `${isArea 
            ? `• **Area Formula**: $Area = Length \\times Width$\n  $$Area = ${l} \\times ${w} = ${ans}\\text{ sq cm}$$` 
            : `• **Perimeter Formula**: $Perimeter = 2 \\times (Length + Width)$\n  $$Perimeter = 2 \\times (${l} + ${w}) = 2 \\times ${l + w} = ${ans}\\text{ cm}$$`
          }\n\n` +
          `So, the rectangle's ${isArea ? "area is " : "perimeter is "} **${correct} ${label}**!`,
        visualType: "shape_geometry",
        visualData: { shape: "rectangle", length: l, width: w, label: isArea ? "Area" : "Perimeter" }
      };
    }

    case "measurements": {
      // Metric unit conversions: Length, weight, capacity
      const units = [
        { q: "How many meters are there in **4.5 kilometers**?", correct: "4500", rawVal: 4.5, factor: 1000, label: "meters", hint: "Multiply km by 1000 to convert to meters (since 1 km = 1000 meters)." },
        { q: "Convert **3 kilograms** into grams.", correct: "3000", rawVal: 3, factor: 1000, label: "grams", hint: "Multiply kg by 1000 to convert to grams (since 1 kg = 1000 grams)." },
        { q: "How many milliliters are in **5 Liters** of custom lemonade juice?", correct: "5000", rawVal: 5, factor: 1000, label: "milliliters", hint: "Multiply Liters by 1000 to convert to mL (since 1 Litre = 1000 mL)." },
        { q: "A ribbon is **250 centimeters** long. What is its length in meters?", correct: "2.5", rawVal: 250, factor: 0.01, label: "meters", hint: "Divide cm by 100 to get meters (since 100 cm = 1 meter)." }
      ];
      const item = units[Math.floor(Math.random() * units.length)];
      const correct = item.correct;
      const options = [correct, String(parseFloat(correct) * 10), String(parseFloat(correct) / 10), "100"].sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `${item.q}`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: item.hint,
        explanation: `Let's perform the unit conversion step-by-step:\n\n` +
          `• Original value: **${item.rawVal}**\n` +
          `• Conversion factor relation: ${item.hint}\n\n` +
          `${item.rawVal.toString().includes("km") || item.factor === 1000 
            ? `  $$${item.rawVal} \\times 1000 = ${correct} \\text{ ${item.label}}$$` 
            : `  $$${item.rawVal} \\div 100 = ${correct} \\text{ ${item.label}}$$`}\n\n` +
          `So, the answer is precisely **${correct} ${item.label}**!`,
        visualType: "balance_scale",
        visualData: { leftExpr: `${item.rawVal} combined units`, rightExpr: `${correct} ${item.label}` }
      };
    }

    case "data_analysis": {
      // Reading simple data bars / tally charts
      const dataSets = [
        { fruit: "Apples 🍎: ||||   Oranges 🍊: |||| |||", text: "Look at the tally marks. Apprentices logged Apples as 4 tallies and Oranges as 8 tallies. How many more Oranges are there than Apples?", correct: "4", steps: "Oranges count is 8. Apples count is 4. Difference is: 8 - 4 = 4." },
        { fruit: "Red Bus 🔴: 5 kids, Blue Bus 🔵: 9 kids", text: "If the Red Bus carries 5 students and the Blue Bus carries 9 students, what is the combined total of students in both buses?", correct: "14", steps: "Total = Red Bus + Blue Bus = 5 + 9 = 14 children." }
      ];
      const item = dataSets[Math.floor(Math.random() * dataSets.length)];
      const correct = item.correct;
      const options = [correct, "3", "5", "10", "12"].slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id,
        chapterId,
        classLevel,
        questionText: `Observe the mini dataset:\n\n **${item.fruit}**\n\nQuestion: **${item.text}**`,
        type: "choice",
        options,
        correctAnswer: correct,
        hint: "Counts items represented by tallies or descriptors and compare or sum them directly!",
        explanation: `Let's analyze the raw data to extract frequency logs:\n\n` +
          `• Dataset details:\n  ${item.fruit}\n\n` +
          `Calculations: ${item.steps}\n\n` +
          `Hence, the correct output is **${correct}**!`,
        visualType: "ratio_grid",
        visualData: { leftCount: 5, rightCount: 9 }
      };
    }

    default:
      throw new Error(`Invalid chapterId: ${chapterId}`);
  }
}

// Global list of achievements/badges
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
    id: "number_master",
    title: "Number Champion",
    description: "Earn 150 XP playing Number and Numeric System.",
    iconName: "ShieldAlert",
    colorClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    xpThreshold: 150
  },
  {
    id: "ratio_master",
    title: "Ratio Master",
    description: "Master Ratio chapters by clearing multiple unitary recipes.",
    iconName: "PieChart",
    colorClass: "bg-orange-50 text-orange-800 border-orange-200",
    xpThreshold: 300
  },
  {
    id: "average_master",
    title: "Average Guru",
    description: "Successfully calculate multiple stats averages correctly.",
    iconName: "Eye",
    colorClass: "bg-blue-50 text-blue-800 border-blue-200",
    xpThreshold: 500
  },
  {
    id: "profit_loss_master",
    title: "Profit Pioneer",
    description: "Solve business shopkeeper percentages perfectly.",
    iconName: "Scale",
    colorClass: "bg-violet-50 text-violet-800 border-violet-200",
    xpThreshold: 750
  },
  {
    id: "olympiad_conqueror",
    title: "Olympiad Conqueror",
    description: "Earn 200 XP playing the extremely difficult Olympiad Arena.",
    iconName: "Trophy",
    colorClass: "bg-amber-100/90 text-amber-900 border-amber-300",
    xpThreshold: 200
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

// Calculate player level based on cumulative XP
export function calculateLevel(xp: number): number {
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

