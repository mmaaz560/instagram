import { Post } from "../model/postModel.js"

export const addpost = async(req, res) => {

    const { media, caption, filter } = req.body
    const newpost = await Post.create({
        media,
        caption,
        filter
    })

    res.send(newpost)
}
export const getpost = async(req, res) => {

    let allPost = await Post.find()
    res.send(allPost)

}
export const updatepost = (req, res) => {
    res.send('post updated')
}
export const deletepost = (req, res) => {
    res.send('post deleted')
}