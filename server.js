const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const gallery = require('./routes/gallery');

const PORT = process.env.PORT || 8060;
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('smoke test!');
});

app.use('/gallery', gallery);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
})