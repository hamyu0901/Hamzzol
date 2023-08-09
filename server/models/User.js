const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //saltrounds를 10자리로 만든다.
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname:{
        type:String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type:String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function(next){      //user의 정보를 저장하기 전에 즉, 회원가입 전에
    var user = this     //this는 userSchema를 가리킨다.
    if(user.isModified('password')){
        //비밀번호를 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {  //암호화를 위해 salt를 생성한다. saltrounds를 활용해서
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {  //plainpassword = user.passwod이다
                if(err) return next(err)
                user.password = hash    //원래의 password를 암호화된 hash로 교체를 해준다.
                next()
            })
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 1234567 암호화된 비밀번호 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jwt를 이용하여 token생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)

    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode한다.
    jwt.verify(token,'secretToken', function(err, decoded){

        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 db의 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)

        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports={User}