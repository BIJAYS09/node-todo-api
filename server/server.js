var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user'); 

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
   // console.log(req.body);
   var todo = new Todo({
       text: req.body.text
   });

   todo.save().then((doc)=>{
    res.send(doc);
   },(err)=>{
       res.status(400).send(err);
   });

});

app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if( !ObjectID.isValid(id)){
       return res.sendStatus(404);
    }

    Todo.findById(id).then((todos)=>{
        if(!todos){
           return res.sendStatus(404);
        }
        res.status(200).send({todos});
    }).catch((err)=> res.sendStatus(400));
});

app.listen(3000,()=>{
   console.log('Connected tp port 3000');
});

module.exports = {app};


// var user = new User({
//     email:'123@abc.com'
// });

// user.save().then((todo)=>{
//     console.log(JSON.stringify(todo,undefined,2));
// },(err)=>{
//     console.log(err);
// });

// var otherTodo = new Todo({
//     text:'Edit this'
// });

// otherTodo.save().then((todo)=>{
//     console.log(JSON.stringify(todo,undefined, 2));
// },(err)=>{
//     console.log(err);
// });

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((todo)=>{
//     console.log('Saved todo', todo);
// },(err)=>{
//     console.log(err);
// });

// var otherTodo = new Todo({
//     text:'Feed Dog',
//     completed: true,
//     completedAt: 1234
// });

// otherTodo.save().then((todo)=>{
//     console.log(JSON.stringify(todo,undefined,2));
// },(err)=>{
//     console.log('Unable to save',err);
// })