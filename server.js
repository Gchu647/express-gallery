const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8060;
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('smoke test!');
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
})