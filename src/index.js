
//imports
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');

//library inits
const app = express();
app.use(express.json());
app.use(cors());



let database;
const uri = 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json';

async function getData() {
  await axios.get(uri)
    .then((req) => {
      database = req.data;
    })
    .catch(() => {
      database = undefined;
    });
}
getData();

app.get('/mensa/:day', (req, res) => {
  if(database !== undefined) {
    const dayData = database.filter((essen) => essen.day === req.params.day);
    if (dayData.length !== 0) {
      res.send(dayData);
  } else {
    res.status(404).send('Error: 404');
  }
    } else {
      res.status(404).send('404');
  }
});

app.post('/mensa/:day', (req, res) => {
  const searchData = data.find((essen) => essen.category === req.body.category
    && essen.day === req.body.day);
  if (searchData === undefined) {
    data.push(req.body);
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.post('/postdata', (req, res) => {
  if (!JSON.stringify(data).includes(JSON.stringify(req.body))) {
    database.push(req.body);
    res.status(200).send();
  } else {
    res.status(404).send('404');
  }
});

app.get('/api/getData/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Access');
  res.status(200).send(data);
});

// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});
