import express from 'express'
import { addpost, deletepost, getpost, updatepost } from '../controllers/postController.js'
import { authhandler } from '../midlleweres/authMidllewere.js'
export const postRouter = express.Router()

postRouter.post('/add-post', authhandler, addpost)
postRouter.get('/get-post', getpost)
postRouter.put('/update-post', updatepost)
postRouter.delete('/delete-post', deletepost)