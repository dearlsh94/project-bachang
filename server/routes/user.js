const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const UserInfoSchema = require('../schemas/User/UserInfoSchema');
const AccountInfoSchema = require('../schemas/User/AccountInfoSchema');
const SignUpUserSchema = require('../schemas/User/SignUpUserSchema');

/*
*    사용자 서버, 닉네임 검사
*    TYPE : POST
*    URI : /api/user/check
*    HEADER: { "token": token }
*    BODY: { "character": "닉네임", "server": "서버" }
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
          //console.log($txtMessage);

          const regRes = new RegExp(`${req.body.id}`).test($txtMessage);

          return regRes;
      })
      .then((regRes) => {
        if (regRes) {
          res.status(200).send({
            message: "바람의 나라 계정 인증에 성공하였습니다.",
            code: 4000
          });
        }
        else {
          res.status(200).send({
            message: "바람의 나라 계정 인증에 실패하였습니다.",
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
*    사용자 정보수정
*    TYPE : PUT
*    URI : /api/user/update
*    HEADER: { "token": token }
*    BODY: { "userInfo": IUserInfo }
*    ERROR CODES:
*        1: 성공
*        2: 변경 오류
*/
router.put('/update', (req, res) => {
  const editedUserInfo = {
    openKakao: req.body.openKakao,
    editDateString: req.body.editDateString
  }

  UserInfoSchema.updateById(req.body.id, editedUserInfo)
    .then((updatedUserInfo) => {
      if (updatedUserInfo) {
        console.log(`[SUCCESS] : ${updatedUserInfo.id} INFORMATION UPDATE`);
        res.status(200).send({
          message: "정보가 수정되었습니다.",
          code: 1
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${updatedUserInfo.id} INFORMATION UPDATE ERROR`);
        res.status(200).send({
          message: "작업 중 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요.",
          code: 2
        });

        return false;
      }
    })
});

/*
*    사용자 정보 인증
*    TYPE : PUT
*    URI : /api/user/auth
*    HEADER: { "token": token }
*    BODY: { "id", "server", "character" "authDateString" }
*    ERROR CODES:
*        4000: 인증 성공
*        4001: 인증 실패
*        4002: 중복 계정
*/
router.put('/auth', (req, res) => {
  const id = req.body.id;

  const accountInfo = {
    server: req.body.server,
    character: req.body.character,
    authDateString: req.body.authDateString
  };

  // Exist Check
  AccountInfoSchema.checkAccount(id, accountInfo.server, accountInfo.character)
    .then((exist) => {
      if (exist) {
        console.log(`[ERROR] : ${id} AUTHETICATION ERROR`);
        res.status(200).send({
          message: "이미 인증 처리 된 계정 입니다.",
          code: 4002
        });
      }
      else {
        AccountInfoSchema.create(id, accountInfo);

        UserInfoSchema.pushAccountList(id, accountInfo)
          .then((updated) => {
            
            if (updated) {
              console.log(`[SUCCESS] : ${id} AUTHETICATION`);
              res.status(200).send({
                message: `${accountInfo.server}%${accountInfo.character} 계정 인증에 성공하였습니다.`,
                code: 4000
              });
      
              return true;
            }
            else {
              console.log(`[ERROR] : ${id} AUTHETICATION ERROR`);
              res.status(200).send({
                message: "인증에 실패하였습니다.",
                code: 4001
              });
      
              return false;
            }
          })
      }
    });
});

/*
*    사용자 정보조회
*    TYPE : GET
*    URI : /api/user/find
*    HEADER: { "token": token }
*    QUERYSTRING: { "id": id }
*    RETURN: userInfo
*    ERROR CODES:
*        1: 성공
*        2: 사용자 정보가 존재하지 않음.
*        3: 서버 오류
*/
router.get('/find', (req, res) => {
  const id = req.query.id;

  UserInfoSchema.findOneById(req.query.id)
    .then((user) => {
      if (user) {
        console.log(`[SUCCESS] : ${id} INFORMATION FIND`);
        res.status(200).send({
          message: "사용자 정보를 조회하였습니다.",
          code: 1,
          userInfo: user
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${id} INFORMATION FIND ERROR`);
        res.status(200).send({
          message: "사용자 정보를 찾을 수 없습니다.",
          code: 2
        });

        return null;
      }
    })
    .catch((e) => {
      console.log(`[ERROR] : ${id} INFORMATION FIND SERVER ERROR`);
      console.log(e);
      res.status(200).send({
        message: "사용자 정보를 찾는 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        code: 3
      });
    })
});

/*
*    대표캐릭터 설정
*    TYPE : PUT
*    URI : /api/user/settitle
*    HEADER: { "token": token }
*    BODY: { "id", "server", "character" }
*    ERROR CODES:
*        1: 성공
*        2: 사용자 정보가 존재하지 않음.
*        3: 서버 오류
*/
router.put('/settitle', (req, res) => {
  const id = req.body.id;
  const titleAccountInfo = {
    server: req.body.server,
    character: req.body.character
  }
  
  UserInfoSchema.updateById(id, {titleAccount: titleAccountInfo})
    .then((updatedUserInfo) => {
      if (updatedUserInfo) {
        console.log(`[SUCCESS] : ${updatedUserInfo.id} INFORMATION UPDATE`);
        res.status(200).send({
          message: "대표캐릭터가 변경되었습니다.",
          code: 1
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${updatedUserInfo.id} INFORMATION UPDATE ERROR`);
        res.status(200).send({
          message: "대표캐릭터 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요.",
          code: 2
        });

        return false;
      }
    })
    .catch((e) => {
      console.log(`[ERROR] : ${id} SET TITLE ACCOUNT ERROR`);
      console.log(e);
      res.status(200).send({
        message: "대표캐릭터 설정 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        code: 3
      });
    })

});

/*
*    비밀번호 변경
*    TYPE : PUT
*    URI : /api/user/changepassword
*    HEADER: { "token": token }
*    BODY: { "id", "password", "slat", "editDateString" }
*    ERROR CODES:
*        1: 성공
*        2: 비밀번호 변경 실패
*        3: 서버 오류
*/
router.put('/changepassword', (req, res) => {
  // CHANGE PASSWORD INFO
  const id = req.body.id;
  const changePasswordInfo = {
    password: req.body.password,
    salt: req.body.salt,
    editDateString: req.body.editDateString
  };

  SignUpUserSchema.changePassword(id, changePasswordInfo)
    .then((changedInfo) => {
      if (changedInfo) {
        console.log(`[SUCCESS] : ${changedInfo.id} PASSWORD WAS CHANGEED`);
        res.status(200).send({
          message: "비밀번호가 변경되었습니다. 다시 로그인 해 주세요.",
          code: 1
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${changedInfo.id} PASSWORD CHANGE ERROR`);
        res.status(200).send({
          message: "비밀번호 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요.",
          code: 2
        });

        return false;
      }
    })
    .catch((e) => {
      console.log(`[ERROR] : ${id} CHANGE PASSWORD ERROR`);
      console.log(e);
      res.status(200).send({
        message: "비밀번호 변경 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        code: 3
      });
    })
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