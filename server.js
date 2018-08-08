const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');
const localStrategy = require('passport-local');
const exphbs = require('express-handlebars');
const gallery = require('./routes/gallery');

//-- SET UP  --//
const PORT = process.env.PORT || 8060;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
//hbs
app.engine('.hbs', exphbs({
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

const User = require('./db/models/User');

// Passport stuff
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done( null, {
    id: user.id,
    username: user.username
  })
  .catch((err) => {
    console.log(err);
    return done(err);
  })
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({ id: user.id}).fetch()
  .then(user => {
    user = user.toJSON();
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
    user = user.toJSON();
    console.log(user)
    if(user == null) {
      return done(null, false, {message: 'bad username or password'});
    } 
    else {
      console.log(password, user.password);
      if(password === user.password) { return done(null, user); }
      else {
        return done(null, false, {message: 'bad username or password'});
      }
    }
  })
  .catch( err => {
    console.log('error: ', err);
    return done(err);
  })
})



























//-----------------------------------//
app.get('/', (req, res) => {
  res.send('smoke test!');
});

app.use('/gallery', gallery);


app.get('*', (req, res) => {
  res.status(404).render('404', {'message': 'Page not found!'});
})

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke on the server side');
})

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
})