import express from "express";

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

// const port = process.env.PORT || 3005;
const port = process.env.PORT || 3000;


// const port = process.env.PORT || 3005;

// const port =  3001;

//create app
const app = express();

//serve static page into public directory
app.use(express.static("frontend/public"));

app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDatabase() 
{
    try
    {
        await client.connect();
        db = client.db("SoundSync");

        console.log("Connected to MongoDB");
    }
    catch(error)
    {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectDatabase();

app.listen(port, () => {
    console.log(`Listening on port: localhost:${port}`);
});

//functions
//generate user id
async function generateId()
{
    const users = await db.collection("users").find({}).toArray();
    if(users.length === 0)
    {
        return 1;
    }

    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
}

async function existingUser(flag, delimiter)
{
    if(flag === true)
    {
        const existingUser = await db.collection("users").findOne({email: delimiter});
        if(existingUser)
        {
            return true;
        }
        return false;
    }
    else
    {
        const existingUser = await db.collection("users").findOne({id: parseInt(delimiter)});
        if(existingUser)
        {
            return true;
        }

        return false;
    }
}

//endpoints

//users
//get all users
app.get("/api/users", async (req, res) => {
    try
    {
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json({status: "success", users: users});
    }
    catch(error)
    {
        console.error("Error getting users: ", error);
        res.status(500).json({status: "failed", message: "Could not get all users"});
    }
});


//add new user
app.post("/api/users/add-user", async (req, res) => {
    try
    {
        const 
        {
            name,
            surname,
            email,
            password,
            profilePicture,
            bio,
            instagram,
            facebook,
            tiktok,
            twitter,
            playlists,
            following,
            followers
        } = req.body;
        
        // const newUser = req.body;
        // console.log("req body: ", req.body.id);
        
        if(!name || !surname || !email || !password)
        {
            return res.status(400).json({ status: "failed", message: "name, surname, email and password are required" });
        }

        const existingUser = await db.collection("users").findOne({email});

        if(existingUser)
        {
            return res.status(400).json({status: "failed", message: `User with email ${email} already in use`});
        }

        const id = await generateId();

        const newUser = {
            id,
            name,
            surname,
            email,
            password,
            profilePicture: profilePicture || null,
            bio: bio || null,
            instagram: instagram || null,
            facebook: facebook || null,
            tiktok: tiktok || null,
            twitter: twitter || null,
            playlists: playlists || null,
            following: following || null,
            followers: followers || null
        }

        const result = await db.collection("users").insertOne(newUser);

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: newUser 
        });
    }
    catch(error)
    {
        console.error("Error while creating new user: ", error);
        res.status(500).json({status: "failed", message: "Could not create new user"});
    }
});

//delete a user
app.delete("/api/users/delete-user/:id", async (req, res) => {

    const { id } = req.params;

    try
    {
        const exists = await existingUser(false, id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `User with id ${id} does not exist`});
        }

        const result = await db.collection("users").deleteOne({ id : parseInt(id)});

        if(result.deletedCount === 1)
        {
            res.status(200).json({status: "success", message: `User with id ${id} deleted successfully`});
        }
        else
        {
            res.status(500).json({status: "failed", message: `Could not delete user with id ${id}`});
        }
    }
    catch (error)
    {
        console.error("Error when deleting user: ", error);
        res.status(500).json({status: "failed", message: "Could not delete user"});
    }
});

//update user
app.put("/api/users/update-user/:id", async (req, res) => {
    const { id } = req.params;

    const 
    {
        name,
        surname,
        email,
        password,
        profilePicture,
        bio,
        instagram,
        facebook,
        tiktok,
        twitter,
        playlists,
        following,
        followers
    } = req.body;

    try
    {
        const exists = await existingUser(false, id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `User with id ${id} does not exist`});
        }

        let updated = {};

        if(name)
        {
            updated.name = name;
        }
        if(surname)
        {
            updated.surname = surname;
        }
        if(email)
        {
            updated.email = email;
        }
        if(password)
        {
            updated.password = password;
        }
        if(profilePicture)
        {
            updated.profilePicture = profilePicture;
        }
        if(bio)
        {
            updated.bio = bio;
        }
        if(instagram)
        {
            updated.instagram = instagram;
        }
        if(facebook)
        {
            updated.facebook = facebook;
        }
        if(tiktok)
        {
            updated.tiktok = tiktok;
        }
        if(twitter)
        {
            updated.twitter = twitter;
        }
        if(playlists)
        {
            updated.playlists = playlists;
        }
        if(following)
        {
            updated.following = following;
        }        
        if(followers)
        {
            updated.followers = followers;
        }

        await db.collection("users").updateOne({id: parseInt(id)}, {$set: updated});

        res.status(200).json({status: "success", message: "user updated successfully"});
    }
    catch(error)
    {
        console.error("Error when updating user ", error);
        res.status(500).json({status: "failed", message: "Could not update user"});
    }
});

//get user by id
app.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    try
    {
        const exists = await existingUser(false, id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `User with is ${id} does not exist`});
        }

        const user = await db.collection("users").findOne({ id: parseInt(id) });

        res.status(200).json({status: "success", user: user});
    }
    catch(error)
    {
        console.error("Error when getting user by id", error);
        res.status(500).json({status: "failed", message: "Could not get user by id"});
    }
});

//login
app.post("/api/users/login", async (req, res) => {

    const { email, password } = req.body;
    try
    {
        if(!email || !password)
        {
            return res.status(400).json({status: "failed", message: "email or password missing"});
        }

        const user = await db.collection("users").findOne({email});

        if(!user)
        {
            return res.status(401).json({status: "failed", message: "email incorrect"});
        }

        if(password !== user.password)
        {
            return res.status(401).json({status: "failed", message: "password incorrect"});
        }

        res.status(200).json({status: "success", message: "login successful", user: {id: user.id, name: user.name, email: user.email}});
    }
    catch(error)
    {
        console.error("Error when login ", error);
        res.status(500).json({status: "failed", message: "could not login"});
    }
});

//





//docker build -t image .

//docker run --name express -p 3005:3000 image