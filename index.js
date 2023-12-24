const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Task Management Server is Running!.')
})

const uri = "mongodb+srv://iforhad445:ZMC5gYP2hQu32V7J@cluster0.mk2kruo.mongodb.net/?retryWrites=true&w=majority";

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
        const ToDoCollection = client.db("AllTask").collection("TodoList");

        app.get('/toDoList', async (req, res) => {
            const result = await ToDoCollection.find().toArray();
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Task Management Server Running ${port}`)
})