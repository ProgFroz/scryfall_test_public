const express = require('express');
const router = express.Router();

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();
// admin.initializeApp({
//   credential: admin.credential.cert(options),
//   databaseURL: "https://bdotracker-de2af.firebaseio.com"});
// router.get('/', (req, res) => {
//   res.send('posts');
// });

router.post('/scryfall/collection', (req, res) => {
  const identifiers = req.body.identifiers;
  console.log(identifiers);
  
  let url = 'https://api.scryfall.com/cards/collection';
  fetch(url, {
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: {
      "identifiers": identifiers
    }
  })
    .then(res => res.json()).catch((err) => console.log(err))
    .then((out) => {
      res.json(out);
    })
    .catch(err => console.log(err));
});

module.exports = router;
