import express from "express";

const port = process.env.PORT || 3005;
// const port =  3001;

//create app
const app = express();

//serve static page into public directory
app.use(express.static("frontend/public"));

app.listen(port, () => {
    console.log(`Listening on port: localhost:${port}`);
});

//docker build -t image .

//docker run --name express -p 3005:3000 image