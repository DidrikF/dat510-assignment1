// Alphabet in array

// Letter distribution in array, corresponding to alphabet

// Letter to number mapping, and the reverse

// Object to hold letter distribution in cipher text {A: ..., B: ..., C: ..., ...}



// Does it make sense to encrypt and decrypt in same function?
// Function to encrypt


// Function to decrypt 



// Find period:
// calcultate Index of Coinsidence
// best best n matches are preserved as possible key lengths. (should be fairly certain about this one)
    // need only to test up to a period of 10


// Solve each of the characters as you would a Cecar cipher using frequency analysis, by calculating the Chi-squared statistic for each of the 26 possible characters (use numbers for characters)

// the m characters (numbers) with the lowest chi-squared are preserved as possible vlues for the key



// With m possible characters for each position of the key, the text is decrypted with each possible key 
    // the decrypted text, from each key, has the frequency distributions calculated and compared to the frequency distribution in the English language using Chi-Squared statistic.
    // rank order the decrypted texts with the lowest Chi-squared apprearing first
    // print the fist k characters for each decrypted text to the console (together with the key used), rank order according to chi-squared,
    // The user manually reads each line until the correct key is found




// The CLI tool need to be able to decrypt the cipher text given a key


// Objects, how to structure the code?

// Cipher text class

// Key class ?