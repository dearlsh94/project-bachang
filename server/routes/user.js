const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const SignUpUserSchema = require('../schemas/User/SignUpUserSchema');

/*
*    사용자 회원가입
*    TYPE : POST
*    URI : /api/user/signup
*    PARAM: { "id": "test", "password": "test", "mail": "mail@test.com", "salt": "salt" }
*    ERROR CODES:
*        1: 성공
*        2: 중복 유저
*        3: DB 생성 오류
*        4: DB 중복 확인 오류
*/
router.post('/signup', (req, res) => {
    // CHECK USER EXISTANCE
    // CREATE ACCOUNT
    let user = new SignUpUserSchema({
			id: req.body.id,
			password: req.body.password,
			mail: req.body.mail,
			salt: req.body.salt
    });
		
    SignUpUserSchema.findOne({id: user.id})
			.then((exist) => {
				if (exist) {
					console.log(`[ERROR] : ${user.id} IS ALREADY EXIST`);
					res.status(200).send({
						message: "중복된 유저",
						code: 2
					});

					return false;
				}
				else {
					SignUpUserSchema.create(user, (err, user) => {
						console.log(`[ERROR] : ${user.id} CREATED ERROR`);
						if (err) {
							res.status(500).send({
								message: "DB 생성 오류",
								code: 3
							});
						}

						return false;
					});
				}

				return true;
			})
			.then((created) => {
				if (created) {
					console.log(`[SUCCESS] : ${user.id} CREATED!!!`);
					res.status(200).send({
						message: "계정 생성 성공",
						code: 1
					});
				}
			})
			.catch((e) => {
				console.log(e);

				res.status(500).send({
					message: "DB 중복 확인 오류",
					code: 4
				});
			})
});

/*
*    사용자 서버, 닉네임 인증
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

        res.send(authRes);
      })
      .catch((e) => {
        console.log("CHECK GAME USER ERROR > ", e);

        resolve(false);
      })
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