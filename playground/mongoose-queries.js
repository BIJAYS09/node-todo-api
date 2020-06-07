const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require(('./../server/models/user'));

var id = '5edbbc5d874b98534cb38957';

if(!ObjectID.isValid(id)){
    console.log('ID is not valid');
}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log(`Find Todos ${todos}`);
// });

// Todo.findOne({
//     _id:id
// }).then((todos)=>{
//     console.log(`FindOne Todos ${todos}`);
// });

// Todo.findById(id).then((todos)=>{
//     if(!todos){
//         return console.log('Id not found');
//     }
//     console.log(`Find by id ${todos}`);
// }).catch((err)=> console.log(err));


User.findById('5edb9f33a847135578023c7c').then((todos)=>{
    if(!todos){
        return console.log("Id not found");
    }
    console.log(JSON.stringify(todos,undefined, 2));
}).catch((err)=> console.log(err));
