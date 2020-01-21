const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users")
const tweets = require("./routes/api/tweets")
const passport = require("passport");
const User = require("./models/User");
const bodyParser = require("body-parser");

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())


app.get("/", (req, res) => {
    const user = new User({
        handle: "jim",
        email: "jim@jim.jim",
        password: 'jimisgreat123'
    });
    user.save();
    res.send("hi")
})
app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(passport.initialize());

require('./config/passport')(passport)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
