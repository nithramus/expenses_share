const express = require('express');
const app = express();

app.use(express.static('./doc/static/'));

app.listen('4001');