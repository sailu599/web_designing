const express=require('express')
const  router=express.Router()
const mongo=require('mongoose')


const user_model=require('./model/user_model')
const uri = "mongodb://127.0.0.1:27017/mydb"



const connection=async function(){
    try {
        await mongo.connect(uri);
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
    }
    connection()

 router.get('/',(req,res)=>{
    res.render('homepage.ejs')
 })


    router.get('/login',(req,res)=>{
        res.render('login.ejs');
    })

    
router.get('/register',(req,res)=>{
    res.render('register.ejs');

})

router.post('/register',(req,res)=>{
    let data=req.body
    let new_user=new user_model({
        user_name:data.user_name,
        gmail:data.gmail,
        password:data.password
    })
    new_user.save().then(()=>console.log('saved sucessfully'))
    res.redirect('/login');
})

router.post('/login',(req,res)=>{
    let check=async function(){
    let user_data=req.body
    let fetch_data=await user_model.findOne({user_name:user_data.user_name})
    console.log(user_data.user_name)
    if(fetch_data.password==user_data.password)
    {
           res.redirect('/display_product')
           user_name_global=fetch_data.user_name
    }
    else
    {  
       res.send('login unsucessful')
    }
}
  check()
})

 router.get('/display_product',(req,res)=>{
    res.render('display_product.ejs')
 })

module.exports=router