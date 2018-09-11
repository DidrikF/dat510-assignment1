const fs = require('fs')
const path = require('path')
const { SDES_Decrypter, Trippel_SDES_Decrypter, binaryBufferToASCII } = require('./Decrypter')

let binary1 = null;
let binary2 = null;

try {
    binary1 = fs.readFileSync(path.join(process.cwd(), 'SDES', 'ctx1.txt'));
    binary2 = fs.readFileSync(path.join(process.cwd(), 'SDES', 'ctx2.txt'));
} catch (err) {
    console.log('Failed to read cipher-text file.')
    console.log(err);
    process.exit(1)
}


// console.log(binary)
// console.log(binary.toString())

const sdes_decrypter = new SDES_Decrypter(binary1.toString())

const trippel_sdes_decrypter = new Trippel_SDES_Decrypter(binary2.toString())

// decrypter.decrypt()

trippel_sdes_decrypter.decrypt()

