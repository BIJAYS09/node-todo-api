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
    
    // db.collection('Todos').deleteMany({text:"Eat"}).then((todos)=>{
    //     console.log(`Deleted ${todos}`);
    //     console.log(JSON.stringify(todos,undefined,2));
    // },(err)=>{
    //     console.log('Unable to delete ',err);
    // });

    // db.collection('Todos').deleteOne({text:"Eat"}).then((todos)=>{
    //     console.log(`Deleted ${todos}`);
    //     console.log(JSON.stringify(todos,undefined,2));
    // },(err)=>{
    //     console.log('Unable to delete ',err);
    // });

    db.collection('Todos').findOneAndDelete({completed:false}).then((todos)=>{
        console.log(`Deleted ${todos}`);
        console.log(JSON.stringify(todos,undefined,2));
    },(err)=>{
        console.log('Unable to delete ',err);
    });

    client.close();
});