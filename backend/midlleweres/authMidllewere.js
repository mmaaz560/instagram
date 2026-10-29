import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js"; // 👈 yeh missing ho sakta hai

export const authhandler = async(req, res, next) => {
    let token = null
    if (req.headers.authorization || req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            let decode = await jwt.verify(token, process.env.JWT_SECRET)
            let myuser = await User.findById(decode.id)
            req.user = myuser;
            next()
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token" });

        }
    } else {
        res.status(401)
        throw new Error('Unauthorized')
    }
}