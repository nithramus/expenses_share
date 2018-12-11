const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const RedisStore = require('connect-redis')(session);
const Crud = require('simple_crud_express')
require('express-async-errors');
const knex = require('./utils/knex.utils')

const commentParams = [
    { name: 'content', min: 1, max: 5000, type: 'string', needed: true }
];
const selectComment = [
    'id',
    'content',
    'user_id',
    'expense_id',
    'created_at'
]

function isMaker(req, res, next) {
    next();
}

const commentCrud = new Crud(knex,
    'comment',
    ['expense'],
    commentParams,
    selectComment,
    [ isMaker ],
    [],
    {
        add: function (req, itemsParams) {
            itemsParams['user_id'] = req.session.user.id
            return itemsParams;
        },
        put: function(req, whereParams) {
            whereParams.user_id = req.session.user.id
            return whereParams;
        },
        delete: function(req, whereParams) {
            whereParams.user_id = req.session.user.id
            return whereParams;
        } 
})

const userParams = [
    { name: 'username', min: 1, max: 200, type: 'string', needed: true },
    { name: 'password', min: 1, max: 200, type: 'string', needed: true }
];

const userSelect = ['id', 'username'];

const userCrud = new Crud(knex,
    'user',
    [],
    userParams,
    userSelect,
    [],
    [],
    {
        get: function(req, whereParams) {
            return { id: req.session.user.id };
        },
        put: function(req, whereParams) {
            return { id: req.session.user.id };
        },
        delete: function(req, whereParams) {
            return { id: req.session.user.id };
        }
    }

);

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
app.use('/', commentCrud.router)
app.use('/', userCrud.router)
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