// this file is the server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');
const localStrategy = require('passport-local');
const exphbs = require('express-handlebars');
const methodOveride = require('method-override');
const bcrypt = require('bcrypt');
const gallery = require('./routes/gallery');
const profile = require('./routes/profile');
const system = require('./routes/system');

//-- SET UPs  --//
const PORT = process.env.PORT || 8060; // PORT setup
app.use(express.static('public')); // sets up the root doler
app.use(bodyParser.urlencoded({ extended: true})); //body parser setup
app.use(methodOveride('_method')); //method override setup

app.engine('.hbs', exphbs({ //hbs setup
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
//sessions setup
app.use(session({
  store: new Redis(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//-- Passport stuff --//
const User = require('./db/models/User');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  //Keep track of author_id being used, set it to null once it is logged out.
  return done( null, {
    id: user.id,
    username: user.username
  })
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({ id: user.id}).fetch()
  .then(user => {
    user = JSON.parse(JSON.stringify(user));
    return done(null, {
      id: user.id,
      username: user.username
    })
  })
  .catch((err) => {
    console.log(err);
    return done(err);
  })
});

passport.use(new localStrategy(function(username, password, done) {
  return new User({username: username}).fetch()
  .then( user => {
    user = JSON.parse(JSON.stringify(user));

    if(user == null) {
      return done(null, false, {message: 'bad username or password'});
    } 
    else {
      bcrypt.compare(password, user.password)
      .then (samePassword =>{
        if(samePassword) { return done(null, user); }
        else {
          return done(null, false, {message: 'bad username or password'});
        }
      })
    }
  })
  .catch( err => {
    console.log('error: ', err);
    return done(err);
  })
}));


//-- ROUTES --//
app.use('/', system); // sends us to loging or register
app.use('/gallery', gallery); // sends us to gallery
app.use('/profile', profile); // sends us to profile


//-- 404 and Errors --//
app.get('*', (req, res) => {
  res.status(404).send({'message': 'Page not found!'});
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke on the server side');
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});