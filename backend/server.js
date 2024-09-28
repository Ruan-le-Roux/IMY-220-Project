import express from "express";
<<<<<<< HEAD
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

// const port = process.env.PORT || 3005;
const port = process.env.PORT || 3000;
=======

const port = process.env.PORT || 3005;
>>>>>>> c3b177c548132364a39b4a06607525ef25b74eb9
// const port =  3001;

//create app
const app = express();

//serve static page into public directory
app.use(express.static("frontend/public"));

<<<<<<< HEAD
const client = new MongoClient(process.env.MONGO_URI);

async function connectDatabase() 
{
    try
    {
        await client.connect();

        console.log("Connected to MongoDB");
    }
    catch(error)
    {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectDatabase();

=======
>>>>>>> c3b177c548132364a39b4a06607525ef25b74eb9
app.listen(port, () => {
    console.log(`Listening on port: localhost:${port}`);
});

//docker build -t image .

//docker run --name express -p 3005:3000 image