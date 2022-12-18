const Community = require('../models/Community')
const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')

module.exports = {
    createCommunity: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            await Community.create({
                name: req.body.name,
                description: req.body.description,
                admin: req.user.id,
                image: result.secure_url,
                cloudinaryId: result.public_id,
            })
            console.log("Community has been created ")
            res.redirect('/communityBoard')
        } catch (error) {
            console.log(error)
        }
    },
    getCommunity: async (req, res) => {
        try {
          const community = await Community.findById(req.params.id);
          const posts = await Post.find({ community: req.params.id }).sort( {createdAt: 'desc'} ).lean().populate('user')
          res.render("community.ejs", { community: community, user: req.user, posts: posts });
          console.log(community._id)
        } catch (err) {
          console.log(err);
        }
    },
    createPost: async (req,res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result)
            console.log(req.params)
            await Post.create({
                title: req.body.title,
                caption: req.body.caption,
                likes: 0,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                user: req.user.id,
                community: req.params.id
            })
            console.log("Post has been added!")
            res.redirect(`/community/${req.params.id}`)
        } catch (error) {
            console.error(error)
        }
    },
    joinMember: async (req, res) => {
        try {
          await Community.findOneAndUpdate(
            { _id: req.params.id },
            {
              $push: {members: req.user.id} ,
            }
          );
          console.log("Member added");
          res.redirect(`/community/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
    },
    removeMember: async (req, res) => {
      try {
        await Community.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: {members: req.user.id} ,
          }
        );
        console.log("Member removed");
        res.redirect(`/community/${req.params.id}`);
      } catch (err) {
        console.log(err);
      }
  },
}