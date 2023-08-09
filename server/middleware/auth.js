const {User} = require('../models/User')


let auth = (req,res,next)=>{
    //로그인 유저인지 아닌지 판단하는부분
    let token = req.cookies.x_auth;//클라이언트 쿠키에서 토큰을 가져온다.
    //토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token,(err,user)=> {

        if(err) throw err;
        if(!user) {
            return res.json({isAuth:false, error: true, message:"사용자가 없습니다."})
        }
        req.token = token; // 
        req.user = user;
        next();

    })

}
module.exports = {auth};
