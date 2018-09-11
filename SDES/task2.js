const colors = require('colors')
const { trippel_SDES_encrypt, trippel_SDES_decrypt } = require('./trippel_sdes');
const cTable = require('console.table')


const table = [
    // key1             key2        plain           cipher
    ['1000101110', '0110101110', '11010111', trippel_SDES_encrypt('11010111', '1000101110', '0110101110')],
    ['1000101110', '0110101110', '10101010', trippel_SDES_encrypt('10101010', '1000101110', '0110101110')],
    ['1111111111', '1111111111', '00000000', trippel_SDES_encrypt('00000000', '1111111111', '1111111111')],
    ['0000000000', '0000000000', '01010010', trippel_SDES_encrypt('01010010', '0000000000', '0000000000')],
    ['1000101110', '0110101110', trippel_SDES_decrypt('11100110', '1000101110', '0110101110'), '11100110'],
    ['1011101111', '0110101110', trippel_SDES_decrypt('01010000', '1011101111', '0110101110'), '01010000'],
    ['1111111111', '1111111111', trippel_SDES_decrypt('00000100', '1111111111', '1111111111'), '00000100'],
    ['0000000000', '0000000000', trippel_SDES_decrypt('11110000', '0000000000', '0000000000'), '11110000']
]


console.table(['Raw key 1', 'Raw key 2', 'Plain text', 'Cipher text'], table)