const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

/*
*    사용자 서버, 닉네임 검사
*    TYPE : POST
*    URI : /api/user/check
*    PARAM: { "character": "닉네임", "server": "서버" }
*/
router.post('/check', (req, res) => {

  const encodeCharacter = encodeURI(req.body.character);
  const encodeServer = encodeURI(req.body.server);

  new Promise((resolve, reject) => {
    
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

          console.log($txtMessage);

          const regContainCharacter = new RegExp(req.body.character, "g");

          const regRes = regContainCharacter.test($txtMessage);
          console.log("REG RESPONSE > ", regRes);

          return regRes;
      })
      .then((regRes) => {
        //TODO DB PROCESS

        return regRes;
      })
      .then((authRes) => {
        if (authRes) {
          res.status(200).send({
            message: "인증에 성공하였습니다. 잠시 후 회원정보로 이동합니다.",
            code: 4000
          });
        }
        else {
          res.status(200).send({
            message: "인증에 실패하였습니다.",
            code: 4001
          });
        }
      })
      .catch((e) => {
        console.log("CHECK GAME USER ERROR > ", e);

        resolve(false);
      })
  });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
    
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    
});


/*
    SEARCH USER: GET /api/account/search/:username
*/
router.get('/search/:username', (req, res) => {
    // SEARCH USERNAMES THAT STARTS WITH GIVEN KEYWORD USING REGEX

});

// EMPTY SEARCH REQUEST: GET /api/account/search
router.get('/search', (req, res) => {
    res.json([]);
});

module.exports = router;