// imports
const express = require('express');
const path = require('path');
require("dotenv/config");


// initializations and such
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes and route variables
const routesPath = path.join(__dirname, 'routes');
const indexRouter = require(path.join(routesPath, 'indexRouter.js'));
const userRouter = require(path.join(routesPath, 'userRouter.js'));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
app.use((req, res, next) => {
    res.status(404).send(
        "The planet you're searching for doesn't exist."
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