const express = require('express');
const port = 3000;
const path = require('path');
const cors = require('cors');
const app = express();
const httpProxy = require('http-proxy');

const prox = httpProxy.createProxyServer();

app.use('/:listingId', express.static(path.resolve(__dirname, '../client/public')));

app.all('/photos/*', cors(), (req, res) => {
  prox.web(req, res, {target: 'http://localhost:3050/'});
});

/*
app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../client/public') });
  }
});
*/

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports.app = app;

//this is a test