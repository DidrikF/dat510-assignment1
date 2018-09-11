
// The S-DES encryption algorithm takes an 8-bit block of plaintext (example: 10111101) 
// and a 10-bit key as input 
// and produces an 8-bit block of ciphertext as output


// decryption uses the same 10-bit key

// encruption involves 5 functions
/*
Initial permutation(IP)
complex function (fk), including both permutations and substitution (depends on the key)
simle permutation function that switches (SW) the two halves of data
the function fk again
reversed initial permutation (IP-1)

fk takes an 8-bit key!

Key is first subjected to a permutation P10
then a shift operation is performed
- the output of the shift operation then passes through a permutation function 
    that produces an 8-bit output (P8 perm.func.) for the first subkey (K1)
- The output of the shift operation also feeds into another shft and another instance 
    of P8 (perm.func.) to produce the second subkey (K2)

*/



//const key = [0,0,0,0,0,0,0,0,0,0]
//const theKey = [1,1,1,0,0,0,1,1,1,0];
//const testKey = [1,0,1,0,0,0,0,0,1,0]

//const K1 = P8(LS_1(P10(testKey))); // WORKS
//const K2 = P8(LS_2(LS_1(P10(testKey)))); // WORKS

// const IP_test = IP_inverse(IP([1,2,3,4,5,6,7,8]))

//console.log(K1,K2)
// console.log(IP_test)