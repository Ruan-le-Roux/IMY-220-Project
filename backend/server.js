import express from "express";
import multer from "multer";
// import path from 'path';

import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';


dotenv.config();

// const port = process.env.PORT || 3005;
const port = process.env.PORT || 3000;


// const port = process.env.PORT || 3005;

// const port =  3001;

//create app
const app = express();

//serve static page into public directory


app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend', 'public')));


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
    console.log(`Listening on port: https://localhost:${port}/`);
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

async function generatePlaylistId()
{
    const playlists = await db.collection("playlists").find({}).toArray();
    if(playlists.length === 0)
    {
        return 1;
    }

    const maxId = Math.max(...playlists.map(playlist => playlist.id));
    return maxId + 1;
}

async function generateCommentId(id)
{
    const playlist = await db.collection("playlists").findOne({id: parseInt(id)});

    let count = playlist.comments ? playlist.comments.length : 0;
    if(count === 0)
    {
        return 1;
    }
    else
    {
        let existingCommentIds = playlist.comments.map(comment => comment.id);
        let maxId = Math.max(...existingCommentIds);
        maxId ++;
        return maxId;
    }
}

async function generateSongId()
{
    const songs = await db.collection("songs").find({}).toArray();
    if(songs.length === 0)
    {
        return 1;
    }

    const maxId = Math.max(...songs.map(song => song.id));
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

async function existingPlaylist(id)
{    
    const existingPlaylist = await db.collection("playlists").findOne({id: parseInt(id)});

    if(existingPlaylist)
    {
        // console.log("aspodufhbepirufh, ", id);
        return true;
    }
    return false;
}

async function existingSong(id)
{    
    const existingSong = await db.collection("songs").findOne({id: parseInt(id)});

    if(existingSong)
    {
        // console.log("aspodufhbepirufh, ", id);
        return true;
    }
    return false;
}

async function songInPlaylist(song, playlist)
{    
    const exists = await db.collection("playlists").findOne({id: parseInt(playlist), songId: parseInt(song)});
    // console.log("here: ", exists);

    if(exists)
    {
        // console.log("aspodufhbepirufh");
        return true;
    }
    return false;
}

async function existingComment(comment, playlist)
{    
    const exists = await db.collection("playlists").findOne(
        {id: parseInt(playlist)}, 
        {projection: {comments: {$elemMatch: {id: parseInt(comment)}}}});
    // console.log("here: ", exists);

    if(exists)
    {
        // console.log("aspodufhbepirufh");
        return true;
    }
    return false;
}

function getDate()
{
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

//store images on the server
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/public/assets/images'));
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: File type not supported!'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

//endpoints

//users
//get all users
app.get("/api/users", async (req, res) => {
    try
    {
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json({status: "success", data: users});
    }
    catch(error)
    {
        console.error("Error getting users: ", error);
        res.status(500).json({status: "failed", message: "Could not get all users"});
    }
});


//add new user
app.post("/api/users/add-user", upload.single('profilePicture'), async (req, res) => {
    try
    {
        const 
        {
            name,
            surname,
            email,
            password,
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
            profilePicture: req.file ? req.file.path : 'http://localhost:3000/assets/images/profile-pic.png',
            bio: '',
            instagram: '',
            facebook: '',
            tiktok: '',
            twitter: '',
            active: true,
            playlists: [],
            following: [],
            followers: []
        }

        const result = await db.collection("users").insertOne(newUser);

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: newUser 
        });
    }
    catch(error)
    {
        console.error("Error while creating new user: ", error);
        res.status(500).json({status: "failed", message: "Could not create new user"});
    }
});
// app.post("/api/users/add-user", async (req, res) => {
//     try
//     {
//         const 
//         {
//             name,
//             surname,
//             email,
//             password,
//             profilePicture,
//             bio,
//             instagram,
//             facebook,
//             tiktok,
//             twitter,
//             playlists,
//             following,
//             followers
//         } = req.body;
        
//         // const newUser = req.body;
//         // console.log("req body: ", req.body.id);
        
