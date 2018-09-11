const colors = require('colors')
const { SDES_encrypt, SDES_decrypt } = require('./sdes');
const cTable = require('console.table')


const table = [
    // key          text                        text        key
    ['0000000000', '00000000', SDES_encrypt('00000000', '0000000000')],
    ['0000011111', '11111111', SDES_encrypt('11111111', '0000011111')],
    ['0010011111', '11111100', SDES_encrypt('11111100', '0010011111')],
    ['0010011111', '10100101', SDES_encrypt('10100101', '0010011111')],
    ['1111111111', SDES_decrypt('00001111', '1111111111'), '00001111'],
    ['0000011111', SDES_decrypt('01000011', '0000011111'), '01000011'],
    ['1000101110', SDES_decrypt('00011100', '1000101110'), '00011100'],
    ['1000101110', SDES_decrypt('11000010', '1000101110'), '11000010']
]



console.table(['Raw key', 'Plain text', 'Cipher text'], table)