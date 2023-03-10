const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Community = require('../models/Community')

module.exports = {
    getProfile: async (req,res) => {
        try {
            const posts = await Post.find( {user: req.user.id} )
            res.render('profile.ejs', { posts: posts, user: req.user })
        } catch (error) {
            console.error(error)
        }
    },
    getFeed: async (req,res) => {
        try {
            const posts = await Post.find().sort( {createdAt: 'ascending'} ).lean().populate('user').populate('community')
            console.log(posts)
            res.render('feed.ejs', { posts: posts })
        } catch (error) {
            console.error(error)
        }
    },
    getPost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          res.render("post.ejs", { post: post, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    createPost: async (req,res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result)
            await Post.create({
                title: req.body.title,
                caption: req.body.caption,
                likes: 0,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                user: req.user.id
            })
            console.log("Post has been added!")
            res.redirect('/profile')
        } catch (error) {
            console.error(error)
        }
    },
    likePost: async (req, res) => {
        try {
          await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/post/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
    },
    deletePost: async (req, res) => {
        try {
          // Find post by id
          let post = await Post.findById({ _id: req.params.id });
          // Delete image from cloudinary
          await cloudinary.uploader.destroy(post.cloudinaryId);
          // Delete post from db
          await Post.remove({ _id: req.params.id });
          console.log("Deleted Post");
          res.redirect("/profile");
        } catch (err) {
          res.redirect("/profile");
        }
    },
    getCommunityBoard: async (req, res) => {
      try {
        const communities = await Community.find().sort({members: 'desc' }).lean().populate('admin')
        console.log(communities)
        res.render("communityBoard.ejs", { communities: communities })
      } catch (error) {
        console.log(error)
      }
    }
}