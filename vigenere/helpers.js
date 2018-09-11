// Alphabet in array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Letter distribution in array, corresponding to alphabet
// Object to hold letter distribution in cipher text {A: ..., B: ..., C: ..., ...}
const characterDistribution = {
    A: 0.08167,
    B: 0.01492,
    C: 0.02782,
    D: 0.04253,
    E: 0.1270,
    F: 0.02228,
    G: 0.02015,
    H: 0.06094,
    I: 0.06966,
    J: 0.00153,
    K: 0.00772,
    L: 0.04025,
    M: 0.02406,
    N: 0.06749,
    O: 0.07507,
    P: 0.01929,
    Q: 0.00095,
    R: 0.05987,
    S: 0.06327,
    T: 0.09056,
    U: 0.02758,
    V: 0.00978,
    W: 0.02360,
    X: 0.00150,
    Y: 0.01974,
    Z: 0.00074
};
const characterDistributionArray = [0.08167,0.01492,0.02782,0.04253,0.1270,0.02228,0.02015,0.06094,0.06966,0.00153,0.00772,0.04025,0.02406,0.06749,0.07507,0.01929,0.00095,0.05987,0.06327,0.09056,0.02758,0.00978,0.02360,0.00150,0.01974,0.00074];

// Letter to number mapping, and the reverse
const letterNumber = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25
};

const numberAlphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    
const numberLetter = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z'
}

function getCharacterCountBlueprint () {
  return {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0,
    R: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0
  };
}

function getCharNumberCountBlueprint () {
    return {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0
    }
}

/**
 * 
 * @param {string[]} sequence 
 * @returns {number[]} charactersAsNumbers
 */
function translateCharactersToNumberes (sequence) {
    return sequence.map(character => {
        return letterNumber[character];
    })
}

/**
 * 
 * @param {number[]} sequence
 * @returns {string[]} charactersAsCharacters
 */
function translateNumbersToCharacters (sequence) {
    return sequence.map(number => {
        return numberLetter[number];
    })
}


function allPossibleCases(arr) {
    if (arr.length == 1) {
        return arr[0];
    } else {
        var result = [];
        var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
        for (var i = 0; i < allCasesOfRest.length; i++) {
        for (var j = 0; j < arr[0].length; j++) {
            result.push(arr[0][j] + allCasesOfRest[i]);
        }
        }
        return result;
    }
}

function factorial (n) {
    let result = n
    for (let i = 1; i < n; i++) {
        result *= i;
    }

    return result
}

function parseRunOptions() {
    const arr = process.argv.slice(2, process.argv.length);
    const runOptions= {
        verbose: false,
    };
    arr.forEach((element) => {
        if (element.match(/--\w+=.+/)) {
            let [key, val] = element.split('=');
            key = key.slice(2);
            if (Object.keys(runOptions).indexOf(key) !== -1) {
                if (key === 'verbose') {
                    if (val === 'true') runOptions[key] = true
                    else runOptions[key] = false
                    return;
                }
                runOptions[key] = val;
            }
        }
    })

    return runOptions;
}


module.exports.alphabet = alphabet;
module.exports.characterDistribution = characterDistribution;
module.exports.characterDistributionArray = characterDistributionArray;
module.exports.letterNumber = letterNumber;
module.exports.numberLetter = numberLetter;
module.exports.getCharacterCountBlueprint = getCharacterCountBlueprint;
module.exports.translateCharactersToNumberes = translateCharactersToNumberes;
module.exports.numberAlphabet = numberAlphabet;
module.exports.getCharNumberCountBlueprint = getCharNumberCountBlueprint;
module.exports.translateNumbersToCharacters = translateNumbersToCharacters;
module.exports.allPossibleCases = allPossibleCases;
module.exports.factorial = factorial;
module.exports.parseRunOptions = parseRunOptions;