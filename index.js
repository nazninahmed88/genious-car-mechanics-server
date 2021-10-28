const express = require('express')
var cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express()
const port = 5000

// middelwave
app.use(cors())
app.use(express.json());

// carmacanik
// password : WyIU7PKbTe4PYAWN


// database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zew5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//mongodb

async function run() {
    try {
      await client.connect(); 
      const database = client.db("carMechanic");
      const servicesCollection = database.collection("services");



//  all services data 
app.get('/services' , async(req , res)=>{
  const cursor = servicesCollection.find({});
  const services = await cursor.toArray();
  res.send(services);
})

//  singel get api

app.get('/services/:id' , async(req, res)=>{
  const id = req.params.id 
  const quary = {_id : ObjectId(id)}
  const services = await servicesCollection.findOne(quary)
  res.json(services)
})



    //   post api 

    app.post('/services', async(req, res) =>{
      const service = req.body
      console.log('hit for api ' , service)
    
      const result = await servicesCollection.insertOne(service);
      console.log(result)
      res.send(result)
      })





      app.delete('/services/:id' , async(req, res)=>{
        const id = req.params.id 
        const quary = {_id:ObjectId(id)}
        const result = await servicesCollection.deleteOne(quary)
        res.json(result)
      })
      

    } 




    
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Car Genes !')
  })


  app.listen(port, () => {
    console.log(`Running start node http://localhost:${port}`)
  })