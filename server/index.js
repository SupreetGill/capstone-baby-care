require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const recipeRouters = require('./routes/recipes/recipe_routes');
const bookRouters = require('./routes/books/books_route');
const usersRouters = require('./routes/users/users_routes');
const db = require('./database/db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('./passport-setup');

//google auth settings
const session = require('express-session');
const passport = require('passport');

//ejs: To render HTML pages for login and profile
// app.set('view engine', 'ejs');

app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors());

app.use('/recipes', recipeRouters);
app.use('/books', bookRouters);
app.use('/users', usersRouters);


//google auth
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req, res)=>{
    res.send('checking my first route')
})

//google code
// google login hit
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));


app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success', (req, res) => {
  // email and full name is extracted from google profile
  const userEmail = req.user.email;
  const fullName = req.user.displayName;

  db.query(
    "select user_id from users where email = ?",
    [userEmail],
    (error, result) => {
      if(error){
          return res.status(500).json({
              error:error
          })
      }
      // if not exist then create
      else if (!result[0]){
        db.query(
            "insert into users (full_name, email, status) values (?,?,?)",
            [fullName,userEmail,'1'],
            (error, result)=>{
              if(error){
                  return res.status(500).json({
                      error:error
                  })
              }
                const jwtToken = jwt.sign(
                    // endcoded the id from the database to send it as part of the payload(JWT)
                    {
                        id: Buffer.from(result.insertId.toString()).toString('base64')
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1hr"
                    }
                );
                // save the token in DB
                // jwttoken -> is what we are saving as secret key in our db
                //secret key -is diff for each user even though db key is samwe -> tthat is part of jwt token
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
                      return res.redirect('http://localhost:3000/googleauth/'+jwtToken);
                    //   return res.status(200).json({
                    //       jwtToken: jwtToken,
                    //       message:"user logged in"
                    //   })
                  }
                )
            }
        )
      }
      // if exist then login
      else {
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
              return res.redirect('http://localhost:3000/googleauth/'+jwtToken);
            //   return res.status(200).json({
            //       jwtToken: jwtToken,
            //       message:"user logged in"
            //   })
          }
        )
      }
    }
  )
  // return res.status(200).json({
  //   email: userEmail,
  //   data: req.user
  // })
});

app.get('/auth/google/failure', (req, res) => {
  return res.status(500).json({
    message: "Google auth failed"
  })
});




app.listen(PORT,()=>{
    console.log(`listening on port : ${PORT}`)
})