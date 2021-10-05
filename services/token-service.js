const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const refreshModel = require('../models/refresh-model');
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn:'1y',
        })
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn:'1y',
        })
        return {accessToken,refreshToken};
    }
    async storeRefershToken(token,userId){
        
        try{
           await refreshModel.create({
               tokens:[token],
               userId
           })
        }catch(err){
            console.log(err)
        }
    }
    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
    }
      async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }
    async findRefreshToken(refreshToken) {
        return await refreshModel.findOne({
            tokens:{"$in" : [refreshToken]}
        });
    }
    async updateRefreshToken(userId,refreshToken){
        return await refreshModel.updateOne(
            {userId:userId},
            {"$push":{"tokens":refreshToken}}
        );
    }
    async removeToken(userId,refreshToken) {
    return await refreshModel.updateOne(
    { userId: userId },
    { "$pull": { "tokens": refreshToken } },
  )
    }
}
module.exports = new TokenService();