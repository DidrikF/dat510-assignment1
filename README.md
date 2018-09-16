# Cracking Poly-alphabetic substitution cipher + implementation and cracking of SDES/Trippel SDES

### The contents of the directory

```
dat500-assignment1
│   package.json    // Declares package dependencies for the project
│   package-lock.json   // Lists the installed packages with exact version numbers
│   .gitignore  // Excludes "node-modules" from git
│
└───SDES    // Folder containing code related to Part 2
│   │   ctx1.txt    // Cipher text to crack
│   │   ctx2.txt    // Cipher text to crack
│   │   Decrypter.js    // Classes for cracking and decryption of SDES and Trippel SDES
|   |   sdes.js // Implementation of SDES encryption and decryption
|   |   task1.js    // Entry point for Part2 - taks 1
|   |   task2.js    // Entry point for Part2 - taks 2
|   |   task3.js    // Entry point for Part2 - taks 3
|   |   tests.js    // Tests for the implementation of SDES
|   |   trippel_sdes.js // Implementation of Trippel SDES encryption and decryption
│   
└───vigenere // Folder containing code related to Part 1
|   │   cipher-text.txt // Cipher text to crack
|   |   Decrypter.js // Decrypter class containing code to crack and decrypt the cipher text
|   |   helpers.js // Varius helper objects and functions
|   |   index.js // Entry point for part 1 of the project
└───node_modules // Folder containing installed packages, exogenous to Node.js core packages.
```


### Setup and installation
The assignemnt was solved using JavaScript and Node.js. To be able to run the programs, Node.js need to be installed.
Download and install Node.js using this link: [https://nodejs.org/en/download/]
The installer should add Node.js to your path. To check that your installation completed successfully you can run `node -v`
to print the current version of Node.js installed on the machine.

Depending on the operating system you are using, the dependencies requried may or may not work out of the box. 
If you are having issues with any of the dependencies I recommend deleting the "node_modules" folder and running:
`npm install`. this will reinstall all packages the project depends on. NPM is a package manager for Node, and is installed 
alongside it by default.

Your shold now be ready to run the code.

### Running the code

#### Part 1: Poly-alphabetic Ciphers
Decrypt the poly-alphabetic sustitution cipher:

`node vigenere/index` 

Decrypt the poly-alphabetic sustitution cipher and in addition; print the results of the Index of Coincidens and Chi-squared statistic calculations:

`node vigenere/index --verbose=true`

#### Part 2: Simplified DES

##### Taks 1
Test the SDES encryption/decryption implementation with the provided tests cases given in Part 2:

`node SDES/tests`

Encrypts/decrypts the plaintext/ciphertext given in task 1 using the Simplifed DES algorithm and prints out the completed table:

`node SDES/task1`

##### Task 2
Encrypts/decrypts the plaintext/ciphertext given in task 2 using trippel SDES and prints out the completed table:

`node SDES/task2`

##### Task 3
Cracks both the SDES and Trippel SDES encrypted messages given in ctx1.txt and ctx2.txt:

`node SDES/task3`

