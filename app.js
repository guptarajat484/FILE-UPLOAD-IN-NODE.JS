const express=require('express')
const multer=require('multer')
const ejs =require('ejs')
const path=require('path')

const storage=multer.diskStorage({
    destination:"./public/uploads",
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload =multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
   
}).single('myImage');
function checkFileType(file,cb){
    const filetypes= /jpeg|jpg|png|gif/
const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype=filetypes.test(file.mimetype);
if (mimetype && extname){
    return cb(null,true)
 } else{
    cb("error: Images only!");
    }
}

const app =express()

app.set("view engine","ejs")
app.use(express.static("./public"))


app.get("/",(req,response)=>{
    response.render('index')
})

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.render('index',{
            msg:err

        }) }
        else{
            console.log(req.file)
            res.send("test")
        }
    })
})



app.listen(8989,function(){
    console.log("Server is running on 8989 port")
})