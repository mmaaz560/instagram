import express from 'express'
import { addpost, deletepost, getpost, updatepost } from '../controllers/postController.js'
export const postRouter = express.Router()

postRouter.post('/add-post', addpost)
postRouter.get('/get-post', getpost)
postRouter.put('/update-post', updatepost)
postRouter.delete('/delete-post', deletepost)