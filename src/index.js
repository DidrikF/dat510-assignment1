const { alphabet } = require('./helpers');
const fs = require('fs');
const path = require('path')
const Decrypter = require('./Decrypter')

let cipherText = '';

try {
    cipherText = fs.readFileSync(path.join(process.cwd(), 'src', 'cipher-text.txt')).toString();
} catch (err) {
    console.log('Failed to read cipher-text file.')
    console.log(err);
}

const decrypter = new Decrypter(cipherText, 10);

decrypter.calculateICResults();

decrypter.printICResults();

decrypter.printAverageICs();

const likelyKeyLengths = decrypter.getLikelyKeyLengths(1);


decrypter.findLikelyKeyCharacters(6)

console.log(likelyKeyLengths);









// Objects, how to structure the code?

// Cipher text class

// Key class ?