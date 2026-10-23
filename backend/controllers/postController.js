import { Post } from "../model/postModel.js"

export const addpost = async(req, res) => {
    const { userid } = req.params;
    const { media, caption, filter, } = req.body
    const newpost = await Post.create({
        media,
        caption,
        filter,
        userid
    })
    let postinfo = await newpost.populate('userid')
    res.send(postinfo)
}
export const getpost = async(req, res) => {

    let allPost = await Post.find().populate('userid')
    res.send(allPost)

}
export const updatepost = (req, res) => {
    res.send('post updated')
}
export const deletepost = (req, res) => {
    res.send('post deleted')
}