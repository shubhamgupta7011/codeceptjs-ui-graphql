let CryptoJS = require("crypto-js");
const oktaKey = process.env.OKTA_KEY;

//put the url in encrypt() function
// And Run this js by using node like
// +node URL_ENcode.js

let ciphertext = CryptoJS.AES.encrypt('https://shared01-stg-g1dr-kong-proxy.az.eu-az-stg-data.gdpdentsu.net/mapping-api', oktaKey);

// Decrypt
let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), oktaKey).toString(CryptoJS.enc.Utf8);
console.log(ciphertext.toString()); //shows encrypted form
console.log(bytes); //shows decrypted form