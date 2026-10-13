import { User } from "../model/userModel.js"

export const registerUser = async(req, res) => {
    const { m_mail, password, name, b_day, username } = req.body
    if (!m_mail || !password || !name || !b_day || !username) {
        return res.status(400);
        throw new Error("All fields are required");
    }
    const newuser = await User.create({
        m_mail,
        password,
        name,
        b_day,
        username
    })
    res.send(newuser)
}