//         if(!name || !surname || !email || !password)
//         {
//             return res.status(400).json({ status: "failed", message: "name, surname, email and password are required" });
//         }

//         const existingUser = await db.collection("users").findOne({email});

//         if(existingUser)
//         {
//             return res.status(400).json({status: "failed", message: `User with email ${email} already in use`});
//         }

//         const id = await generateId();

//         const newUser = {
//             id,
//             name,
//             surname,
//             email,
//             password,
//             profilePicture: profilePicture || null,
//             bio: bio || null,
//             instagram: instagram || null,
//             facebook: facebook || null,
//             tiktok: tiktok || null,
//             twitter: twitter || null,
//             playlists: playlists || null,
//             following: following || null,
//             followers: followers || null
//         }

//         const result = await db.collection("users").insertOne(newUser);

//         res.status(201).json({
//             status: "success",
//             message: "User created successfully",
//             data: newUser 
//         });
//     }
//     catch(error)
//     {
//         console.error("Error while creating new user: ", error);
//         res.status(500).json({status: "failed", message: "Could not create new user"});
//     }
// });

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
app.put("/api/users/update-user/:id", upload.single('profilePicture'), async (req, res) => {
    const { id } = req.params;

    // if(!req.file)
    // {
    //     // console.log("s;oikdujrfoighbiouedsrhgfiusdehfgiusdhfu9hseiulghsiduhgiwsret");
    //     return res.status(400).json({ status: "failed", message: "No file uploaded" });
    // }

    // console.log('Request Body:', req.body);
    // console.log('Uploaded File:', req.file);

    const 
    {
        name,
        surname,
        email,
        password,
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
        if(req.file)
        {
            updated.profilePicture = `${req.protocol}://${req.get('host')}/assets/images/${req.file.filename}`;
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

        res.status(200).json({status: "success", data: user});
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

        await db.collection('users').updateOne(
            {email},
            {$set: { active: true}}
        );



        res.status(200).json({status: "success", message: "login successful", data: {id: user.id, name: user.name, email: user.email}});
    }
    catch(error)
    {
        console.error("Error when login ", error);
        res.status(500).json({status: "failed", message: "could not login"});
    }
});


//logo out
app.post("/api/users/logout/:id", async (req, res) => {

    const { id } = req.params;
    try
    {
        const user = await existingUser(false, id);

        if(user === false)
        {
            return res.status(404).json({status: "failed", message: "User could not be found"});
        }

        const ret = await db.collection('users').updateOne(
            {id: parseInt(id)},
            {$set: { active: false}}
        );

        if(ret.modifiedCount === 0)
        {
            res.status(400).json({status: "failed", message: "could not logout user"});
        }
        res.status(200).json({status: "success", message: "logout successful"});
    }
    catch(error)
    {
        console.error("Error when logout ", error);
        res.status(500).json({status: "failed", message: "could not logout"});
    }
});


//add follower
app.put("/api/users/add-follower/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const {followerId} = req.body;

        const userExists = await existingUser(false, id);
        const followerExists = await existingUser(false, followerId);

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: "User does not exist"});
        }

        if(followerExists === false)
        {
            return res.status(404).json({status: "failed", message: "Follower does not exist"});
        }

        // console.log("id: ", id, "fol: ", followerId);

        const user = await db.collection("users").findOne({id: parseInt(id), followers: parseInt(followerId)});
        const follower = await db.collection("users").findOne({id: parseInt(followerId), following: parseInt(id)});

        if(user)
        {
            return res.status(400).json({status: "failed", message: "Already follows user"});
        }

        if(follower)
        {
            return res.status(400).json({status: "failed", message: "Already follows user"});
        }


        const updatedUser = await db.collection("users").updateOne(
            {id: parseInt(id)}, 
            {$push: {followers: parseInt(followerId)}}
        );

        const followingUser = await db.collection("users").updateOne(
            {id: parseInt(followerId)}, 
            {$push: {following: parseInt(id)}}
        );

        return res.status(200).json({status: "success", message: "Followed user"});
    }
    catch(error)
    {
        console.error("Error following user: ", error);
        return res.status(500).json({status: "failed", message: "Could not follow user"});
    }
});

