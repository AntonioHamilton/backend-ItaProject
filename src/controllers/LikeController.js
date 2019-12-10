const Post = require('../models/post');

module.exports = {
    async store (req, res) {
        const post = await Post.findOne({title: req.params.title});
        post.likes += 1;
        await post.save();

        req.io.emit('like', post);
        
        return res.json(post)
    }
}