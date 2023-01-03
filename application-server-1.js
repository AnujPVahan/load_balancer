const express = require('express');
const app = express();

const port  = 3000;

app.listen(port, () => console.log(`Listening to port ${port}.`));

app.get('/', function (req, res) {
  console.log(`Request received on ${port}.`);
  res.send(` Forwared the request on ${port}.`)
});
