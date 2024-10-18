import jwt from 'jsonwebtoken';

//create access token and refresh token and set them in cookies

export const generateTokenAndSetCookie = (res, payload) => {
    // create access token and refresh token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    
    // Define token expiration times
    const accessTokenExpiry = '1h';
    const refreshTokenExpiry = '5d';

    // Create access token
    const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenExpiry
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: refreshTokenExpiry
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 5
    });

    return {accessToken, refreshToken};
}