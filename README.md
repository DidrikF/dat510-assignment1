# dat510-assignment1

### Setup and installation
The assignemnt was solved using JavaScript and Node.js. To be able to run the programs, Node.js need to be installed.
Download and install Node.js using this link: [https://nodejs.org/en/download/]
The installer should add Node.js to your path. To check that your installation completed successfully you can run `node -v`
to print the current version of Node.js installed on the machine.

Depending on the operating system you are using, the dependencies requried may or may not work out of the box. 
If you are having issues with any of the dependencies I recommend deleting the "node_modules" folder and running:
`npm install`. this will reinstall all packages the project depends on.

Your shold now be ready to run the code.

### Running the code

#### Part 1: Poly-alphabetic Ciphers
Decrypt the poly-alphabetic sustitution cipher:

`node vigenere/index` 

Decrypt the poly-alphabetic sustitution cipher and in addition; print the results of the Index of Coinsidens and Chi-squared statistic calculations.

`node vigenere/index --verbose=true`

#### Part 2: Simplified DES

##### Taks 1
Encrypts/decrypts the plaintext/ciphertext given in task 1 using the Simplifed DES algorithm and prints out the completed table. 

`node SDES/task1`

##### Task 2
Encrypts/decrypts the plaintext/ciphertext given in task 2 using trippel SDES and prints out the completed table. 

`node SDES/task2`

##### Task 3
Cracks both the SDES and Trippel SDES encrypted messages given in ctx1.txt and ctx2.txt.

`node SDES/task3`
