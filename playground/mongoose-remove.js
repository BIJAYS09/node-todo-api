const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require(('./../server/models/user'));

// Todo.remove({}).then((todo)=>{
//     console.log(todo);
// });

// Todo.findByIdAndRemove('5ee07f65eabd5fcaad9c1db8').then((todo)=>{
//     console.log(todo);
// });

// Todo.findByIdAndRemove('5ee0802feabd5fcaad9c1deb',(todo)=>{
//     console.log(todo);
// });

// Todo.findOneAndRemove({_id:'5ee0802feabd5fcaad9c1deb'}).then((todo)=>{

// });