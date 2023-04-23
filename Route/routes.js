const express= require("express")
const addBookModel= require("../Model/addBookModel")

const router= express.Router()
router.use(express.json())

router.post('/books', async(req, res)=>{
    try {
        // console.log(req.body)
        const newBook= await addBookModel.create(req.body)
        return res.status(200).send("Success")
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.get('/books',async(req, res)=>{
    try {
        const allBooks= await addBookModel.find()
        return res.status(200).json({
            status:"Success",
            books:allBooks
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports= router