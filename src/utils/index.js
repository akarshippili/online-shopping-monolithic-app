import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';


export const generateSalt = async () => {
    return await bcrypt.genSalt(10);
}

export const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};


export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


export const generateToken = (payload) => {
    return jwt.sign(payload, config.secret, { expiresIn: config.jwtExpiration });
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.secret);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
}