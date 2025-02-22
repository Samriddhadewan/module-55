const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

// dewansamriddha
// JtzaqJmY5Yt8JfzV



const uri = "mongodb+srv://dewansamriddha:JtzaqJmY5Yt8JfzV@cluster0.mx4ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDb");
    const userCollection = database.collection("user")

    app.get("/users", async(req, res)=> {
        const users = userCollection.find();
        const result = await users.toArray();
        res.send(result);
    })

    app.get("/users/:id", async(req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await userCollection.findOne(query);
      res.send(result)
    })

    app.post("/users", async(req, res)=> {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    app.delete("/users/:id", async(req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query)
        res.send(result);        
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) =>{
    res.send("a simple crud is running");
})

app.listen(port, ()=> {
    console.log(`a simple curd server is running in port ${port}`)
})