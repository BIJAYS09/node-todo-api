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
    
    db.collection('Todos').findOneAndUpdate({
         _id:new ObjectID("5eda7570eabd5fcaad9c0c1d")
        },{
            $set:{
                completed: true
            }
        },{
            returnOriginal: false
        }).then((todos)=>{
            console.log(`Updated ${JSON.stringify(todos,undefined,2)}`);
        });

    client.close();
});