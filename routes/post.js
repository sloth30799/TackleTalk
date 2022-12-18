const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsControllers = require('../controllers/posts')
const { ensureAuth, guestAuth } = require('../middleware/auth')

router.post('/createPost', upload.single("file"), postsControllers.createPost)

router.get('/:id', ensureAuth, postsControllers.getPost)

router.put('/likePost/:id', postsControllers.likePost)

router.delete('/deletePost/:id', postsControllers.deletePost)

module.exports = router