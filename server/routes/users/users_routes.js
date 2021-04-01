const router = require('express').Router();
const db = require('../../database/db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
// so db connection is reqd in route file

router.post('/create',(req, res)=>{
    const {fullName,email} = req.body;
    const password = req.body.password;
    const encrytPassword = md5(password);
    // console.log(fullName, email,password)
    // console.log(password,encrytPassword)

   db.query(
       "insert into users (full_name, email, password, status) values (?,?,?,?)",
       [fullName,email,encrytPassword,'1'],
       (error, result)=>{
          if(error){
              return res.status(500).json({
                  error:error
              })
          }
          return res.status(200).json({
              message: "registered successfully"
          })
       }
   )

})

router.post('/login',(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const encrytPassword = md5(password);
    db.query(
        "select password from users where email = ?",
        [email],
        (error,result)=>{
            if(error){
                return res.status(500).json({
                    error:error
                })
            }
            else if (!result[0]){
                return res.status(404).json({
                    message: "email id dosen't exit, register first"
                })
            }
            //results returned from db are in the form of arrays
            else if (result[0].password === encrytPassword){
                return res.status(200).json({
                    message:"password matched"
                })
            }
            else {
                return res.status(404).json({
                    message:"password Incorrect"
                })
            }
        }

    )
})







module.exports = router;