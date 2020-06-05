const express = require('express');
const port = 3000;
const path = require('path');
const cors = require('cors');
const app = express();
const httpProxy = require('http-proxy');
const Axios = require('axios');

const prox = httpProxy.createProxyServer();

app.use('/:listingId', express.static(path.resolve(__dirname, '../client/public')));

app.get('/everything/:listingId', cors(), (req, res) => {
  let listing = Number(req.params.listingId.slice(1));
  let photoData = Axios.get(`http://54.200.132.22:80/listing/photos/${listing}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  let sideData = Axios.get(`http://54.200.132.22:80/listing/photos/sidebar/${listing}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  let reserveData = Axios.get(`http://18.236.94.193/reservations/${listing}`)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  let restaurantData = Axios.get(`http://54.185.2.221/restaurant/${listing}`)
    .then((result) => {
      return result.data[0];
    })
    .catch((err) => {
      console.log(err);
    });


  Promise.all([photoData, sideData, reserveData, restaurantData])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.all('/listing/*', cors(), (req, res) => {
  prox.web(req, res, {target: 'http://54.200.132.22:80/'});
});

app.all('/restaurants/*', cors(), (req, res) => {
  prox.web(req, res, {target: 'http://54.185.2.221/'});
});

app.all('/restaurant/*', cors(), (req, res) => {
  prox.web(req, res, {target: 'http://54.185.2.221/'});
});

app.all('/reservations/*', cors(), (req, res) => {
  prox.web(req, res, {target: 'http://18.236.94.193'});
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