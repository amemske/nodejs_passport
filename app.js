const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
 

//Bodyparser
app.use(express.urlencoded({extended: true}));

//Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
 }
));

//Connect flash
app.use(flash())

//Global Vars
app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
    next();

})


//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));