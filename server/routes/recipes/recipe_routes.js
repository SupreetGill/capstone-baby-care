const router = require('express').Router();
const db = require('../../database/db');
// so db connection is reqd in route file.



router.get('/recipe_category',(req,res)=>{
    db.query(
        "select id, name from recipe_category where status =?",
        ['1'],
        (error, result)=>{
            if(error){
             return res.status(500).json({
                    error:error
                })
            }
            return res.status(200).json({
                data:result
            })

        }
    )
})

router.get('/',(req,res)=>{
    db.query(
        "select recipe_id, category_id, name, description, image from recipes",
        [],
        (error, result)=>{
            if(error){
             return res.status(500).json({
                    error:error
                })
            }
            result.map(recipe=>{
                const imagePath = `http://localhost:5000/images/recipeImages/${recipe.image}` 
                recipe.image = imagePath
                return recipe;
              })
            return res.status(200).json({
                data:result
            })

        }
    )
})

router.get('/recipeByCategory/:categoryid', (req,res)=>{
    const categoryId = req.params.categoryid;

    db.query(
     "select * from recipes where category_id =?",
     [categoryId],
     (error, result)=>{
        if(error){
         return res.status(500).json({
                error:error
            })
        }
        return res.status(200).json({
            data:result
        })

    }
    )
})
//

router.get('/recipeDetails/:recipeid', (req,res)=>{
    const recipeId = req.params.recipeid;

    db.query(
     "select * from recipes where recipe_id =?",
     [recipeId],
     (error, result)=>{
        if(error){
         return res.status(500).json({
                error:error
            })
        }
        result[0].image = `http://localhost:5000/images/recipeImages/${result[0].image}`;
        return res.status(200).json({
            data:result[0]
        })

    }
    )
})
























module.exports = router;
// router.post('/add_category',(req,res)=>{
//     const {name} = req.body;
    
//     db.query(
//         "insert into recipe_category (name, status) values (?,?)",
//         [ name, '1' ],
//         (error, result) => {
//             if(error) { 
//                 return res.status(500).json({
//                     message: "Databse error",
//                     error: error
//                 })
//             }
//             db.query(
//                 "select name from recipe_category where category_id = ?",
//                 [ result.insertId ],
//                 (error, result) => {
//                     if(error) { 
//                         return res.status(500).json({
//                             message: "Databse error",
//                             error: error
//                         })
//                     }
//                     return res.status(200).json({
//                         message : "recipe category added",
//                         category_added: result[0]
//                     })
//                 }
//             )
//         }
//     )
// })


