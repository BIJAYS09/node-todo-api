require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user'); 
var {authenticate} = require('./middleware/authenticate');
const user = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req, res)=>{
   // console.log(req.body);
   var todo = new Todo({
       text: req.body.text,
       _creator: req.user._id
   });

   todo.save().then((doc)=>{
    res.send(doc);
   },(err)=>{
       res.status(400).send(err);
   });

});

app.get('/todos',authenticate,(req, res)=>{
    Todo.find({
        _creator: req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;

    if( !ObjectID.isValid(id)){
       return res.sendStatus(404);
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todos)=>{
        if(!todos){
           return res.sendStatus(404);
        }
        res.status(200).send({todos});
    }).catch((err)=> res.sendStatus(400));
});

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.sendStatus(404);
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.sendStatus(404);
        }
        res.status(200).send({todo});
    }).catch((err)=>res.sendStatus(400));
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.sendStatus(404);
    }

    if(_.isBoolean(body.completed) && body.completed ){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.sendStatus(404);
        }
        res.send({todo});
    }).catch((err)=>{
        res.sendStatus(404);
    });
});

app.post('/users',(req, res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
   
    user.save().then(()=>{
        //res.send(user);
       // console.log(user.generateAuthToken());
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((err)=> res.status(400).send(err));
});

app.post('/users/login',(req, res)=>{
    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password).then((user)=>{
        // res.send(user);
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((err)=>{ 
        res.sendStatus(400);
    });
});

app.get('/users/me',authenticate,(req, res)=>{
    res.send(req.user);
});


app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.sendStatus(200);
    },()=>{
        res.sendStatus(400);
    });
});

app.listen(port,()=>{
   console.log(`Connected tp port ${port}`);
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