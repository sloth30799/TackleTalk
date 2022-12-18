// variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const methodOverride = require('method-override')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/post')
const communityRoutes = require('./routes/community')

// set up env file
require('dotenv').config( { path: "./config/.env" } )

// passport
require('./config/passport')(passport)

// connect to database
connectDB()

// use ejs for views
app.set("view engine", "ejs")

// use public folder
app.use(express.static('public'))

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// show logs
app.use(logger('dev'))

// session
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
    })
  );

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash message
app.use(flash())

// add put/ delete request
app.use(methodOverride("_method"))

// routes
app.use("/", mainRoutes)
app.use("/post", postRoutes)
app.use("/community", communityRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})