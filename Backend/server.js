
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const db = require('./database/database');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordstrategy')
// Create Express App
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Routes
const authRoute = require("./routes/auth")
app.get('/' , (req , res) => {
    res.json(req.user)
})
const dashboardRoute = require('./routes/dashboard')


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use(session({
    secret : 'some sectet',
    cookie : {
        maxAge : 86400*2
    },
    saveUninitialized : false,
    name : "Discord.oAuth2"
}))
app.use('/auth' , authRoute);
app.use('/dashboard' , dashboardRoute);


app.listen(port, () => {
    console.log(`Server is up , port :${port}`)
});