//unfollow
app.put("/api/users/unfollow/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const {followingId} = req.body;

        const userExists = await existingUser(false, id);
        const followingExists = await existingUser(false, followingId);

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: "User does not exist"});
        }

        if(followingExists === false)
        {
            return res.status(404).json({status: "failed", message: "Following does not exist"});
        }

        const user = await db.collection("users").findOne({id: parseInt(id), followers: parseInt(followingId)});
        const following = await db.collection("users").findOne({id: parseInt(followingId), following: parseInt(id)});

        if(!user)
        {
            return res.status(400).json({status: "failed", message: "Not a following of user"});
        }

        if(!following)
        {
            return res.status(400).json({status: "failed", message: "Not following user"});
        }

        const updatedUser = await db.collection("users").updateOne(
            {id: parseInt(id)}, 
            {$pull: {followers: parseInt(followingId)}}
        );

        const followingUser = await db.collection("users").updateOne(
            {id: parseInt(followingId)}, 
            {$pull: {following: parseInt(id)}}
        );

        return res.status(200).json({status: "success", message: "unfollowed user"});
    }
    catch(error)
    {
        console.error("Error unfollowing user: ", error);
        return res.status(500).json({status: "failed", message: "Could not unfollow user"});
    }
});

//get following
app.get("/api/users/get-following/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const userExists = await existingUser(false, id);

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: "Could not find user"});
        }

        const user = await db.collection('users').findOne({id: parseInt(id)});

        if(user.following.length === 0)
        {
            return res.status(404).json({status: "failed", message: "User has no following"});
        }

        return res.status(200).json({status: "success", data: user.following});
    }
    catch(error)
    {
        console.error("Error when getting following: ", error);
        return res.status(500).json({status: "failed", message: "Could not get following"});
    }
});


//get followers
app.get("/api/users/get-followers/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const userExists = await existingUser(false, id);

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: "Could not find user"});
        }

        const user = await db.collection('users').findOne({id: parseInt(id)});

        if(user.followers.length === 0)
        {
            return res.status(404).json({status: "failed", message: "User has no followers"});
        }

        return res.status(200).json({status: "success", data: user.followers});
    }
    catch(error)
    {
        console.error("Error when getting followers: ", error);
        return res.status(500).json({status: "failed", message: "Could not get followers"});
    }
});


//playlists
//create playlists

app.post("/api/playlist/create-playlist", upload.single('coverImage'), async (req, res) => {
    try
    {
        const { userId, name, category, description, hashTags, songId, comments } = req.body;

        // console.log("userId: ", userId, "name: ", name);
        // console.log("req body: ", req.body);

        if(!userId || !category)
        {
            return res.status(400).json({status: "Failed", message: "userId and category are required"});
        }

        const existingUser = await db.collection("users").findOne({id: parseInt(userId)});

        if(!existingUser)
        {
            return res.status(404).json({status: "failed", message: `No user with id ${userId} found`});
        }

        const id = await generatePlaylistId();
        const date = getDate();
        const userId2 = parseInt(userId);

        const newPlaylist = {
            id,
            "userId": userId2,
            name: name || `playlist ${id}`,
            category: category || '',
            description: description || '',
            coverImage: req.file ? `http://localhost:3000/assets/images/${req.file.filename}` : 'http://localhost:3000/assets/images/album-cover.png',
            hashTags: hashTags || '',
            songId: songId || [],
            comments: comments || [],
            createdAt: date,
            updatedAt: date,
        };

        // console.log("newPlaylist: ", newPlaylist)

        const result = await db.collection("playlists").insertOne(newPlaylist);

        const updateUsers = await db.collection("users").updateOne(
            { id: parseInt(userId) },
            {$push: {playlists: id}}
        );

        if(result.acknowledged && updateUsers.modifiedCount === 1)
        {
            return res.status(201).json({status: "success", message: "Playlist created and added to users playlists", data: newPlaylist});
        }
        else
        {
            return res.status(500).json({status: "failed", message: "Playlist created but could not add playlist to users playlists"});
        }

        // res.status(201).json({status: "success", message: "Playlist created successfully", playlist: newPlaylist});
    }
    catch(error)
    {
        console.error("Error while creating playlist: ", error);
        return res.status(500).json({status: "failed", message: "Could not create playlist"});
    }
});

