//const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj)

// var user = {name:"Bijay",age:24};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server at port 27017');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // }, (err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     _id:"1",
    //     name:"Bijay",
    //     location:"Delhi",
    //     age:24
    // }, (err,result)=>{
    //     if(err){
    //         return console.log("Unable to insert",err);
    //     }
    //     console.log(JSON.stringify(result.ops));
    // });

    client.close();
});