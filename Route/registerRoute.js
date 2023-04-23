const express= require("express")
const registerModel= require("../Model/registerModel")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")

const router= express.Router()
router.use(express.json())

const secret="booklist"

router.post("/user",async (req, res)=>{
    try {
        console.log(req.body)
        const userExist= await registerModel.findOne({name:req.body.name})
        if(userExist){
            return res.status(500).send("UserName alredy exist please try with diff userName")
        }
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                return res.status(400).send(err.message)
            }
            await registerModel.create({
                name:req.body.name,
                password:hash
            })
            return res.status(200).send("Member created successfully")
        });

    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.post("/login", async(req, res)=>{
    try {
        const userExist= await registerModel.findOne({name:req.body.name})
        if(!userExist){
            return res.status(400).send("User not found please register")
        }
        bcrypt.compare(req.body.password, userExist.password, function(err, result) {
            // result == true
            if(err){
                return res.status(400).send(err.message)
            }
            if(result){
                let userPayload= {userId:userExist.id}
                jwt.sign(userPayload, secret,{expiresIn:"1h"}, (error, token)=>{
                    if(error){
                        return res.status(400).send(error.message)
                    }else{
                        return res.status(200).send({
                            status:"Success",token:token
                        })
                    }
                })
            }
        });
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports= router