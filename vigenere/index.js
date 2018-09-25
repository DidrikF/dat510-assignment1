const { parseRunOptions } = require('./helpers');
const fs = require('fs');
const path = require('path')
const Decrypter = require('./Decrypter')
const colors = require('colors')

const runOptions = parseRunOptions();
let cipherText = '';

try {
    cipherText = fs.readFileSync(path.join(process.cwd(), 'vigenere', 'cipher-text-new.txt')).toString();
} catch (err) {
    console.log('Failed to read cipher-text file.')
    console.log(err);
    process.exit(1)
}


const decrypter = new Decrypter(cipherText, 10);

if (runOptions.verbose) {
    console.log(colors.cyan('Index of Coincidence calculation results: '))
    decrypter.calculateICResults();
    decrypter.printICResults();
    decrypter.printAverageICs();
}


decrypter.decrypt(10)


if (runOptions.verbose) {
    console.log(colors.cyan('Chi-squared calculation results: '));
    console.log(decrypter.frequencyAnalysisResults)
}





// Objects, how to structure the code?

// Cipher text class

// Key class ?