const axios = require('axios').default;
const express = require('express');

const app = express();
app.use(express.json());

let database;
async function getData() {
  await axios.get('https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json')
    .then((req) => {
      database = req.data;
    })
    .catch(() => {
      database = undefined;
    });
}
getData();

app.get('/mensa/:day', (req, res) => {
  if(database == undefined) {
    res.status(404).send('404');
  } else {
    if (req.params.day === 'Di') {
      res.send(data);
    } else {
      res.status(404).send('404');
    }
  }
});

app.post('/postdata', (req, res) => {
  if (!JSON.stringify(data).includes(JSON.stringify(req.body))) {
    database.push(req.body);
    res.status(200).send();
  } else {
    res.status(404).send('404');
  }
})

// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});
