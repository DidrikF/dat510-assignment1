const { allPossibleCases } = require('../vigenere/helpers')
const { SDES_decrypt } = require('./sdes')
const { trippel_SDES_decrypt } = require('./trippel_sdes')
const colors = require('colors')
 
class SDES_Decrypter {
    /**
     * 
     * @param {string} cipherText 
     */
    constructor(cipherText) {
        this.cipherText = cipherText;

    }

    // generate all possible keys (2^10 = 1024)
    
    decrypt() {
        const possibleKeys = allPossibleCases([['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1']])
        let decrypted = [];
        
        // for each key decrypt the message
        possibleKeys.forEach(key => {
            let plain_text = '';
            for (let i = 0; i < this.cipherText.length; i += 8) {
                const eight_cipher_bits = this.cipherText.slice(i, i+8)
                const eight_plain_bits = SDES_decrypt(eight_cipher_bits, key)
                plain_text += eight_plain_bits;
            }
            decrypted.push({
                asciiCodes: binaryBufferToDecimal(plain_text),
                key: key
            })
        })

        
        // rank order with the higest number of ASCII characters with character codes between 65-90 (A-Z) and 97-122 (a-z)
        decrypted.sort((a, b) => {

            // count the number of occurences of (A-Za-z)
            const countA = a.asciiCodes.reduce((total, next) => {
                if ((65<=next && next<=90) || (97<=next && next<=122)) {
                    return total + 1
                } else {
                    return total
                }
            }, 0)

            const countB = b.asciiCodes.reduce((total, next) => {
                if ((65<=next && next<=90) || (97<=next && next<=122)) { 
                    return total + 1
                } else {
                    return total  
                } 
            }, 0)

            return countB - countA
        })
        
        // print the top 20 decrypted results
        decrypted.slice(0, 20).forEach(decryptedObject => {
            console.log(colors.green(decryptedObject.key + ': ') + decimalToString(decryptedObject.asciiCodes))
        })

    }
}


class Trippel_SDES_Decrypter {

    constructor (cipherText) {
        this.cipherText = cipherText;
    }

    decrypt () {
        const possibleKeys = allPossibleCases([['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1'], ['0', '1']])
        let decrypted = [];

        possibleKeys.slice(1020000).forEach((key, index) => {
            let plain_text = '';
            const key1 = key.slice(0, 10)
            const key2 = key.slice(10)

            for (let i = 0; i < this.cipherText.length; i += 8) {
                const eight_cipher_bits = this.cipherText.slice(i, i+8)
                const eight_plain_bits = trippel_SDES_decrypt(eight_cipher_bits, key1, key2)
                plain_text += eight_plain_bits;
            }

            const asciiCodes = binaryBufferToDecimal(plain_text)

            const normalLetterCount = asciiCodes.reduce((total, next) => {
                if ((65<=next && next<=90) || (97<=next && next<=122)) {
                    return total + 1
                } else {
                    return total
                }
            }, 0)

            decrypted.push({
                asciiCodes: asciiCodes,
                key1: key1,
                key2: key2,
                count: normalLetterCount,
                keyIndex: index
            })

            if ((index % 5000) === 0) {
                console.log('Have decrypted using ' + index + ' keys')
            }

        })

        // rank order with the higest number of ASCII characters with character codes between 65-90 (A-Z) and 97-122 (a-z)
         decrypted.sort((a, b) => {
            return b.count - a.count;
        })


        // print the top 15 decrypted results
        console.log(colors.cyan('\nTop 15 results:\n'))
        console.log('Column names: Key index - Key 1 - Key 2 - Number of A-Za-z characters - ASCII after decryption')
        decrypted.slice(0, 15).forEach(decryptedObject => {
            console.log(colors.green(decryptedObject.keyIndex + ': ' + decryptedObject.key1 + ' - ' + decryptedObject.key2 + ': ') + colors.red(decryptedObject.count) + ': ' + decimalToString(decryptedObject.asciiCodes))
        })
    }

    


}



/**
 * Takes a buffer/string from a string of 1's and 0's
 * @param {Buffer} binary 
 */
function binaryBufferToASCII (binary) {
    var result = '';
    const bytes = []
    for (let i = 0; i < binary.length; i += 8) {
        bytes.push(binary.slice(i, i+8))
    }
    for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(parseInt(bytes[i], 2))
    }

    return result;
}

/**
 * Takes a buffer/string from a string of 1's and 0's and returns an array of decimals (ASCII codes)
 * @param {Buffer} binary
 * @returns {number[]} arrayOfDecimals
 */
function binaryBufferToDecimal (binary) {
    var arrayOfDecimals = [];
    const bytes = []
    for (let i = 0; i < binary.length; i += 8) {
        bytes.push(binary.slice(i, i+8))
    }
    for (let i = 0; i < bytes.length; i++) {
        arrayOfDecimals.push(parseInt(bytes[i], 2))
    }

    return arrayOfDecimals;
}

function decimalToString (asciiCodeArray) {
    let result = ''
    asciiCodeArray.forEach(code => {
        result += String.fromCharCode(code)
    })
    return result
}

module.exports.SDES_Decrypter = SDES_Decrypter
module.exports.Trippel_SDES_Decrypter = Trippel_SDES_Decrypter
module.exports.binaryBufferToASCII = binaryBufferToASCII