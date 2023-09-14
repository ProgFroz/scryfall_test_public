const express = require('express');
const router = express.Router();
const User = require('../schema/users');
const Group = require('../schema/groups');
const Shopping = require('../schema/shoppings');
const Finances = require('../schema/finances');

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();

router.get('/', (req, res) => {
  res.send('gets');
});

router.get('/decks/:did', (req, r) => {
  const did = req.params.did;
  let url = 'https://api2.moxfield.com/v2/decks/all/' + did;
  fetch(url)
    .then(res => res.json()).catch((err) => console.log())
    .then((out) => {
      r.json(out);
    })
    .catch(err => console.log());
});

router.get('/scryfall/:cardid', (req, r) => {
  const cardid = req.params.cardid;
  let url = 'https://api.scryfall.com/cards/' + cardid;
  fetch(url)
    .then(res => res.json()).catch((err) => console.log())
    .then((out) => {
      r.json(out);
    })
    .catch(err => console.log());
});

module.exports = router;