//get all playlists
app.get("/api/playlists", async (req, res) => {
    try
    {
        const playlists = await db.collection("playlists").find({}).toArray();
        res.status(200).json({status: "success", message: "all playlists", data: playlists});
    }
    catch(error)
    {
        console.error("Error getting all playlists: ", error);
        res.status(500).json({status: "failed", message: "Could not get all playlists"});
    }
});

//update playlist
app.put("/api/playlists/update-playlist/:id", upload.single('coverImage'), async (req, res) => {
    const {id} = req.params;
    const 
    {
        userId,
        name,
        category,
        description,
        hashTags,
    } = req.body;
    
    try
    {
        const exists = await existingPlaylist(id);
        const userExists = await existingUser(false, userId);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `Could not find playlist with id ${id}`});
        }

        if(userExists === false)
        {
            // console.log("asdpoifsdugbserfiguhb");
            return res.status(404).json({status: "failed", message: `User does not exist`});
        }


        let updated = {};

        if(name)
        {
            updated.name = name;
        }
        if(category)
        {
            updated.category = category;
        }
        if(description)
        {
            updated.description = description;
        }
        if(req.file)
        {
            updated.coverImage = `http://localhost:3000/assets/images/${req.file.filename}`;
        }
        if(hashTags)
        {
            updated.hashTags = hashTags;
        }

        updated.updatedAt = getDate();

        const playlist = await db.collection("playlists").findOne({id: parseInt(id)});

        if(playlist.userId != userId)
        {
            return res.status(401).json({status: "failed", message: "Only owner can edit playlist"});
        }

        await db.collection("playlists").updateOne({id: parseInt(id)}, {$set: updated});

        res.status(200).json({status: "success", message: "Playlist updated"});
    }
    catch(error)
    {
        console.error("Error when updating playlist: ", error);
        res.status(500).json({status: "failed", message: "Could not update playlist"});
    }
});

//delete playlist
app.delete("/api/playlists/delete-playlist/:id/:userId", async (req, res) => {
    const {id, userId} = req.params;

    // const {userId} = req.body;

    try
    {
        // console.log("user: ", userId);
        const exists = await existingPlaylist(id);
        const userExists = await existingUser(false, parseInt(userId));

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `Playlist with id ${id} does not exist`});
        }

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: `User does not exist`});
        }

        const playlist = await db.collection("playlists").findOne({id: parseInt(id)});

        if(playlist.userId !== parseInt(userId))
        {
            return res.status(401).json({status: "failed", message: "Only owner can delete playlist"});
        }

        const result = await db.collection("playlists").deleteOne({id: parseInt(id)});

        if(result.deletedCount === 1)
        {
            await db.collection("users").updateMany({}, {$pull: {playlists: parseInt(id)}});

            return res.status(200).json({status: "success", message: `Playlist with id ${id} delete`});
        }
        else
        {
            return res.status(500).json({status: "failed", message: `Could not delete playlist with id ${id}`});
        }
    }
    catch(error)
    {
        console.error("Error when deleting playlist: ", error);
        return res.status(500).json({status: "failed", message: "Could not delete playlist"});
    }
});

//get playlist by id
app.get("/api/playlists/:id", async (req, res) => {
    const {id} = req.params;
    
    try
    {
        const exists = await existingPlaylist(id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: `Could not find playlist with id ${id}`});
        }

        const playlist = await db.collection("playlists").findOne({id: parseInt(id)});

        return res.status(200).json({status: "success", data: playlist});
    }
    catch(error)
    {
        console.error("Error when getting playlist with id: ", error);
        return res.status(500).json({status: "failed", message: "Could not get playlist by id"});
    }    
});

