const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const communityControllers = require('../controllers/community')
const { ensureAuth, guestAuth } = require('../middleware/auth')

router.post('/createCommunity', upload.single("file"), communityControllers.createCommunity)

router.get('/:id', ensureAuth, communityControllers.getCommunity)

router.post('/:id/createPost', upload.single("file"), communityControllers.createPost)

router.put('/:id/joinMember', ensureAuth, communityControllers.joinMember)

router.put('/:id/removeMember', ensureAuth, communityControllers.removeMember)

module.exports = router