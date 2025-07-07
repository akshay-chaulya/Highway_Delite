import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { JWTUser } from "../types";

export const getJwtToken = (userData: JWTUser) => {
    const token = jwt.sign(
        userData,
        jwtSecret,
        {
            expiresIn: "1d",
        }
    );
    return token;
};

export const verifyJwtToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded as JWTUser;
    } catch (error) {
        return null;
    }
};
