const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const route = require('./routes/index');

const PORT = 3001;

const app = express();
app.use(bodyParser.json());

app.use('/hello', (req, res)=> res.send("HELLO, SERVER"));
app.use('/api', route);

//TODO GET 방식 POST 로 바꾸기
app.post('/api/user/check', (req, res) => {

  const encodeCharacter = encodeURI(req.body.character);
  const encodeServer = encodeURI(req.body.server);

  const auth = new Promise((resolve, reject) => {
    
    const option = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
      }
    }

    axios.get(`https://baram.nexon.com/Profile/Info?character=${encodeCharacter}%40${encodeServer}`, option)
      .then((html) => {
        if (html === undefined)
            throw new Error("NO HTML");
          
          const $ = cheerio.load(html.data);
          const $txtMessage = $("textarea").text();

          const regContainCharacter = new RegExp(req.params.character, "g");

          const regRes = regContainCharacter.test($txtMessage);
          console.log("REG RESPONSE > ", regRes);

          return regRes;
      })
      .then((regRes) => {
        //TODO DB PROCESS

        return regRes;
      })
      .then((authRes) => {

        res.send(authRes);
      })
      .catch((e) => {
        console.log("CHECK GAME USER ERROR > ", e);

        resolve(false);
      })
  });
});

app.listen(PORT, ()=>{
  console.log(`express is running on ${PORT}`);
})