//add song to playlist
app.put("/api/playlists/add-song/:id/:userId", async (req, res) => {
    const { id, userId } = req.params;
    const { songId } = req.body; 

    try 
    {
        const playlistExists = await existingPlaylist(id);
        if (!playlistExists) {
            return res.status(404).json({ status: "failed", message: `Playlist with id ${id} does not exist` });
        }

        const userExists = await existingUser(false, userId);
        if (!userExists) {
            return res.status(404).json({ status: "failed", message: `User does not exist` });
        }

        const songExistsResults = await Promise.all(songId.map(song => existingSong(song)));
        const allSongsExist = songExistsResults.every(Boolean); 

        if (!allSongsExist) {
            return res.status(404).json({ status: "failed", message: `One or more songs do not exist` });
        }

        const existingSongs = await Promise.all(songId.map(song => songInPlaylist(song, id)));
        const anySongExistsInPlaylist = existingSongs.some(Boolean); 

        if (anySongExistsInPlaylist) {
            return res.status(409).json({ status: "failed", message: "One or more songs are already in the playlist" });
        }

        for (const song of songId) {
            const songDetails = await db.collection("songs").findOne({ id: parseInt(song), deleted: false });

            if (!songDetails) {
                return res.status(400).json({ status: "failed", message: "Song no longer exists, cannot add it" });
            }

            const playlist = await db.collection("playlists").findOne({ id: parseInt(id) });

            if (parseInt(playlist.userId) !== parseInt(userId)) {
                return res.status(401).json({ status: "failed", message: "Only the owner can add songs to the playlist"});
            }

            const result = await db.collection("playlists").updateOne(
                { id: parseInt(id) },
                {
                    $push: { songId: parseInt(song) },
                    $set: { updatedAt: getDate() },
                }
            );

            if (result.modifiedCount !== 1) {
                return res.status(500).json({ status: "failed", message: "Could not add song to playlist" });
            }
        }

        return res.status(200).json({ status: "success", message: "Added songs to playlist" });
    } catch (error) {
        console.error("Error when adding song to playlist: ", error);
        return res.status(500).json({ status: "failed", message: "Could not add song to playlist" });
    }
});


//delete song from playlist
app.put("/api/playlists/delete-song/:id", async (req, res) => {

    const {id} = req.params;

    const { songId, userId } = req.body;

    try
    {
        const playlistExists = await existingPlaylist(id);
        const songExists = await existingSong(songId);
        const userExists = await existingUser(false, userId);

        if(songExists === false)
        {
            return res.status(404).json({status: "failed", message: `Song with id ${songId} does not exist`});
        }

        if(playlistExists === false)
        {
            return res.status(404).json({status: "failed", message: `Playlist with id ${id} does not exist`});
        }

        if(userExists === false)
        {
            return res.status(404).json({status: "failed", message: `User does not exist`});
        }

        const exists = await songInPlaylist(songId, id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "Song not in playlist"});
        }

        const playlist = await db.collection("playlists").findOne({id: parseInt(id)});

        if(playlist.userId !== userId)
        {
            return res.status(401).json({status: "failed", message: "Only the owner can delete songs form playlist"});
        }

        


        const result = await db.collection("playlists").updateOne(
            {id: parseInt(id)},
            {
                $pull: {songId: parseInt(songId)},
                $set: {updatedAt: getDate()},
            } 
        );


        if(result.modifiedCount === 1)
        {
            return res.status(200).json({status: "success", message: "removed song from playlist"});
        }
        else 
        {
            return res.status(404).json({ status: "failed", message: "Song not found in the playlist" });
        }
    }
    catch(error)
    {
        console.error("Error when removing song from playlist: ", error);
        return res.status(500).json({status: "failed", message: "Could not remove song from playlist"});
    }
});

