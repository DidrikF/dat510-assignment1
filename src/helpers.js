// Alphabet in array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Letter distribution in array, corresponding to alphabet
// Object to hold letter distribution in cipher text {A: ..., B: ..., C: ..., ...}
const letterDistribution = {
    A: 8.167,
    B: 1.492,
    C: 2.782,
    D: 4.253,
    E: 12.70,
    F: 2.228,
    G: 2.015,
    H: 6.094,
    I: 6.966,
    J: 0.153,
    K: 0.772,
    L: 4.025,
    M: 2.406,
    N: 6.749,
    O: 7.507,
    P: 1.929,
    Q: 0.095,
    R: 5.987,
    S: 6.327,
    T: 9.056,
    U: 2.758,
    V: 0.978,
    W: 2.360,
    X: 0.150,
    Y: 1.974,
    Z: 0.074
};
const letterDistributionArray = [8.167,1.492,2.782,4.253,12.70,2.228,2.015,6.094,6.966,0.153,0.772,4.025,2.406,6.749,7.507,1.929,0.095,5.987,6.327,9.056,2.758,0.978,2.360,0.150,1.974,0.074];

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


module.exports.alphabet = alphabet;
module.exports.letterDistribution = letterDistribution;
module.exports.letterDistributionArray = letterDistributionArray;
module.exports.letterNumber = letterNumber;
module.exports.numberLetter = numberLetter;
module.exports.getCharacterCountBlueprint = getCharacterCountBlueprint;