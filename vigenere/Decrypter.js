const { allPossibleCases, characterDistributionArray, numberLetter, getCharacterCountBlueprint, translateCharactersToNumberes, translateNumbersToCharacters, numberAlphabet, getCharNumberCountBlueprint } = require('./helpers');
const cTable = require('console.table');
const colors = require('colors');

module.exports = class Decrypter {
  /**
   * Builds the Decrypter object and set some parameters on it. Including the cipher text to be decrypted and the maximum key length used for encryption.
   * @param {string} cipherText 
   * @param {number} maxLength 
   */
  constructor (cipherText, maxLength) {
    this.cipherText = cipherText;
    this.cipherNumbers = translateCharactersToNumberes(cipherText.split(''))
    this.maxKeyLength = maxLength;
    this.minKeyLength = 2;
    this.alphabetLength = 26;
    this.ICResults = {};
    this.frequencyAnalysisResults = null;
    this.uncertainKey = [];
  }

  /**
   * Decrypt the Decrypter's cipher text, assuming its a Vigenere cipher.
   * @param {number} attempts 
   */
  decrypt(attempts) {
    
    this.calculateICResults();

    const likelyKeyLengths = this.getLikelyKeyLengths(3);
    
    console.log('The key is likely of length: ', likelyKeyLengths)
    console.log('Attempting to find possible keys provided that the key length is ' + likelyKeyLengths[0] + '.')

    const possibleKeys = this.findLikelyKeyCharacters(6)
    console.log('The top 3 letters for each of the ' + likelyKeyLengths[0] + ' character positions in the key are as follows:')
    console.log(possibleKeys);
    console.log('These characters where determined to be most likely to comprise the actual key. Frequency analysis using the Chi-squared statistic where used calculate this.')
    console.log(colors.yellow('   For more information about the intermetiate calculations, set the verbose flag to true (node vigenere/index --verbose=true).'))
    console.log('')
    

    attempts = attempts || Math.pow(3, likelyKeyLengths[0]);

    console.log('There are ' + Math.pow(this.alphabetLength, likelyKeyLengths[0]) + ' possible key combinations using a ' + likelyKeyLengths[0] + ' letter key. That is too many to parse through manually.')

    console.log(`Therefore only the letters most likely to be in the actual key (based on Chi-squared) is used in the brute-force attack. 
    Using the three most likely characters for each character position restricts the amount of possible keys to: ` + Math.pow(3, likelyKeyLengths[0]))

    console.log('Attempting to decrypt the cipher text using the first ' + attempts + ' keys.');

    console.log('The attempts at decrypting the message yielded the results printed below. Try to spot valid english, the key is printed in green next too it.\n\n')
    console.log(colors.magenta('Brute-force decryption results:'))
    
    this.bruteForce(possibleKeys, attempts);

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
          sequenceAsNumbers: translateCharactersToNumberes(sequence),
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
   * Goes through the Index of Coincidence (IC) results for each key length (period) and sorts them based on the average IC.
   * The key lengths with the higest IC, up to a number of "numberOfPossibleKeys" keys, are returned in an array.
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
   * Uses frequency analysis, applying the Chi-squared statistic, to find likely characters in the key, given a key length.
   * @param {number} keyLength
   * @return {number[][]} bruteForceKey
   */
  findLikelyKeyCharacters (keyLength) {
    const sequences = [];
    for(let i = 0; i < keyLength; i++) {
      sequences.push(this.ICResults['keyLength'+keyLength]['sequence'+i].sequenceAsNumbers); // .join('')

    }

    const frequencyAnalysisResults = {};
    const possibleKeys = [];

    // Apply frequency analysis to each sequence (which was encrypted using the same Cesar cipher)
    sequences.forEach((sequence, charPosInKey) => {      
      // run through each of the 26 characters in the alphabet
      numberAlphabet.forEach((charNum) => {

        // decrypt the sequence using each character in the alphabet
        const decrypted = this.decryptCesarCipher(sequence, charNum);

        // count the occurrences of each character in the alphabet in the "decrypted" sequence 
        const charNumberCount = this.countCharNumbers(decrypted); // OBS count characters as numbers
        
        // calculate the Chi-squared statistic for the decrypted sequence
        let chiSquared = 0;
        numberAlphabet.forEach(charNum2 => {
          chiSquared += Math.pow(charNumberCount[charNum2] - characterDistributionArray[charNum2]*sequence.length, 2) / (characterDistributionArray[charNum2]*sequence.length)
        })

        // For each position in the key, store the chi-squared of each character
        if (!frequencyAnalysisResults[charPosInKey]) frequencyAnalysisResults[charPosInKey] = [];
        
        frequencyAnalysisResults[charPosInKey].push({
          character: numberLetter[charNum],
          keyChar: charNum,
          chiSquared: chiSquared
        })

      })

      // get the three most probable characters for each position in the key (array of arrays)
      frequencyAnalysisResults[charPosInKey].sort((a, b) => {
        return a.chiSquared - b.chiSquared;
      })
      possibleKeys.push([frequencyAnalysisResults[charPosInKey][0].character, frequencyAnalysisResults[charPosInKey][1].character, frequencyAnalysisResults[charPosInKey][2].character])
    
    })
    // Store frequency analysis using Chi-squared if the user later wants to print them to stdout.
    this.frequencyAnalysisResults = frequencyAnalysisResults;
    
    // return the array of arrays of characters to be used for brute force attack
    return possibleKeys;
  }

  /**
   * Finds all possible keys given an array of arrays of characters and tries each of them up until a given number of attamps.
   * Having the characters for each key position sorted in decending order according to the chi-squared statistic should yield
   * the decrypted text in fewer attempts.
   * @param {string[][]} possibleKeys 
   * @param {number} attempts 
   */
  bruteForce (possibleKeys, attempts) {
    const possibleKeyCombinations = allPossibleCases(possibleKeys);
    let i = 0;
    possibleKeyCombinations.forEach(key => {
      if (i >= attempts) return
      console.log(colors.green(key) + ': ' + colors.white(this.decipherVigenereCipher(this.cipherNumbers, translateCharactersToNumberes(key.split('')))));
      i++
    })
  }

  /**
   * Takes the Cesar cipher text expressed as an array of numbers (0-25) and decipher it using the key, also a number.
   * @param {number} keyNumber 
   */
  decryptCesarCipher (cipherNumbers, keyNumber) {
    const decrypted = [];
    cipherNumbers.forEach(cipherNumber => {
      const decryptedNumber = (cipherNumber - keyNumber + this.alphabetLength) % this.alphabetLength
      decrypted.push(decryptedNumber);
    })

    return decrypted;
  }

  /**
   * Decrypts a Vigenere cipher text expressed as an array of numbers (0-25) and deciphers it using the key, also an array of numbers.
   * @param {number[]} cipherNumbers 
   * @param {number[]} keyNumbers 
   */
  decipherVigenereCipher (cipherNumbers, keyNumbers) {
    let decrypted = [];
    cipherNumbers.forEach((cipherNumber, index) => {
      const key = keyNumbers[index % keyNumbers.length]
      const decryptedNumber = (cipherNumber - key + this.alphabetLength) % this.alphabetLength;
      decrypted.push(decryptedNumber);
    })

    return translateNumbersToCharacters(decrypted).join('');
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
   * Count the number of occurrences of numbers (0-25) in an array.
   * @param {number[]} sequence
   * @returns {object} charNumberCount
   */
  countCharNumbers (sequence) {
    const charNumberCount = getCharNumberCountBlueprint();
    for (let i = 0; i < sequence.length; i++) {
      const charNumber = sequence[i];
      try {
        charNumberCount[charNumber]++;
      } catch (err) {
        console.log('IoC function only supports charNumber 0-25!')
        console.log(err)
        return undefined;
      }
    }

    return charNumberCount;
  }


  /**
   * Calculate the Index of Coincidence for an array of characters.
   * @param {string[]} sequence 
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
   * Extract sequences from the Decrypter chipher text with a given period.
   * @param {number} period 
   * @returns {string[][]} sequences
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


// use generator function to create an iterator, looping though the available keys.



