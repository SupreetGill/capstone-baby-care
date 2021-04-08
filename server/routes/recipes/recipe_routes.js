const router = require('express').Router();
const db = require('../../database/db');
const checkAuth = require('../../middleware/auth_check');




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
        "select r.recipe_id, r.category_id, r.name, r.description, r.image, (select count(*) from recipe_actions where action_type = 'like' and recipe_id = r.recipe_id) as like_count, (select count(*) from recipe_actions where action_type = 'comment' and recipe_id = r.recipe_id) as comment_count from recipes as r",
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
//

router.get('/recipeDetails/:recipeid', (req,res)=>{
    const recipeId = req.params.recipeid;

    db.query(
     "select r.recipe_id, r.category_id, r.name, r.description, r.image, r.ingredients, r.instructions, (select count(*) from recipe_actions where action_type = 'like' and recipe_id = r.recipe_id) as like_count, (select count(*) from recipe_actions where action_type = 'comment' and recipe_id = r.recipe_id) as comment_count from recipes as r where recipe_id =?",
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


router.post('/addComment/:recipeid',checkAuth,(req,res)=>{
    const recipeid = req.params.recipeid;
    const comment = req.body.comment;

    const encodedUserId = res.userData.data.id;
    const userId = Buffer.from(encodedUserId, "base64").toString("ascii");
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
                db.query(
                    "insert into recipe_actions (action_type,user_id,recipe_id,comment) values (?,?,?,?)",
                    ['comment',userId,recipeid,comment],

                  
                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: "comment added",
                            // result
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

router.get('/allcomment/:recipeid',(req,res)=>{
    // const userid = req.params.userid;
    const recipeid = req.params.recipeid;

    // fetch all comment 
    db.query(
        "select ra.id, ra.comment, us.full_name from recipe_actions as ra inner join users as us on ra.user_id = us.user_id where ra.recipe_id = ? and ra.action_type = ?",
        [recipeid, 'comment'],
        (error, result) =>{
            if(error){
                return res.status(500).json({
                    error: error
                })
            }
            return res.status(200).json({
                data: result
            })
        }
    )

})

router.delete('/deleteComment/:commentid', checkAuth, (req,res)=>{
    // const userid = req.params.userid;
    const commentid = req.params.commentid;

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
                // delete the comment form database
                db.query(
                    "delete from recipe_actions where id = ?",
                    [commentid],

                    (error, result) =>{
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        return res.status(200).json({
                            message: "comment deleted"
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


router.post('/like/:recipeid',checkAuth,(req,res)=>{
    // const userid = req.params.userid;
    const recipeid = req.params.recipeid;

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
                //check the like status
                db.query(
                    "select count(*) as count from recipe_actions where user_id = ? and recipe_id = ? and action_type = ?",
                    [userId, recipeid, 'like'],
                    (error, result) => {
                        if(error){
                            return res.status(500).json({
                                error: error
                            })
                        }
                        // if count found then delete
                        else if(result[0].count == 1){
                            db.query(
                                "delete from recipe_actions where user_id = ? and recipe_id = ? and action_type = ?",
                                [userId, recipeid, 'like'],
                                (error, result) =>{
                                    if(error){
                                        return res.status(500).json({
                                            error: error
                                        })
                                    }
                                    return res.status(200).json({
                                        message: "like delete"
                                    })
                                }
                            )
                        }
                        // add the like
                        else {
                            // like added in database
                            db.query(
                                "insert into recipe_actions (action_type,user_id,recipe_id) values (?,?,?)",
                                ['like',userId,recipeid],
                                (error, result) =>{
                                    if(error){
                                        return res.status(500).json({
                                            error: error
                                        })
                                    }
                                    return res.status(200).json({
                                        message: "like added"
                                    })
                                }
                            )
                        }
                        
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











module.exports = router;
