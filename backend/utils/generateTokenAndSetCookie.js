import jwt from 'jsonwebtoken';

//create access token and refresh token and set them in cookies

export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '24h'  
    });
    
    return accessToken;
};