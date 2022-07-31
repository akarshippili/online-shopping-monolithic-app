import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const generateSalt = async () => {
    return await bcrypt.genSalt(10);
}

export const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};


export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}