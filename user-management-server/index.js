const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = 2468;

// middleware
app.use(cors());
app.use(express.json());

const dbAdmin = process.env.DB_ADMIN;
const dbAccess = process.env.DB_SECRET;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = `mongodb+srv://${dbAdmin}:${dbAccess}@cluster0.dmwxvyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const manageUsers = client.db("manageUsers").collection("allUsers");

    // all api
    app.get("/users", async (req, res) => {
      const cursor = await manageUsers.find();
      const allUsers = await cursor.toArray();
      res.send(allUsers);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = await manageUsers.findOne(filter);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const result = await manageUsers.insertOne(user);
      res.send(result);
      console.log(user);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
          gender: user.gender,
          status: user.status,
        },
      };

      const result = await manageUsers.updateOne(filter, updatedUser, options);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await manageUsers.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Server!!!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
