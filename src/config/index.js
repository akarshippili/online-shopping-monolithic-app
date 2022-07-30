import dotEnv from 'dotenv';

console.log('Loading environment variables...');
console.log('Node environment:', process.env.NODE_ENV);

dotEnv.config();

export default{
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/',
    password: process.env.PASSWORD || 'password',
    secret: process.env.SECRET || 'secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    jwtRefreshExpirationInMilliseconds: process.env.JWT_REFRESH_EXPIRATION_IN_MILLISECONDS || 604800000,
};