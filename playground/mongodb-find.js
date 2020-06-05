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
    
    // db.collection('Todos').find({_id: new ObjectID('5ed8c1ebe112824a1859b9b8')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find({_id: new ObjectID('5ed8c1ebe112824a1859b9b8')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count ${count}`);
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Users').find({name:"Bijay"}).toArray().then((users)=>{
    //     console.log(`fetched users ${users}`);
    //     console.log(JSON.stringify(users,undefined,2));
    // },err => console.log('Unable to fetch',err));

    // db.collection('Users').find().count().then((users)=>{
    //     console.log(`fetched users ${users}`);
    //     console.log(JSON.stringify(users,undefined,2));
    // },err => console.log('Unable to fetch',err));

    client.close();
});