//add comment to a playlist
app.put("/api/playlists/add-comment/:id/:userId", upload.single('image'), async (req, res) => {
    const {id, userId} = req.params;

    const {text} = req.body;

    try
    {
        const exists = await existingPlaylist(id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "Playlist does not exists"});
        }

        const commentId = await generateCommentId(id);

        const imageUrl = req.file ? `http://localhost:3000/assets/images/${req.file.filename}` : `no`;

        const intId = parseInt(userId);

        const newComment = 
        {
            id: commentId,
            userId: intId,
            text,
            image: imageUrl,
            timestamp: new Date(),
        };

        const result = await db.collection("playlists").updateOne(
            {id: parseInt(id)},
            { $push: {comments: newComment}}
        );

        if(result.modifiedCount === 1)
        {
            return res.status(201).json({status: "success", message: "Comment added"});
        }
        else
        {
            return res.status(500).json({status: "failed", message: "Could not add comment"});
        }
    }
    catch(error)
    {
        console.error("Error when adding comment: ", error);
        return res.status(500).json({status: "failed", message: "Could not add comment"});
    }
});

//delete comment
app.put("/api/playlists/delete-comment/:id", async (req, res) => {
    const {id} = req.params;

    const {commentId, userId} = req.body;

    // console.log("user: ", userId);

    try
    {
        const exists = await existingPlaylist(id);
        const commentExists = await existingComment(commentId, id);
        const userExist = await existingUser(false, userId);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "Playlist does not exist"});
        }
        if(commentExists === false)
        {
            return res.status(404).json({status: "failed", message: "Comment does not exist"});
        }
        if(userExist === false)
        {
            return res.status(404).json({status: "failed", message: "User does not exist"});
        }

        const playlist = await db.collection("playlists").findOne(
            {id: parseInt(id)},
            {projection: {comments: {$elemMatch: {id: parseInt(commentId)}}}}
        );

        // console.log("comment: ", comment);

        const comment = playlist.comments[0];

        if(!comment)
        {
            return res.status(404).json({status: "failed", message: "Comment does not exist"});

        }

        if(comment.userId !== userId)
        {
            return res.status(401).json({status: "failed", message: "Only owner of comment can delete comment"});
        }

        const result = await db.collection("playlists").updateOne(
            {id: parseInt(id)}, 
            {$pull: {comments: {id: parseInt(commentId)}}}
        );

        if(result.modifiedCount === 1)
        {
            return res.status(200).json({status: "success", message: "Deleted comment"});
        }
        else
        {
            return res.status(500).json({status: "failed", message: "Could not delete comment"});
        }
    }
    catch(error)
    {
        console.error("Error when deleting comment: ", error);
        return res.status(500).json({status: "failed", message: "Could not delete comment"});
    }
});

//get all comments
app.get("/api/playlists/comments/:id", async (req, res) => {

    const {id} = req.params;

    try
    {
        const exists = await existingPlaylist(id);
        
        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "Could not find playlist"});
        }

        const playlist = await db.collection("playlists").findOne({id : parseInt(id)});

       if (!playlist || !Array.isArray(playlist.comments) || playlist.comments.length === 0) 
        {
            return res.status(404).json({ status: "failed", message: "There are no comments on this playlist" });
        }

        return res.status(200).json({status: "success", data: playlist.comments});
    }
    catch(error)
    {
        console.error("Error when getting comments: ", error);
        return res.status(500).json({status: "failed", message: "Could not get comments"});
    }
});

//get all my playlists
app.get("/api/playlists/my-playlists/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const userExist = await existingUser(false, id);
        // const existingUser = await existingUser(false, id); 
        // const playlistExists = await existingPlaylist(id)

        if(userExist === false)
        {
            return res.status(404).json({status: "failed", message: "User does not exist"});
        }
        
        
        // console.log("id: ", id);
        const playlists = await db.collection("playlists").find({userId: parseInt(id)}).toArray();
        // const playlists = await db.collection("playlists").find({userId: id});
        
        if(playlists.length === 0)
        {
            // console.log("osiaduhbfseioudfbiufgrbh");
            return res.status(404).json({status: "failed", message: "No playlists found"});
        }
        // console.log("osiaduhbfseioudfbiufgrbh");
        return res.status(200).json({status: "success", data: playlists});
    }
    catch(error)
    {
        console.error('Error getting all my playlists: ', error);
        return res.status(500).json({status: "failed", message: "Could not get all my playlists"});
    }
});

