// imports
const express = require('express');
const path = require('path');
const session = require('express-session');
const { prisma } = require('./lib/prisma');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const passport = require('passport');
require("dotenv/config");
require('./config/passport')(passport);


// initializations and such
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// session
const sessionStore = new PrismaSessionStore(
    prisma,
    {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// routes and route variables
const routesPath = path.join(__dirname, 'routes');
const indexRouter = require(path.join(routesPath, 'indexRouter.js'));
const userRouter = require(path.join(routesPath, 'userRouter.js'));
const signUpRouter = require(path.join(routesPath, 'signUpRouter.js'));
const logInRouter = require(path.join(routesPath, 'logInRouter.js'));
const logOutRouter = require(path.join(routesPath, 'logOutRouter.js'));
const uploadFileRouter = require(path.join(routesPath, 'uploadFileRouter.js'));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.use('/log-out', logOutRouter);
app.use('/upload-file', uploadFileRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.status(404).send(
        `The planet you're searching for doesn't exist: ${req.url}`
    )
})

// start app
const PORT =  process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log(`Running at http://localhost:${PORT}`);
});