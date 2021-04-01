const router = require('express').Router();
const db = require('../../database/db');


router.get('/', (req, res)=>{
    db.query(
        "select book_id, title, author,image from books",
        //we need to put in [] only when we are filtering usign where clause
        [],
        (error,result)=>{
            if(error){
                return res.status(500).json({
                    //    message:"message",
                       error:error
                   })
               }
               return res.status(200).json({
                   data:result
               })
        }
    )
})

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    db.query(
        "select * from books where book_id = ? ",
        [id],
        (error, result)=>{
            if (error){
                return res.status(500).json({
                    error: error
                })
            }
            return res.status(200).json({
                data:result[0]
            })
        }
    )
})




module.exports = router;