//get active friends playlists
app.get("/api/playlists/active-playlists/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const userExist = await existingUser(false, id);
        // const existingUser = await existingUser(false, id); 
        // const playlistExists = await existingPlaylist(id)

        if(userExist === false)
        {
            return res.status(404).json({status: "failed", message: "User does not exist"});
        }
        
        
        // console.log("id: ", id);
        // const playlists = await db.collection("playlists").find({userId: id});
        const user = await db.collection('users').findOne({id: parseInt(id) });

        // console.log("sjhgdvf: ", user);
        
        if(user && user.following && user.following.length > 0)
        {
            const friends = await db.collection('users').find({id: {$in: user.following }}).toArray();
            // console.log(`friends: ${friends}`);
            // console.log(`friends: ${JSON.stringify(friends, null, 2)}`);
            
            
            const playlists = await Promise.all(
                friends.flatMap( async (friend) => {
                    const temp = await db.collection("playlists").find({ id: { $in: friend.playlists}}).sort({updatedAt: 1}).toArray();
    
                    return temp.map((playlist) => ({
                        owner: `${friend.name} ${friend.surname}`,
                        ...playlist,
                    }));
                })                
            );

            const build = playlists.flat();

            if(build.length === 0)
            {
                return res.status(404).json({status: "failed", message: "Friends do not have any playlists"});
            }

            // const allPlaylists = await db.collection("playlists").find({ id: { $in: playlists}}).toArray();

            // const build = allPlaylists.map((temp) => {


            // });

            // console.log(allPlaylists);

            return res.status(200).json({status: "success", data: build});
        }
        else if(user.following.length === 0)
        {
            return res.status(404).json({status: "failed", message: "User does not follow anyone"});
        }

        return res.status(500).json({status: "failed", message: "Could not find users following", data: `user: ${user}, following: ${user.following}, length: ${user.following.length}`});
    }
    catch(error)
    {
        console.error('Error getting all friends playlists: ', error);
        return res.status(500).json({status: "failed", message: "Could not get users following playlists"});
    }
});

//get songs in playlist
app.get("/api/playlists/get-songs/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const playlistExists = await existingPlaylist(id);

        if(playlistExists === false)
        {
            return res.status(404).json({status: "failed", message: "Playlist does not exist"});
        }

        const playlist = await db.collection('playlists').findOne({id: parseInt(id)});

        if(playlist.songId.length > 0)
        {
            // let songs = [];
            const songs = await Promise.all(
                playlist.songId.map(async (song) => {
                    // console.log(`song: ${song}`);
                    return await db.collection('songs').findOne({id: parseInt(song)});
                })
            ); 

            // console.log(`songs: ${songs}`);

            return res.status(200).json({status: "success", data: songs});
        }

        return res.status(404).json({status: "failed", message: "Playlist has no songs"});
    }
    catch(error)
    {
        console.error("Error getting all songs in a playlist: ", error);
        res.status(500).json({status: "failed", message: "Could not get all songs in a playlist"});
    }
});

//is owner of playlist
app.get('/api/playlists/is-owner/:playlistId/:userId', async (req,res) => {
    const { playlistId, userId } = req.params;

    try
    {
        // const existingPlaylist = await existingPlaylist(playlistId);
        const playlist = await db.collection('playlists').findOne({ id: parseInt(playlistId) });
        
        const userExists = await db.collection('users').findOne({ id: parseInt(userId) });

        
        if(!userExists)
        {
            return res.status(404).json({status: "failed", message: "Could not find user"});
        }

        if(!playlist)
        {
            return res.status(404).json({status: "failed", message: "Could not find playlist"});
        }

        // const playlist = await db.collection('playlists').findOne({id: parseInt(playlistId)});
        // console.log("playlist: ", playlist.userId, "user: ", userId);
        
        if(playlist.userId == userId)
        {
            return res.status(200).json({status: "success", message: "The user is the owner of the playlist"});
        }

        return res.status(401).json({status: "failed", message: "User is not the owner of the playlist"}); 
    }
    catch(error)
    {
        console.error("Error while checking if user is owner of playlist", error);
        return res.status(500).json({status: "failed", message: "Could not check if user is the owner of the playlist"});
    }
});

