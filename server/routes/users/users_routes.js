const router = require('express').Router();
const db = require('../../database/db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../middleware/auth_check');
const { generateKeyPair } = require('crypto');


router.post('/create',(req, res)=>{
    const {fullName,email} = req.body;
    const password = req.body.password;
    const encrytPassword = md5(password);

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
        "select user_id, password from users where email = ?",
        [email],
        (error,result)=>{
            if(error){
                return res.status(500).json({
                    error:error
                })
            }
            else if (!result[0]){
                return res.status(404).json({
                    status: 0, 
                    message: "email id dosen't exit, register first"
                })
            }
    
            else if (result[0].password === encrytPassword){
                const jwtToken = jwt.sign(
                    // endcoded the id from the database to send it as part of the payload(JWT)
                    {
                        id: Buffer.from(result[0].user_id.toString()).toString('base64')
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1hr"
                    }
                );

                // save the token in DB
                db.query(
                    "update users set secret_key = ? where user_id = ?",
                    [jwtToken, result[0].user_id],
                    (error, result) => {
                        if(error){
                            return res.status(500).json({
                                error:error
                            })
                        }
                        // return the token
                        return res.status(200).json({
                            jwtToken: jwtToken,
                            message:"password matched"
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message:"password Incorrect"
                })
            }
        }

    )
})

router.get('/logout', checkAuth, (req,res)=>{
    
    const encodedUserId = res.userData.data.id;
    const userId = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    db.query(
        "select secret_key from users where user_id = ?",
        [userId],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // removing the token from database
                db.query(
                    "update users set secret_key = ? where user_id = ?",
                    ['', userId],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: "Logout done"
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

router.get('/userDetails', checkAuth, (req,res)=>{
    
    const encodedUserId = res.userData.data.id;
    const userId = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    db.query(
        "select secret_key from users where user_id = ?",
        [userId],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // fetching user details from database
                db.query(
                    "select full_name, email from users where user_id = ?",
                    [userId],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            data: result[0]
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// add baby details
router.post('/addchild', checkAuth, (req,res)=>{
    
    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    const { babyName, age, gender, height, weight } = req.body;
    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // insert child data in database
                db.query(
                    "insert into baby_details (user_id, baby_name, age, gender, height, weight) values (?,?,?,?,?,?)",
                    [userIdDecoded, babyName, age, gender, height, weight],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: 'Baby details added'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// edit baby details
router.post('/editchild/:babyId', checkAuth, (req,res)=>{
    
    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    const { babyName, age, gender, height, weight } = req.body;
    const babyId = req.params.babyId;
    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // update child data in database
                db.query(
                    "update baby_details set baby_name = ?, age = ?, gender = ?, height = ?, weight = ? where baby_id = ?",
                    //values below- are decoded values from request body coming from client side
                    [babyName, age, gender, height, weight, babyId],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: 'Baby details updated'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// delete baby details
router.delete('/deletechild/:babyId', checkAuth, (req,res)=>{
   
    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    const babyId = req.params.babyId;

    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // delete child data in database
                db.query(
                    "delete from baby_details where baby_id = ?",
                    //values below- are decoded values from request body coming from client side
                    [babyId],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: 'Baby details deleted'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// all baby list
router.get('/allchild', checkAuth, (req,res)=>{
   
    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // fetch all baby list from database
                db.query(
                    "select * from baby_details where user_id = ?",
                    [userIdDecoded],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            data: result,
                            message: 'All baby list'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// single child fetch 

router.get('/singlechild/:babyid', checkAuth, (req,res)=>{

    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; 
    const babyId = req.params.babyid;
    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // fetch all baby list from database
                db.query(
                    "select * from baby_details where baby_id = ?",
                    [babyId],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            data: result[0],
                            message: 'single baby detail'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// add baby activity
router.post('/babyactivity/:babyId', checkAuth, (req,res)=>{

    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    const { feeds, diaper, tummy, words, createdat } = req.body;
    const babyId = req.params.babyId;
    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                // add activity details in database
                db.query(
                    "insert into baby_activity (baby_id, feeds, diaper, tummy, words, createdat) values (?,?,?,?,?,?)",
                    [babyId, feeds, diaper, tummy, words, createdat],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: 'Baby activity added'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})

// fetch baby dashboard 
router.get('/babyactivitylist/:currentdate', checkAuth, (req,res)=>{
    const encodedUserId = res.userData.data.id;
    //decoding the id
    const userIdDecoded = Buffer.from(encodedUserId, "base64").toString("ascii");
    //the actual token sent by user, coming from the front end,
    const userToken = res.userData.token; //

    // let date = new Date();
    // let currentDate = date.toISOString().slice(0,10);
    let currentDate = req.params.currentdate;
    console.log(currentDate);
    db.query(
        "select secret_key from users where user_id = ?",
        [userIdDecoded],
        (error, result) => {
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            else if(result[0].secret_key === userToken){
                db.query(
                    `select 
                    bd.baby_id, bd.baby_name, bd.age, bd.gender, bd.height, bd.weight, 
                    ba.feeds, ba.diaper, ba.tummy, ba.words 
                    from baby_details as bd 
                    left join baby_activity as ba 
                    on bd.baby_id = ba.baby_id 
                    where bd.user_id = ? and ba.createdat = ?`,
                    [userIdDecoded, currentDate],
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            date: currentDate,
                            data: result,
                            message: 'Baby activity details'
                        })
                    }
                )
            }
            else {
                return res.status(404).json({
                    message: "Token don't match"
                })
            }
        }
    )
})



// const generateKey  = async() => {
//     //generate key
//     generateKeyPair('ec', {
//         namedCurve: 'secp256k1',
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'der'
//         }
//     },
//     (err, publicKey) => {
//         if(err){
//             console.log("Key genrate error");
//             return 0;
//         } else {
//             console.log("Key : ", publicKey.toString('hex'));
//             return publicKey.toString('hex');
//         }
//     })
//  }



module.exports = router;