const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var password = '123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password, salt,(err,hash)=>{
//         console.log(`hash ${hash}`);
//     });
// });

var hashedPassword = '$2b$10$RkL0PsWuAHwLjJnGd55T/O7a7MIcwO.v0OxhiOmsEb5je0CnsYtHy';

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
});






// var data ={
//     id:10
// };

// var token = jwt.sign(data,'secretKey');
// console.log(token);

// var decoded = jwt.verify(token,'secretKey');
// console.log('decoded',decoded);

// var message = 'I am number 3';
// var hash = SHA256(message).toString();

// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);

// var data = {
//     id:4
// };

// var token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+'secretKey').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'secretKey').toString();

// if(resultHash === token.hash){
//     console.log("Data has not Changed");
// }else{
//     console.log("Data has changed");
// }