//songs
//add a song
app.post("/api/songs/add-song", async (req, res) => {
    try
    {
        const { title, artist, link, userId } = req.body;

        if(!userId)
        {
            return res.status(400).json({status: "failed", message: "userId is required"});
        }

        if(!title || !artist || !link)
        {
            return res.status(404).json({status: "failed", message: "Song title, artist name and link to song is required"});
        }
        
        const exists = await existingUser(false, userId);
        
        if(exists === false)
        {
            return res.status(400).json({status: "failed", message: "User could not be found"});
        }

        const id = await generateSongId();
        const timestamp = getDate();

        const spotifyPattern = /https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
        const match = link.match(spotifyPattern);
        
        if (!match) 
        {
            return res.status(400).json({ status: "failed", message: "Invalid Spotify URL" });
        }

        const trackId = match[1];

        const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

        const newSong = 
        {
            id,
            title,
            artist,
            embedUrl,
            timestamp,
            deleted: false,
            ownerId: userId
        };

        const result = await db.collection("songs").insertOne(newSong);

        return res.status(201).json({status: "success", message: "New song added", data: id});
    }
    catch(error)
    {
        console.error("Error when adding new song: ", error);
        return res.status(500).json({status: "failed", message: "Could not add new song"});
    }
});

//delete a song
app.put("/api/songs/delete-song/:id", async (req, res) => {
    const {id} = req.params;

    try
    {
        const 
        {
            userId
        } = req.body;

        const exists = await existingUser(false, userId);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "user could not be found"});
        }

        const song = await db.collection("songs").findOne({id: parseInt(id)});

        if(!song)
        {
            return res.status(404).json({status: "failed", message: "Song could not be found"});
        }

        if(song.ownerId !== userId)
        {
            return res.status(401).json({status: "failed", message: "You are not the owner of this song you can not delete it"});
        }

        const result = await db.collection("songs").updateOne({id: parseInt(id)}, {$set: {deleted: true}});

        if(result.modifiedCount === 1)
        {
            return res.status(200).json({status: "success", message: "Deleted song"});
        }
        else
        {
            return res.status(500).json({status: "failed", message: "Could not delete song"});
        }

    }
    catch(error)
    {
        console.error("Error while deleting song: ", error);
        return res.status(500).json({status: "failed", message: "Could not delete song"});
    }
});

//get all songs
app.get("/api/songs", async (req, res) => {
    try
    {
        const songs = await db.collection("songs").find({}).toArray();
        return res.status(200).json({status: "success", data: songs});
    }
    catch(error)
    {
        console.error("Error getting all songs: ", error);
        return res.status(500).json({status: "failed", message: "Could not get all songs"});
    }
});

//get song by id
app.get("/api/songs/:id", async (req, res) => {
    const {id} = req.params;
    try
    {
        const exists = await existingSong(id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "Song could not be found"});
        }

        const song = await db.collection("songs").findOne({id: id});

        return res.status(200).json({status: 'success', data: song});
    }
    catch(error)
    {
        console.error("Error getting song buy id: ", error);
        return res,status(500).json({status: "failed", message: "Could not find song by id"});
    }    
});

//get all my songs
app.get("/api/songs/my-songs/:id", async (req, res) => {
    const {id} = req.params;
    try
    {
        const exists = await existingUser(false, id);

        if(exists === false)
        {
            return res.status(404).json({status: "failed", message: "User could not be found"});
        }

        const songs = await db.collection("songs").find({ownerId: parseInt(id)}).toArray();

        if(songs.length === 0)
        {
            return res.status(404).json({status: "failed", message: "No songs found"});
        }

        return res.status(200).json({status: 'success', data: songs});
    }
    catch(error)
    {
        console.error("Error getting song buy id: ", error);
        return res.status(500).json({status: "failed", message: "Could not find song by id"});
    }    
});

app.use(express.static("frontend/public"));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.resolve('frontend/public/index.html'));
});










//docker build -t image .

//docker run --name express -p 3005:3000 image