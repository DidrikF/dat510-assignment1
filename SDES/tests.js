const { SDES_encrypt, SDES_decrypt } = require('./sdes');
const colors = require('colors');

function testEncryption (plain_text, key, expected) {

    const encrypted = SDES_encrypt(plain_text, key)

    if (encrypted === expected) {
        console.log(colors.green('Successfully ENCRYPTED plain text: ' + plain_text + ' with key: ' + key + ' -> ' + encrypted))
    } else {
        console.log(colors.red('Failed to ENCRYPT plain text: ' + plain_text + ' with key: ' + key))
        console.log(colors.cyan('Got     : ' + encrypted))
        console.log(colors.yellow('Expected: ' + expected))
    }
    console.log('')
}


function testDecryption (cipher_text, key, expected) {

    const decrypted = SDES_decrypt(cipher_text, key)

    if (decrypted === expected) {
        console.log(colors.green('Successfully DECRYPTED cipher text: ' + cipher_text + ' with key: ' + key + ' -> ' + decrypted))
    } else {
        console.log(colors.red('Failed to DECRYPT cipher text: ' + cipher_text + ' with key: ' + key))
        console.log(colors.cyan('Got     : ' + decrypted))
        console.log(colors.yellow('Expected: ' + expected))
    }
    console.log('')
}



const implementationTests = [
    //    Key      plain text  Cipher text
    ['0000000000', '10101010', '00010001'],
    ['1110001110', '10101010', '11001010'],
    ['1110001110', '01010101', '01110000'],
    ['1111111111', '10101010', '00000100']
]


implementationTests.forEach((input) => {
    testEncryption(input[1], input[0], input[2]);
    testDecryption(input[2], input[0], input[1]);
})