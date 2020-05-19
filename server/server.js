const express = require('express');
const port = 3000;
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../client/public') });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports.app = app;

//this is a test