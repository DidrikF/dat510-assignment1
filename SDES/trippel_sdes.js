const { SDES_encrypt, SDES_decrypt } = require('./sdes');

function trippel_SDES_encrypt (plain_text, key1, key2) {
    return SDES_encrypt(SDES_decrypt(SDES_encrypt(plain_text, key1), key2), key1);
}


function trippel_SDES_decrypt (cipher_text, key1, key2) {
    return SDES_decrypt(SDES_encrypt(SDES_decrypt(cipher_text, key1), key2), key1);
}




module.exports.trippel_SDES_encrypt = trippel_SDES_encrypt
module.exports.trippel_SDES_decrypt = trippel_SDES_decrypt






// test that decryption reverses encryption

/*

const enc = trippel_SDES_encrypt('10101010', '1000101110', '0110101110')
const dec = trippel_SDES_decrypt(enc, '1000101110', '0110101110')

console.log('10101010')
console.log(enc)
console.log(dec)

*/