var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const db = require('./models/index')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');

var app = express();

//** WELCOME MSG */
console.log('Démarrage API...')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Sync db

console.log('Tentative de synchonisation avec la base de données...')
db.sequelize.sync({force: true}).then(
    res => {
        console.log('DB is SYNC AND READY!')
    }
)

module.exports = app;
