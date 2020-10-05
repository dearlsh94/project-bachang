const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const config = require('../config.json');

const SignUpUserSchema = require('../schemas/User/SignUpUserSchema');
const UserInfoSchema = require('../schemas/User/UserInfoSchema');
/*
*    아이디 중복 검사
*    TYPE : POST
*    URI : /api/common/checkid
*    PARAM: {"id"}
*    RESULT CODES:
*       true: 신규 ID
*       false: 중복 ID
*/
router.post('/checkid', (req, res) => {
  console.log(req.body.id);
  SignUpUserSchema.findOneById(req.body.id)
    .then((exist) => {
      if (exist) {
        res.status(200).send({
          message: "사용 불가능한 ID 입니다.",
          code: 2
        });
      }
      else {
        res.status(200).send({
          message: "사용 가능한 ID 입니다.",
          code: 1
        });
      }
    });
});

/*
*    사용자 회원가입
*    TYPE : POST
*    URI : /api/common/signup
*    PARAM: { "id": "test", "password": "test", "salt": "salt", "createDateString", "editDateString" }
*    ERROR CODES:
*        1: 성공
*        2: 중복 유저
*        3: DB 생성 오류
*        4: DB 중복 확인 오류
*/
router.post('/signup', (req, res) => {
  // CREATE ACCOUNT
  let user = new SignUpUserSchema({
    id: req.body.id,
    password: req.body.password,
    salt: req.body.salt,
    createDateString: req.body.createDateString,
    editDateString: req.body.editDateString
  });
  
  SignUpUserSchema.findOneById(user.id)
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
        
        const userInfo = new UserInfoSchema({
          id: user.id,
          createDateString: user.createDateString,
          editDateString: user.editDateString,
          point: 0,
          grade: "Level 1",
          isActive: false,
        });

        UserInfoSchema.create(userInfo);
      }

      return true;
    })
    .then((created) => {
      if (created) {
        console.log(`[SUCCESS] : ${user.id} CREATED!!!`);
        
        res.status(200).send({
          message: "회원가입이 완료되었습니다.",
          code: 1
        });
      }
    })
    .catch((e) => {
      console.log(`[ERROR] : ${user.id} EXIST CHECK ERROR > ${e}`);

      res.status(500).send({
        message: "DB 중복 확인 오류",
        code: 4
      });
    })
});


/*
*    사용자 로그인
*    TYPE : POST
*    URI : /api/user/signin
*    PARAM: { "id": "test", "password": "test"}
*    ERROR CODES:
*        1: 성공
*        2: 존재하지 않는 유저
*        3: 패스워드 불일치
*/
router.post('/signin', (req, res) => {

  // FIND THE USER BY USERNAME
  SignUpUserSchema.findOneById(req.body.id)
    .then((user) => {
      if(user) {
        // 패스워드 암호화 비교
        const encryptPassword = crypto.createHash("sha512").update(req.body.password + user.salt).digest("hex");
        if ( encryptPassword !== user.password ) {
          console.log(`[ERROR] : ${user.id} IS NOT MATCHED PASSWORD`);
          res.status(200).send({
            message: "비밀번호가 일치하지 않습니다.",
            code: 3
          });

          return false;
        }
        else {
          console.log("[SUCCESS] LOGIN SUCCESSED");

          // CREATE JSONWEBTOKEN
          const token = jsonwebtoken.sign(
            {
              id: user.id,
            },
            config.secret,
            {
              expiresIn: '2h'
            }
          );

          res.status(200).send({
            message: "로그인 성공!",
            token: token,
            code: 1
          });

          return true;
        }
      }
      else {
        console.log(`[ERROR] : ${req.body.id} IS NOT EXIST USER`);
        res.status(200).send({
          message: "존재하지 않는 사용자입니다.",
          code: 2
        });

        return false;
      }
    });
});


module.exports = router;