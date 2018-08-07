const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const gallery = require('./routes/gallery');

//-- SET UP PORT, BODY-PARSER, & HBS --//
const PORT = process.env.PORT || 8060;
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//-----------------------------------//
app.get('/', (req, res) => {
  res.send('smoke test!');
});

app.use('/gallery', gallery);


app.get('*', (req, res) => {
  res.status(404).render('404', {'message': 'Page not found!'});
})

app.use(function(err, req, res, next) {
  console.err(err.stack);
  res.status(500).send('Something broke on the server side');
})

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
})