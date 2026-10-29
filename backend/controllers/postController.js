import { Post } from "../model/postModel.js"

export const addpost = async(req, res) => {
    try {
        const userid = req.user._id;
        const { media, caption, filter } = req.body;

        if (!media) {
            return res.status(400).json({ message: "Media is required" });
        }

        // 1. Naya post create karein
        const newpost = await Post.create({
            media,
            caption,
            filter,
            userid
        });

        // 2. Naye post ko 'populate' karein (taake user ka naam/email sath aaye)
        const populatedPost = await Post.findById(newpost._id).populate('userid', '-password');

        // 3. Frontend ko sirf naya post bhejein (Array nahi bhejna)
        res.status(201).json({
            success: true,
            data: populatedPost
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
export const getpost = async(req, res) => {

    let allPost = await Post.find().populate('userid').sort({ createdAt: -1 })
    res.send(allPost)

}
export const updatepost = (req, res) => {
    res.send('post updated')
}
export const deletepost = (req, res) => {
    res.send('post deleted')
}