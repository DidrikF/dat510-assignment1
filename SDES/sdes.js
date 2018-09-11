
// S-DES Encryption
/**
 * Encrypt using SDES
 * @param {string} plain_text 
 * @param {string} key 
 */
function SDES_encrypt (plain_text, key) {
    const processed_plain_text = plain_text.split('').map(bit => {
        return parseInt(bit, 10);
    })
    const processed_key = key.split('').map(bit => {
        return parseInt(bit, 10)
    })

    const K1 = P8(LS_1(P10(processed_key)));
    const K2 = P8(LS_2(LS_1(P10(processed_key))));
    const cipher_text = IP_inverse(fk( SW(fk( IP(processed_plain_text), K1 )), K2 ));

    return cipher_text.join('');
}
// S-DES Decryption
/**
 * Decrypt using SDES
 * @param {string} cipher_text 
 * @param {string} key 
 */
function SDES_decrypt (cipher_text, key) {
    const processed_cipher_text = cipher_text.split('').map(bit => {
        return parseInt(bit, 10);
    })
    const processed_key = key.split('').map(bit => {
        return parseInt(bit, 10)
    })

    const K1 = P8(LS_1(P10(processed_key)));
    const K2 = P8(LS_2(LS_1(P10(processed_key))));

    const plain_text = IP_inverse(fk( SW(fk( IP(processed_cipher_text), K2 )), K1 ));

    return plain_text.join('')
}


// Functions
function IP (plainText) {
    const IP_rule = [2,6,3,1,4,8,5,7];
    let result = [];
    IP_rule.forEach((index) => {
        result.push(plainText[index-1])
    })
    return result;
}

function IP_inverse (intermediary) {
    const IP_inverse_rule = [4,1,3,5,7,2,8,6];
    let result = [];
    IP_inverse_rule.forEach((index) => {
        result.push(intermediary[index-1])
    })
    return result;
}


function fk (LR, subKey) {
    const L = LR.slice(0,4);
    const R = LR.slice(4);

    const left = exclusive_OR(L, F(R, subKey))
    return [...left, ...R];
}

function F (right_4_bits, subKey) {
    // Expansion/permutation operation
    const E_P_rule = [4,1,2,3,2,3,4,1];
    let E_P_result = [];
    E_P_rule.forEach((index) => {
        E_P_result.push(right_4_bits[index-1])
    })

    const XOR_result = exclusive_OR(E_P_result, subKey)

    const XOR_left = XOR_result.slice(0,4);
    const XOR_right = XOR_result.slice(4);

    const S0_result = S0_box(XOR_left); // 4 bits to 2 bits
    const S1_result = S1_box(XOR_right); // 4 bits to 2 bits

    const S0_S1_results = [...S0_result, ...S1_result]

    const P4_rule = [2,4,3,1];
    const P4_result = [];
    P4_rule.forEach((index) => {
        P4_result.push(S0_S1_results[index-1]) // S0 S1 resutls...
    })

    return P4_result
}

function S0_box (four_bits) {
    /*const S0 = [
        [1,0,3,2],
        [3,2,1,0],
        [0,2,1,3],
        [3,1,3,2]
    ]*/
    const S0 = [
        [[0,1],[0,0],[1,1],[1,0]],
        [[1,1],[1,0],[0,1],[0,0]],
        [[0,0],[1,0],[0,1],[1,1]],
        [[1,1],[0,1],[1,1],[1,0]]
    ]
    const row = translate_bit_to_decimal(four_bits[0], four_bits[3])
    const col = translate_bit_to_decimal(four_bits[1], four_bits[2])
    
    return S0[row][col]
}

function S1_box (four_bits) {
    /*const S1 = [
        [0,1,2,3],
        [2,0,1,3],
        [3,0,1,0],
        [2,1,0,3]
    ]*/
    const S1 = [
        [[0,0],[0,1],[1,0],[1,1]],
        [[1,0],[0,0],[0,1],[1,1]],
        [[1,1],[0,0],[0,1],[0,0]],
        [[1,0],[0,1],[0,0],[1,1]]
    ]
    const row = translate_bit_to_decimal(four_bits[0], four_bits[3])
    const col = translate_bit_to_decimal(four_bits[1], four_bits[2])

    return S1[row][col]
}

function SW (eight_bits) {
    return [...eight_bits.slice(4), ...eight_bits.slice(0,4)]
}

function exclusive_OR (arr1, arr2) {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
        if ( ( arr1[i] || arr2[i] ) && !( arr1[i] && arr2[i] ) ) {
            result.push(1);
        } else {
            result.push(0);
        }
    }
    return result;
}

function translate_bit_to_decimal (first_bit, second_bit) {
    return parseInt(''+first_bit+second_bit, 2);
}



// KEY GENERATION
function P10 (key) {
    const P10_rule = [3,5,2,7,4,10,1,9,8,6];
    let result = [];
    P10_rule.forEach((index) => {
        result.push(key[index-1])
    })
    return result;
}


function LS_1 (intermediary) {
    const leftHalf = intermediary.slice(0,5)
    const rightHalf = intermediary.slice(5)
    const shifted1 = arrayRotateLeft(leftHalf);
    const shifted2 = arrayRotateLeft(rightHalf);
    return [...shifted1, ...shifted2];
}


function P8 (intermediary) {
    const P8_rule = [6,3,7,4,8,5,10,9];
    let result = [];
    P8_rule.forEach((index) => {
        result.push(intermediary[index-1])
    })
    return result;
}

function LS_2 (intermediary) {
    const leftHalf = intermediary.slice(0,5)
    const rightHalf = intermediary.slice(5)
    const shifted1 = arrayRotateLeft(arrayRotateLeft(leftHalf));
    const shifted2 = arrayRotateLeft(arrayRotateLeft(rightHalf));
    return [...shifted1, ...shifted2];
}

// HELPERS
function arrayRotateLeft (a) {
    a.push(a.shift())
    return a
}


module.exports.SDES_encrypt = SDES_encrypt;
module.exports.SDES_decrypt = SDES_decrypt;