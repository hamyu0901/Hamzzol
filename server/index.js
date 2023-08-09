const express = require('express')
const req = require('express/lib/request')
const app = express()
const port = 5001
const mongoose = require('mongoose')
const {auth} = require('./middleware/auth')
const {User} = require("./models/User");
const {Text} = require("./models/Text")
const bodyParser = require('body-parser');
const config = require('./config/key');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')



//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true
}).then(()=>console.log('DB Connected...'))
.catch(err =>console.log(err))



app.get('/api/hello', (req,res)=> {


    res.send("안녕하세요~~~~~~")
})

//회원가입
app.post('/api/users/register', (req,res)=>{
    //회원가입할때 필요한 정보들을 client에서 가져오면 db에 넣어준다
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err){
            console.log("에러에러",err)
            return res.json({success:false, err}) 
        }
        return res.status(200).json({success:true})
    })
})

//게시글 등록
app.post('/api/registertext',(req,res)=>{
    var textdata = req.body
    textdata.time = today
    const text = new Text(req.body)
    
    text.save((err,textinfo)=>{
        if(err) return res.json({
            success:false, err
        })
        return res.status(200).json({success:true})
    })
    


})
//db에 있는 게시글 목록 보여주기
app.get('/api/listtext',(req,res)=>{
    Text.find().then((dd)=>{
        res.json(dd);
    })
    .catch((err)=>{
        console.error(err);
    })

})
//db에 있는 게시글 수정
app.put('/api/edittext',(req,res)=>{
    // console.log('44444444444444444444',req.body)    //id를 기반으로 제목과 본문내용을 바꿔준다.
    let today = new Date().toLocaleString();

    Text.findOneAndUpdate({_id:req.body._id},{$set:{title:req.body.title,description:req.body.description,time:today}},(err,doc)=>{
        if(err){
            return res.json({
                success:false, err
            })
            
        }
        return res.status(200).json({
            success:true
        })
    })
})
//db에 있는 게시글 삭제
app.delete('/api/deletetext/:id',(req,res)=>{
    Text.deleteOne({_id:req.params.id}).then((err)=>{
        console.log('data delete')
        return res.status(200).json({
            deleteSuccess:true
        })
    }).catch((err)=>{
        res.status.send(err)
    })
})


//로그인
app.post('/api/users/login', (req, res) =>{
    //요청된 이메일을 db에 있는지 찾는다.
    User.findOne({email:req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess:false,
                message: '이메일에 해당하는 유저가 없습니다.'
            })
        }
        //요청된 이메일이 db에 있다면 비밀번호가 같은지 확인
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch){
                return res.json({
                    loginSuccess:false,
                    message: '비밀번호가 틀렸습니다.'
                })
            }
            //비밀번호까지 맞다면 토큰을 생성해야한다.
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                //토큰을 저장한다. 어디? 쿠키 or 로컬스토리지 여기서는 쿠키에다가 한다
                res.cookie("x_auth",user.token).status(200).json({loginSuccess:true, userId:user.name})
            })
        })
    })
})


app.get('/api/users/auth',auth,(req,res)=>{
    //여기는 auth.js이 true라는 말이다. 로그인 되어있는 유저라는뜻

    res.status(200).json({
        _id: req.user._id,
        isAdmin:req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout', auth, (req,res) =>{
    User.findOneAndUpdate({_id: req.user._id},{token:""},(err,user)=>{
        if(err) return res.json({
            success: false, err
        });
        return res.status(200).send({
            success: true
        })
    })
})



app.listen(port, ()=> console.log('Example app listening on port',port,'!'))