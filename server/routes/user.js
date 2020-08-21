const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

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

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/
router.post('/signup', (req, res) => {
    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    SignUpUserSchema.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        let account = new SignUpUserSchema({
            id: req.body.id,
            password: req.body.password,
            mail: req.body.mail,
            salt: req.body.salt
        });

        // SAVE IN THE DATABASE
        account.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    SignUpUserSchema.findOne({ username: req.body.username}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        

        // ALTER SESSION
        

        // RETURN SUCCESS
        return res.json({
            success: true
        });
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