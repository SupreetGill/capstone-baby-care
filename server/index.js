require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const recipeRouters = require('./routes/recipes/recipe_routes');
const bookRouters = require('./routes/books/books_route');
const usersRouters = require('./routes/users/users_routes');

app.use("/images", express.static("images"));
app.use(express.json());
app.use(cors());

app.use('/recipes', recipeRouters);
app.use('/books', bookRouters);
app.use('/users', usersRouters);

app.get('/',(req, res)=>{
    res.send('checking my first route')
})


app.listen(PORT,()=>{
    console.log(`listening on port : ${PORT}`)
})