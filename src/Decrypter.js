const { alphabet, letterDistribution, letterDistributionArray, letterNumber, getCharacterCountBlueprint } = require('./helpers');
const cTable = require('console.table');

module.exports = class Decrypter {
  /**
   * 
   * @param {string} cipherText 
   * @param {number} maxLength 
   */
  constructor (cipherText, maxLength) {
    this.cipherText = cipherText;
    this.maxKeyLength = maxLength;
    this.minKeyLength = 2;
    this.alphabetLength = 26;
    this.ICResults = {};
  }

  /**
   * Calculates the Index of Coincidence (IC) for periodic sequences of cipher text. 
   * The IC is calculated for sequences with a period from the minimum to the maximum 
   * possible key length (2-10).
   */
  calculateICResults() {
    // calculate IoC for the cipher text.
    this.ICResults['source'] = this.IoC(this.cipherText.split(''))

    // for each possible key length
    for (let period = 2; period <= this.maxKeyLength; period++) {
      // extract sequences (based on period)
      const sequences = this.extractSequences(period);
      const resultObject = {};
      let sumICs = 0;
      // calculate IoC for each sequence and store the results
      sequences.forEach((sequence, index) => {
        const ic = this.IoC(sequence);
        resultObject['sequence'+index] = {
          sequence: sequence,
          ic: ic
        }
        sumICs += ic;
      })

      resultObject['averageIC'] = sumICs / period;
      resultObject['period'] = period;


      this.ICResults['keyLength'+period] = resultObject;
    }
  }
  /**
   * 
   * @param {number} numberOfPossibleKeys 
   * @return {array} likelyKeyLengths
   */
  getLikelyKeyLengths (numberOfPossibleKeys) {
    const likelyKeyLengths = []
    const allResults = [];
    for (let i=this.minKeyLength; i <= this.maxKeyLength; i++) {
      allResults.push(this.ICResults['keyLength'+i])
    }
    allResults.sort((a, b) => {
      if (a.averageIC < b.averageIC) return true
      return false
    })

    for (let i = 0; i < numberOfPossibleKeys; i++) {
      likelyKeyLengths.push(allResults[i].period)
    }

    return likelyKeyLengths;
  }
  /**
   * Uses frequency analysis, applying the Chi-squared statistic, to find likely characters in the key, given a length.
   * @param {number} keyLength
   */
  findLikelyKeyCharacters (keyLength) {
    const sequences = [];
    for(let i = 0; i < keyLength; i++) {
      sequences.push(this.ICResults['keyLength'+keyLength]['sequence'+i].sequence); // .join('')

    }

    // Apply frequency analysis to each sequence (which was encrypted using the same Cesar cipher)
    // 
    sequences.forEach(sequence => {
      //const characterCount = this.countCharacters(sequence)
      let chiSquared = 0;
      // run through each of the 26 characters in the alphabet
      alphabet.forEach(character => {
        // decrypt the sequence using each character in the alphabet

        // count the occurrences of each character in the alphabet in the "decrypted" sequence 

        // calculate the Chi-squared statistic for the decrypted sequence

        // For each position in the key, store the chi-squared of each character

        // get the three most probable characters for each position in the key (array of arrays)

        // return the array of arrays of characters to be used for brute force attack
      })
      letterDistribution
    })

  }
  /**
   * Count the occurrences of the 26 letters in the english alphabet in an array.
   * @param {array} sequence 
   */
  countCharacters (sequence) {
    const characterCount = getCharacterCountBlueprint();
    for (let i = 0; i < sequence.length; i++) {
      const character = sequence[i];
      try {
        characterCount[character]++;
      } catch (err) {
        console.log('IoC function only supports characters A-Z!')
        console.log(err)
        return undefined;
      }
    }

    return characterCount;
  }


  /**
   * 
   * @param {Array} sequence 
   * @return {number} IC
   */
  IoC(sequence) {
    const characterCount = this.countCharacters(sequence)
  
    let enumerator = 0;
    Object.values(characterCount).forEach((numberOfOccurrences) => {
      enumerator += numberOfOccurrences * (numberOfOccurrences - 1);
    })
  
    const IC = enumerator / ( (sequence.length * (sequence.length - 1) ) / this.alphabetLength )
    return IC;
  }

  /**
   * 
   * @param {number} period 
   * @returns {array} sequences
   */
  extractSequences (period) {
    let sequences = [];

    for (let j = 0; j < period; j++) {
      const nextSequence = [];
      for (let i = j; i < this.cipherText.length; i += period) {
        nextSequence.push(this.cipherText[i]);
      }
      sequences.push(nextSequence);
    }
    // console.log(sequences)
    return sequences;
  }
  /**
   * Prints Index of Coincidence (IC) results for individual sequences for different key lengths (periods) and the average IC for that period.
   */
  printICResults() {
    Object.keys(this.ICResults).forEach((key) => {
      if (key === 'source') {
        console.log('Source IC: ', this.ICResults[key])
      } else {
        console.table(key);
        Object.keys(this.ICResults[key]).forEach((key2) => {
          const sequenceResults = this.ICResults[key]
          if (key2 === 'averageIC') {
            console.log('Average IC: ', sequenceResults[key2])
          } 
          if (!sequenceResults[key2].sequence) return;
          console.log(sequenceResults[key2].ic, sequenceResults[key2].sequence.join(''))
        })
      }
    })
  }
  /**
   * Prints the average Index of Coincidence (IC) together with the used key length (period).
   */
  printAverageICs () {
    for (let i=this.minKeyLength; i <= this.maxKeyLength; i++) {
      console.log('Key Length: ' + i, 'Average IC: ' + this.ICResults['keyLength'+i]['averageIC'])
    }
  }
}


// Find period:
// calcultate Index of Coinsidence
// best n matches are preserved as possible key lengths. (should be fairly certain about this one)
    // need only to test up to a period of 10


// Solve each of the characters as you would a Cesar cipher using frequency analysis, by calculating the Chi-squared statistic for each of the 26 possible characters (use numbers for characters)

// the m characters (numbers) with the lowest chi-squared are preserved as possible vlues for the key



// With m possible characters for each position of the key, the text is decrypted with each possible key 
    // the decrypted text, from each key, has the frequency distributions calculated and compared to the frequency distribution in the English language using Chi-Squared statistic.
    // rank order the decrypted texts with the lowest Chi-squared apprearing first
    // print the fist k characters for each decrypted text to the console (together with the key used), rank order according to chi-squared,
    // The user manually reads each line until the correct key is found




// The CLI tool need to be able to decrypt the cipher text given a key


/*
{
        seq1: {
          sequence:
          ic: 
        },
        seq2: 
      }


*/