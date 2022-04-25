import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log(chalk.bold.green(`Server is good to go`))
});

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const body = req.body;

    const newUser = {
        username: body.username,
        avatar: body.avatar
    }

    users.push(newUser);
    console.log(users);
    res.send("ok");
})

app.post("/tweets", (req,res) => {
    const body = req.body;

    const user = users.find( (user) => user.username === body.username)
    const newTweet = {
        username: body.username,
        avatar: user.avatar,
        tweet: body.tweet
    }

    tweets.push(newTweet);
    res.send("ok")
})

app.get("/tweets", (req,res) => {
    if (tweets.length < 10) {
        let aux = []
        for (let i = tweets.length -1; i >= 0; i--){
            aux.push(tweets[i]);
        }
        res.send(aux)
    } else {
        let aux = []
        for (let i = tweets.length -1; i >= tweets.length -10; i--){
            aux.push(tweets[i]);
        }
        res.send(aux)
    }
})

