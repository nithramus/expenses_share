const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const RedisStore = require('connect-redis')(session);
const simpleCrudRouter = require('simple_crud_router')
require('express-async-errors');



const baseRouter = require('./base_app/base_routes');
const app = express();
app.disable('x-powered-by');
// app.use(express.static('./static'));
    
// ############ MIDDLEWARES ########

app.use(bodyParser.json({ extended: true }));
app.use(fileUpload());
app.use(session({
    store: new RedisStore(),
    secret: process.env.COOKIESECRET,
    saveUninitialized: false
}));


// app.use(usersMiddleware.isLogged);
app.use('/', baseRouter);
// app.routes
app.use(async(err, req, res, next) => {
    console.error(err.stack);
    console.error(err.message);
    await res.status(500).send({ status: 500, message: err.message });
    });
app.use('*', async(req, res, next) => {
    console.log("404", req.route, req.params);
    await res.status(404).send({ status: 404, message: "Undefined road" });
});

  

module.exports = app;